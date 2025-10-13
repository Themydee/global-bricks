import { db } from "../db/index.js";
import { projects } from "../db/schema.js";
import { eq } from "drizzle-orm";

//Create a new project
export const createProject = async(req, res) => {
    try {
        const { title, description, location, image, category, features, year } = req.body;

        const newProject = await db.insert(projects).values({
            title,
            description,
            location,
            image,
            category,
            features,
            year
        }).returning();

        res.status(201).json({ success: true, project: newProject[0] });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

