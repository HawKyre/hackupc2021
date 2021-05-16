import { getUserFromDB } from "@models/user";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method === "POST") {
    let user = await getUserFromDB(req.body.username, req.body.password);
    if (!user) {
      res.status(400).json({
        error: "Couldn't log in.",
      });
      return;
    }

    // Check if user exists in DB
    // If exists, return JWT with the info
    // If not, create new user and return JWT

    console.log(user.data);

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
  }
};
