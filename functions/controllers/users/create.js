const firebase = require("firebase/app");
require("firebase/auth");
const Joi = require("@hapi/joi");
const db = require("../../db");


module.exports = function(req, res) {
  try {
    const {email, password} = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in

          const {email, uid} = userCredential.user;

          const data = {
            name: value.name,
            email,
            createdAt: Date.now(),
            companyID: "",
            uuid: uid,
          };

          // create user

          db.collection("users").doc(data.uuid)
              .set(data)
              .then(()=> {
                return res.status(201).json(data);
              }).catch((err) => {
                return res.status(500).json({message: err.message});
              });
        })
        .catch((error) => {
          return res.status(500).json({message: error.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

