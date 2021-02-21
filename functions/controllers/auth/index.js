const firebase = require("firebase/app");
require("firebase/auth");
const Joi = require("@hapi/joi");
const db = require("../../db");

/**
 *
 * Create and sign users up
 * @param {*} req
 * @param {*} res
 * @return {{}} responseObject
 */
function signup(req, res) {
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
}

/**
 *
 * Create and sign users up
 * @param {*} req
 * @param {*} res
 * @return {{}} responseObject
 */
function signin(req, res) {
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
          const {token, uuid} = userData;
          if (!token) {
            return res.status(500).json({
              message: "An unknown authentication error occured",
            });
          }
          // get user
          db.collection("users").doc(uuid)
              .get()
              .then((user)=> {
                const data = user.data();
                data.token = token;
                return res.status(200).json(data);
              }).catch((err) => {
                return res.status(500).json({message: err.message});
              });
        })
        .catch((error) => {
          return res.status(401).json({message: error.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

const getToken = (user) => {
  try {
    return user.getIdToken(true).then((token) => {
      return {token, uuid: user.uid};
    });
  } catch (error) {
    return false;
  }
};

module.exports = {
  signup,
  signin,
};

