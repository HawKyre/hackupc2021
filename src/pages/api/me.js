const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

export default (req, res) => {
  if (req.method === "GET") {
    console.log(req.cookies["hackupc-token"]);
    if (!req.cookies["hackupc-token"]) {
      res.status(401).json({ message: "Unable to auth" });
      return;
    }
    let decoded;
    const token = req.cookies["hackupc-token"];
    if (token) {
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (e) {
        console.error(e);
      }
    }

    if (decoded) {
      res.json(decoded);
      return;
    } else {
      res.status(401).json({ message: "Unable to auth" });
    }
  }
};
