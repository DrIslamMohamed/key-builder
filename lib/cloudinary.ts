import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export async function uploadImage(base64Data: string): Promise<string> {
  const result = await cloudinary.uploader.upload(base64Data, {
    folder: "key-builder",
    transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }],
  });
  return result.secure_url;
}
