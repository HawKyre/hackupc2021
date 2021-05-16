const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

export default (req, res) => {
  const UNAUTHORIZED = 401;
  if (req.method === "GET") {
    if (!req.cookies["hackupc-token"]) {
      res.status(UNAUTHORIZED).json({ message: "Unable to auth" });
      return;
    }
    let decoded = false;
    let error = false;
    const token = req.cookies["hackupc-token"];
    if (token) {
      try {
        decoded = jwt.verify(token, jwtSecret);
      } catch (err) {
        error = err;
      }
    }

    if (decoded) {
      res.json(decoded);
    } else {
      res.status(UNAUTHORIZED).json({ message: `Unable to auth: ${error}` });
    }
  }
};
