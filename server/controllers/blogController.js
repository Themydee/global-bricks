import { db } from "../db/index.js";
import { blogs } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";
import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";

// 📝 Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, tags } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required." });
    }

    // ✅ Image URL uploaded to Cloudinary
    const imageUrl = req.file ? req.file.path : null;

    // ✅ Convert tags if they come as stringified JSON
    let parsedTags = [];
    if (typeof tags === "string") {
      try {
        parsedTags = JSON.parse(tags);
      } catch {
        parsedTags = tags.split(",").map((t) => t.trim());
      }
    }

    const slug = slugify(title, { lower: true, strict: true });

    const [newBlog] = await db
      .insert(blogs)
      .values({
        title,
        excerpt,
        content,
        author,
        image: imageUrl,
        tags: parsedTags,
        slug,
      })
      .returning();

    res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating blog.",
    });
  }
};

// 📖 Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
    res.status(200).json({ success: true, blogs: allBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Error fetching blogs." });
  }
};


// 🔍 Get Blog by ID or Slug
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const isNumeric = !isNaN(Number(id));

    // Query by id OR slug
    const result = await db
      .select()
      .from(blogs)
      .where(
        isNumeric
          ? eq(blogs.id, Number(id))
          : eq(blogs.slug, id)
      );

    const blog = result[0];

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("❌ Error fetching blog:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





// ✏️ Update Blog (with optional new image upload)
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, author, tags } = req.body;

    // Fetch existing blog
    const [existingBlog] = await db.select().from(blogs).where(eq(blogs.id, id));
    if (!existingBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }

    let updatedImageUrl = existingBlog.image;

    // If a new image is uploaded, replace the old one
    if (req.file) {
      // Delete old image from Cloudinary
      if (existingBlog.image) {
        const publicId = existingBlog.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`blogs/${publicId}`);
      }

      updatedImageUrl = req.file.path;
    }

    const slug = title ? slugify(title, { lower: true, strict: true }) : existingBlog.slug;

    const [updatedBlog] = await db
      .update(blogs)
      .set({
        title: title || existingBlog.title,
        excerpt: excerpt || existingBlog.excerpt,
        content: content || existingBlog.content,
        author: author || existingBlog.author,
        tags: tags || existingBlog.tags,
        image: updatedImageUrl,
        slug,
      })
      .where(eq(blogs.id, id))
      .returning();

    res.status(200).json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating blog." });
  }
};

// 🗑️ Delete Blog (also deletes from Cloudinary)
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedBlog] = await db
      .delete(blogs)
      .where(eq(blogs.id, id))
      .returning();

    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }

    // Delete image from Cloudinary if exists
    if (deletedBlog.image) {
      const publicId = deletedBlog.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`blogs/${publicId}`);
    }

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting blog." });
  }
};
