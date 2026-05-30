import { VercelRequest, VercelResponse } from '@vercel/node';
import { v2 as cloudinary } from 'cloudinary';

// 設定 Cloudinary
cloudinary.config({
  cloud_name: process.env.root,
  api_key: process.env.344537151577516,
  api_secret: process.env.1n3MwWgrICeo8rMP7adYOP4nrE0,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const scriptData = req.body;
    console.log("正在處理腳本:", scriptData.title);

    // 這裡放入你的渲染邏輯 (假設你已經產出了一個影片檔案路徑 localPath)
    // 為了測試，我們先假設有一個已經存在的影片檔 (你需要替換為真實的渲染檔案)
    const localVideoPath = './public/sample_video.mp4'; 

    // 上傳至 Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localVideoPath, {
      resource_type: "video",
      folder: "summa_videos"
    });

    // 回傳成功訊息與影片連結
    res.status(200).json({ 
      status: "success", 
      videoUrl: uploadResult.secure_url 
    });

  } catch (error) {
    console.error("渲染或上傳失敗:", error);
    res.status(500).json({ status: "error", message: "Failed to process video" });
  }
}
