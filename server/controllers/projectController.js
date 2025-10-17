import { db } from "../db/index.js";
import { projects } from "../db/schema.js";
import { eq } from "drizzle-orm";

// ✅ Create a new project
export const createProject = async (req, res) => {
  try {
    // Cloudinary automatically uploads via multer middleware
    const imageUrl = req.file ? req.file.path : null;

    const { title, category, location, year, description, features } = req.body;

    if (!title || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Title and category are required." });
    }

    // ✅ Parse features (array of strings)
    let parsedFeatures = [];
    try {
      parsedFeatures = features ? JSON.parse(features) : [];
    } catch (err) {
      console.warn("⚠️ Invalid JSON for features, defaulting to []");
    }

    // ✅ Insert into DB
    const [newProject] = await db
      .insert(projects)
      .values({
        title,
        category,
        location,
        year,
        description,
        image: imageUrl,
        features: parsedFeatures,
      })
      .returning();

    console.log("✅ Project uploaded:", newProject);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("❌ Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// ✅ Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await db.select().from(projects);
    res.status(200).json({ success: true, projects: allProjects });
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, Number(id)))
      .limit(1);

    if (!project.length) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project: project[0] });
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Delete project
export const deleteProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await db
      .delete(projects)
      .where(eq(projects.id, Number(id)))
      .returning();

    if (!deleted.length) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      project: deleted[0],
    });
  } catch (error) {
    console.error("❌ Error deleting project:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
