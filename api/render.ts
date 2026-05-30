import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. 先確認是否成功接收到 n8n 的 body
  const body = req.body;
  console.log("API 接收到資料:", body);

  // 2. 直接回傳成功，不執行複雜的上傳邏輯
  res.status(200).json({ 
    status: "success", 
    message: "API 連線正常！",
    received: body 
  });
}
