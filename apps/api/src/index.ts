import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/db';
import routes from './routes/route';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://yohannes-muluken.vercel.app', // Update this if testing locally or make it dynamic
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

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
