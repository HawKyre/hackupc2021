import { getUserFromDB } from "@models/user";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const BAD_REQUEST = 400;
  const OK = 200;
  if (req.method === "POST") {
    const user = await getUserFromDB(req.body.username, req.body.password);
    if (!user) {
      res.status(400).json({
        success: false,
        error: "Couldn't log in.",
      });
      return;
    }

    // Check if user exists in DB
    // If exists, return JWT with the info
    // If not, create new user and return JWT

    console.log("User data: " + JSON.stringify(user.data));

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
  }
};
