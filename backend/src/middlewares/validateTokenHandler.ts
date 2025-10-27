import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";

export const validateToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];

      jwt.verify(
        token,
        process.env.JWT_SECRET || "defaultsecret",
        (err, decoded) => {
          if (err) {
            res.status(401);
            throw new Error("User not authorized, invalid token");
          }
          req.user = decoded as JwtPayload;
          console.log(decoded);

          next();
        }
      );
    } else {
      res.status(401);
      throw new Error("User not authorized, no token provided");
    }
  }
);
