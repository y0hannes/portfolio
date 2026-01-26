import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from './config/db';
import routes from './routes/route';

dotenv.config();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

const authFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 10, // Limit each IP to 10 requests per window for login/contact
  message: { error: { message: "Too many attempts, please try again later." } },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://yohannes-muluken.vercel.app',
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

// Apply limiter globally
app.use('/api', limiter);
// Apply strict limiter to specific routes
app.use('/api/login', authFormLimiter);
app.use('/api/messages', authFormLimiter);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Database connection
connectDB();

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
