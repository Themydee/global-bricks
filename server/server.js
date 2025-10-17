import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { db } from './db/index.js';
import { fileURLToPath } from "url";
import path from "path";

import projectRoutes from './routes/projectRoute.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoute.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct CORS setup
app.use(
  cors({
    origin: ["http://localhost:8080"], 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

// ✅ Serve static uploads WITH CORS headers
app.use(
  "/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);


// Health check route
app.get("/", (req, res) => {
  res.send("🌍 Global Bricks Builder API is running...");
});

//routes
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes); 

// Error handler (should come last)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

//Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await db.execute(`SELECT 1`);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }

  console.log(`🚀 Server running on port ${PORT}`);
});
