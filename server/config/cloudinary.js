// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Dynamic storage factory (so you can use it for blogs, projects, etc.)
const createStorage = (folder = "uploads") =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    },
  });

// ✅ Middleware for blog images
const uploadBlogImage = multer({ storage: createStorage("blogs") });

// ✅ Middleware for project images (optional)
const uploadProjectImage = multer({ storage: createStorage("projects") });

// ✅ Export all
export { cloudinary, uploadBlogImage, uploadProjectImage };
