const jwt = require("jsonwebtoken");
const Auth = (req, res, next) => {
  const bearerToken = req.headers["authorization"];

  if (!bearerToken) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is require" });
  }
  try {
    const bearer = bearerToken.split(" ");
    const token = bearer[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};

module.exports = { Auth };
