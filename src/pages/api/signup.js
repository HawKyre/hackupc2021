import { createUserInDB } from "@models/user";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const BAD_REQUEST = 400;
  const OK = 200;
  if (req.method === "POST") {
    try {
      const user = await createUserInDB(
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.universityID
      );
      if (!user.success) {
        // User already exists
        res.status(BAD_REQUEST).json({
          error: "User already exists.",
          success: false,
        });
        return;
      }
      const jwtToken = jwt.sign(
        {
          user: user.data,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 300000,
        }
      );
      res.status(OK).json({
        success: true,
        token: jwtToken,
      });
    } catch (err) {
      res.status(BAD_REQUEST).json({
        error: "User already exists.",
        success: false,
      });
    }
  }
};
