import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
}

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
          req.user = decoded as CustomJwtPayload;
          if (!req.user) {
            res.status(401);
            throw new Error("Unauthorized: user not found in request");
          }

          const userId = (req.user as JwtPayload).id;

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
