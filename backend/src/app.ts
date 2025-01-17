import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import contactsRoutes from "./routes/contact.routes";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactsRoutes);

export default app;
