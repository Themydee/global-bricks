import { db } from "../db/index.js";
import { projects } from "../db/schema.js";
import { eq } from "drizzle-orm";



// Create a new project
export const createProject = async (req, res) => {
  try {
    let imageUrl = req.file ? req.file.path : null; // multer + CloudinaryStorage already handles upload

    const newProject = {
      title: req.body.title,
      category: req.body.category,
      location: req.body.location,
      year: req.body.year,
      description: req.body.description,
      image: imageUrl,
      features: req.body.features ? JSON.parse(req.body.features) : [],
    };

    const [newProjectRecord] = await db.insert(projects).values(newProject).returning();

    console.log("✅ Project uploaded:", newProjectRecord);

    res.status(201).json({
      message: "Project created successfully",
      project: newProjectRecord,
    });
  } catch (error) {
    console.error("❌ Error creating project:", error);
    res.status(500).json({ message: "Failed to create project", error: error.message });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await db.select().from(projects);
    res.status(200).json({ success: true, projects: allProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get a single project
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await db.select().from(projects).where(eq(projects.id, Number(id))).limit(1);
    if (!project.length) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, project: project[0] });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete project
export const deleteProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await db.delete(projects).where(eq(projects.id, Number(id))).returning();
    if (!deletedProject.length) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, message: "Project deleted successfully", project: deletedProject[0] });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
