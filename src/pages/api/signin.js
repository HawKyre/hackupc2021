import { getUserFromDB, toJSON } from "@models/user";
import jwt from "jsonwebtoken";

export default (req, res) => {
  if (req.method === "POST") {
    let user = getUserFromDB(req.body.username, req.body.password);
    if (!user) {
      res.status(400).json({
        error: "Couldn't log in.",
      });
      return;
    }

    // Check if user exists in DB
    // If exists, return JWT with the info
    // If not, create new user and return JWT

    const jwtToken = jwt.sign(user.json(), process.env.JWT_SECRET, {
      expiresIn: 3000, //50 minutes
    });
    res.status(200).json({
      token: jwtToken,
    });
  }
};
