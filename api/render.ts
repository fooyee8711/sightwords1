import { VercelRequest, VercelResponse } from '@vercel/node';
import { v2 as cloudinary } from 'cloudinary';

// 根據你的環境變數進行設定
cloudinary.config({
  cloud_name: process.env.Root,
  api_key: process.env.344537151577516,
  api_secret: process.env.1n3MwWgrICeo8rMP7adYOP4nrE0,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 假設你未來這裡會接收渲染好的影片 URL (或是將影片轉為 Buffer)
    // 目前我們先用一個公開的範例影片來測試上傳功能
    const fileToUpload = 'https://www.w3schools.com/html/mov_bbb.mp4'; 

    // 執行真實上傳
    const result = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "video",
      folder: "summa_videos"
    });

    // 回傳 Cloudinary 產生的真實 URL
    res.status(200).json({ 
      status: "success", 
      videoUrl: result.secure_url 
    });

  } catch (error: any) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
