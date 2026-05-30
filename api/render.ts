import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const body = req.body;
  console.log("收到來自 n8n 的腳本資料:", body);

  // 在這裡處理你的邏輯
  res.status(200).json({ status: "success", received: true });
}
