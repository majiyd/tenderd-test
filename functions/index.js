const functions = require("firebase-functions");
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({origin: true}));

const serviceAccount = require("./permissions.json");
firebase.initializeApp(serviceAccount);

const Companies = require("./controllers/companies");
const Users = require("./controllers/users");
const Auth = require("./controllers/auth");

// companies
app.post("/companies", Companies.create);
app.get("/companies", Companies.getAll);
app.get("/companies/:uuid", Companies.getOne);

// users
app.put("/users/:uuid", Users.update);

// auth
app.post("/auth/signin", Auth.signin);
app.post("/auth/signup", Auth.signup);

// 404
app.use(function(req, res) {
  res.status(404).send({message: "Resource not found"});
});

exports.app = functions.https.onRequest(app);
