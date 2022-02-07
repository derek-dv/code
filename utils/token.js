const jwt = require("jsonwebtoken");

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "Secret"
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.header.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET || "Secret", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else res.status(401).send({ message: "No Token" });
};
