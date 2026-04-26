export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const BOT_URL = process.env.BOT_URL;
    if (!BOT_URL) {
      return res.status(500).json({ error: 'BOT_URL не настроен на сервере' });
    }

    const { peerId } = req.body || {};
    if (!peerId) {
      return res.status(400).json({ error: 'peerId обязателен' });
    }

    const botRes = await fetch(`${BOT_URL}/webapp-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const result = await botRes.json().catch(() => ({}));

    if (!botRes.ok) {
      return res.status(botRes.status).json({ error: result.error || 'Ошибка бот-сервера' });
    }

    return res.json(result);
  } catch (err) {
    console.error('[webapp-data] error:', err);
    return res.status(500).json({ error: err.message || 'Внутренняя ошибка сервера' });
  }
}
