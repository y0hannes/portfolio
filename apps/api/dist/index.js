"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const route_1 = __importDefault(require("./routes/route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://yohannes-muluken.vercel.app', // Update this if testing locally or make it dynamic
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Database connection
(0, db_1.default)();
// Routes
app.use('/api', route_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
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
