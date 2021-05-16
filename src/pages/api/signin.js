import { getUserFromDB } from "@models/user";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const BAD_REQUEST = 400;
  const OK = 200;
  if (req.method === "POST") {
    const user = await getUserFromDB(req.body.username, req.body.password);
    if (!user) {
      res.status(BAD_REQUEST).json({
        error: "Couldn't log in.",
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
  }
};
