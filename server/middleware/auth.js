import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied token required");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // const JWT_SECRET='THIS_IS_TOP_SECRET'
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = verified;
    // console.log("token:",token)
    // console.log("user-token::::", user);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
