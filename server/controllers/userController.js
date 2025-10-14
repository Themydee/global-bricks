import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // ✅ Import JWT
import { eq } from "drizzle-orm";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email.includes("@")) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(users)
      .values({ name, email, password: hashedPassword, role: role || "user" })
      .returning();

    const token = jwt.sign(
      { id: Number(newUser[0].id), email: newUser[0].email, role: newUser[0].role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({ success: true, user: newUser[0], token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUsers = await db.select().from(users).where(eq(users.email, email));
    if (foundUsers.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const user = foundUsers[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await db.select().from(users);
        res.status(200).json({ success: true, users: allUsers });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

