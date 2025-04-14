import { NextFunction, Request, Response } from "express";
import { tokenBasedAuth } from "./authChecker";

const checkAuth =
  (authRequired = true) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.get("Authorization");
      const isAuthHeaderAvailable = !!authorizationHeader;

      if (authRequired && !isAuthHeaderAvailable) {
        res
          .status(401)
          .json({ message: "Unauthorized: Missing Authorization header" });
      }

      if (isAuthHeaderAvailable) {
        const [type, token] = authorizationHeader.split(" ");

        if (type === "Bearer" && token) {
          const user = await tokenBasedAuth(token);
          if (user) {
            req.user = user;
            next();
          } else {
            res.status(401).json({ message: "Unauthorized: Invalid token" });
          }
        }

        // Verify the token and set req.user if valid
      }

      // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export default checkAuth;
