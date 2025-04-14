import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import contactsRoutes from "./routes/contact.routes";
import shopRoutes from "./routes/shop.routes";
import dotenv from "dotenv";
import groupRoutes from "./routes/group.routes";
import localLoginStategy from "./passport/login";
// import session from "express-session";
import passport from "passport";
import checkAuth from "./middleware/authCheck";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Your frontend URL
    credentials: true, // ✅ Allows cookies
  })
);
// app.use(
//   session({
//     secret: "MYFIRSTSECRET",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, // 1 day
//       secure: false,
//       httpOnly: true,
//       sameSite: "lax",
//       domain: "localhost",
//     },
//   })
// );
// app.use((req, _, next) => {
//   console.log("Session ID:", req.sessionID);
//   console.log("Authenticated User:", req.user);
//   next();
// });
dotenv.config();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

passport.use("login", localLoginStategy);

app.use("/api/auth", authRoutes);
app.use("/api/contacts", checkAuth(true), contactsRoutes);
app.use("/api/shops", checkAuth(true), shopRoutes);
app.use("/api/groups", checkAuth(true), groupRoutes);

export default app;
