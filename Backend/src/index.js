import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

//! WEB SOCKET IMPORTS
import { app,server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:8080"],
    credentials: true
}));


//! Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages" , messageRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});