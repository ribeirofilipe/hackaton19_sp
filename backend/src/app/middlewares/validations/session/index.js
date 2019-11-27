const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv").config();

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) return res.send({ message: "Token not provided" });

  const [, token] = authHeader.split(" ");

  return promisify(jwt.verify)(token, process.env.APP_SECRET)
    .then(decoded => {
      req.id = decoded.id;
      return next();
    })
    .catch(
      err => res.send({ message: "Token invalid" })
      //res.status(401).send({ message: "Token invalid" })
    );
};
