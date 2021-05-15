import { getUserFromDB } from "@models/user";
import jwt from "jsonwebtoken";

export default (req, res) => {
  if (req.method === "POST") {
    console.log(req.body + "ss");
    let user = getUserFromDB(req.email, req.password);
    if (!user) {
      user = createUserInDB(req.email, req.password);
    }

    // Check if user exists in DB
    // If exists, return JWT with the info
    // If not, create new user and return JWT

    const jwtToken = jwt.sign({});
    res.status(200);
  }
};
