const admin = require("firebase-admin");
require("firebase/auth");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({message: "No token provided."});
  }

  admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        req.uuid = uid;
        next();
      })
      .catch((error) => {
        return res.status(401).json({message: error.message});
      });
};

