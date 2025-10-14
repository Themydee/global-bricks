import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token from request headers.
 * Protects private routes by ensuring a valid token is provided.
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach decoded user info to request object
    req.user = decoded;

    next(); // Proceed to next middleware/controller
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
