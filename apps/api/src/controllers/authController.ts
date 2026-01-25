import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type Request, type Response, type NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
  throw new Error("Missing required environment variables");
}

interface AuthPayload extends JwtPayload {
  user: {
    id: string;
  };
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ err: "Please provide username and password" });
  }

  const isUsernameValid = username === ADMIN_USERNAME;
  const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

  if (!isUsernameValid || !isPasswordValid) {
    return res.status(400).json({ err: "Invalid credentials" });
  }

  const payload = { user: { id: "admin" } };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return res.json({ token });
};

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ err: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    req.user = decoded.user;
    next();
  } catch {
    return res.status(401).json({ err: "Token is not valid" });
  }
};
