import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const scriptData = req.body;
  // 在這裡執行你的渲染邏輯 (例如呼叫 Remotion 渲染)
  
  // 假設渲染完成後，你會得到一個影片網址
  const videoUrl = "https://your-video-storage.com/video-123.mp4"; 

  // 將網址回傳給 n8n
  res.status(200).json({ 
    status: "success", 
    videoUrl: videoUrl 
  });
}
