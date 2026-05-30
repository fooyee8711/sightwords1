import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. 先確認是否成功接收到 n8n 的 body
  const body = req.body;
  console.log("API 接收到資料:", body);

 // 2. 直接回傳成功，將 videoUrl 填入，供 n8n 寫入 Google Sheets
res.status(200).json({ 
  status: "success", 
  message: "API 連線正常！",
  // 這是給 Google Sheets E 欄位抓取的變數名稱
  videoUrl: "https://res.cloudinary.com/dedlolmrj/video/upload/v123456789/sample_video.mp4" 
});
}
