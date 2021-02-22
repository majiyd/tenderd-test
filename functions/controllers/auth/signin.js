const firebase = require("firebase/app");
require("firebase/auth");
const Joi = require("@hapi/joi");
const db = require("../../db");

const getToken = require("./getToken");


module.exports=(req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    const {email, password} = value;


    firebase.auth().signInWithEmailAndPassword(email, password)
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

          // get user
          db.collection("users").doc(uuid)
              .get()
              .then((user)=> {
                const data = user.data();
                data.token = token;

                if (!data.companyID) {
                  return res.status(200).json(data);
                }

                // get company name
                db.collection("companies").doc(data.companyID)
                    .get()
                    .then((company) => {
                      const companName = company.data().name;
                      data.companyName = companName;

                      return res.status(200).json(data);
                    })
                    .catch((err) => {
                      return res.status(500).json({message: err.message});
                    });
              })
              .catch((err) => {
                return res.status(500).json({message: err.message});
              });
        })
        .catch((error) => {
          return res.status(401).json({message: error.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};


