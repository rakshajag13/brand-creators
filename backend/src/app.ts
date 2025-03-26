import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import contactsRoutes from "./routes/contact.routes";
import shopRoutes from "./routes/shop.routes";
import dotenv from "dotenv";
import groupRoutes from "./routes/group.routes";
const app = express();
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/groups", groupRoutes);

export default app;
