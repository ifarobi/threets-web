import { ApiRequest, ApiResponse, User } from "@/types/api.types";
import { NextHandler } from "next-connect";
import jwt from "jsonwebtoken";

export default async function authApiMiddleware(
  req: ApiRequest,
  res: ApiResponse,
  next: NextHandler
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET) as User;

  req.user = decode;
  next();
}
