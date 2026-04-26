export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const VK_TOKEN = process.env.VK_TOKEN;
    if (!VK_TOKEN) {
      return res.status(500).json({ error: 'VK_TOKEN не настроен на сервере' });
    }

    const body = req.body || {};
    const {
      peerId,
      email, articles, photo,
      fashion, product, references,
      hair, race, productImg,
    } = body;

    if (!peerId) {
      return res.status(400).json({ error: 'peerId обязателен' });
    }

    const message = formatMessage({ email, articles, photo, fashion, product, references, hair, race, productImg });

    if (message.length > 4096) {
      return res.status(400).json({ error: 'Сообщение слишком длинное, сократите описание в полях формы' });
    }

    const params = new URLSearchParams({
      peer_id: peerId,
      message,
      access_token: VK_TOKEN,
      v: '5.199',
      random_id: String(Date.now()),
    });

    const vkRes = await fetch('https://api.vk.com/method/messages.send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const result = await vkRes.json();

    if (result.error) {
      return res.status(500).json({ error: `VK API: ${result.error.error_msg || result.error.error_code}` });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('[webapp-data] error:', err);
    return res.status(500).json({ error: err.message || 'Внутренняя ошибка сервера' });
  }
}

function formatMessage({ email, articles, photo, fashion, product, references, hair, race, productImg }) {
  const lines = ['📋 Новая заявка на фотосъёмку'];

  if (email)      lines.push(`📧 Email: ${email}`);
  if (articles)   lines.push(`🔢 Артикулов: ${articles}`);
  if (photo)      lines.push(`📷 Фото на артикул: ${photo}`);
  if (fashion)    lines.push(`\n🎨 Пожелания по фону и образу:\n${fashion}`);
  if (product)    lines.push(`\n📦 Описание товара:\n${product}`);
  if (references) lines.push(`\n🔗 Референсы:\n${references}`);
  if (hair)       lines.push(`\n💇 Волосы модели:\n${hair}`);
  if (race)       lines.push(`\n👤 Раса модели:\n${race}`);
  if (productImg) lines.push(`\n🖼 Фото товара / ссылки:\n${productImg}`);

  return lines.join('\n');
}
