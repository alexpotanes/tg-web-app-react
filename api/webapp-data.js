export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const BOT_URL = process.env.BOT_URL;
  if (!BOT_URL) {
    return res.status(500).json({ error: 'BOT_URL не настроен' });
  }

  const { peerId, initData } = req.body;
  if (!peerId && !initData) {
    return res.status(400).json({ error: 'peerId или initData обязателен' });
  }

  const botRes = await fetch(`${BOT_URL}/webapp-data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });

  const result = await botRes.json();

  if (!botRes.ok) {
    return res.status(botRes.status).json(result);
  }

  return res.json(result);
}
