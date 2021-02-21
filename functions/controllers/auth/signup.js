const firebase = require("firebase/app");
require("firebase/auth");
const Joi = require("@hapi/joi");
const db = require("../../db");
const getToken = require("./getToken");


module.exports = (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    const {name, email, password} = value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          return getToken(userCredential.user);
        })
        .then((userData) => {
          if (!userData) {
            return res.status(500).json({
              message: "An unknown authentication error occured",
            });
          }
          const {token, uuid} = userData;

          const data = {
            name,
            email,
            createdAt: Date.now(),
            companyID: "",
            uuid,
          };

          // create user

          db.collection("users").doc(data.uuid)
              .set(data)
              .then(()=> {
                data.token = token;
                return res.status(201).json(data);
              }).catch((err) => {
                return res.status(500).json({message: err.message});
              });
        })
        .catch((err) => {
          return res.status(401).json({message: err.message});
        })
    ;
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};


