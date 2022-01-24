const jwt = require("jsonwebtoken");
const JWT_SECRT = process.env.SECRET_KEY;


const fetchUser = (req, res, next) => {
  //calling user and intrperating id of user
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authnetic with authorize token" });
  }
  try {
    const verifiedData = jwt.verify(token, JWT_SECRT);
    req.user = verifiedData.user;
    next();
  } catch (err) {
    res
      .status(401)
      .send({ error: "Please authnetic with authorize token"});
      console.log(err)
  }
};
module.exports = fetchUser;
