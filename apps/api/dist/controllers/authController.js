"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;
if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
    throw new Error("Missing required environment variables");
}
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ err: "Please provide username and password" });
    }
    const isUsernameValid = username === ADMIN_USERNAME;
    const isPasswordValid = await bcryptjs_1.default.compare(password, ADMIN_PASSWORD_HASH);
    if (!isUsernameValid || !isPasswordValid) {
        return res.status(400).json({ err: "Invalid credentials" });
    }
    const payload = {
        user: { id: "admin" }
    };
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
};
exports.login = login;
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ err: "Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    }
    catch {
        return res.status(401).json({ err: "Token is not valid" });
    }
};
exports.authenticateAdmin = authenticateAdmin;
