import { createUserInDB, getUserFromDB } from "@models/user";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      let user = await createUserInDB(
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.universityID
      );
      if (!user.success) {
        // User already exists
        res.status(400).json({
          success: false,
          error: "User already exists.",
        });
        return;
      }

      // Check if user exists in DB
      // If exists, return JWT with the info
      // If not, create new user and return JWT

      const jwtToken = jwt.sign(
        {
          user: user.data,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 300000,
        }
      );
      res.status(200).json({
        success: true,
        token: jwtToken,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        error: "User already exists.",
      });
      return;
    }
  }
};
