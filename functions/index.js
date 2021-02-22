const functions = require("firebase-functions");
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const serviceAccount = require("./permissions.json");
firebase.initializeApp(serviceAccount);


const Companies = require("./controllers/companies");
const Users = require("./controllers/users");
const Auth = require("./controllers/auth");
const Requests = require("./controllers/requests");
const verifyToken = require("./controllers/auth/verifyToken");


// companies
app.post("/companies", verifyToken, Companies.create);
app.get("/companies", verifyToken, Companies.getAll);
app.get("/companies/:uuid", verifyToken, Companies.getOne);
app.post("/companies/:uuid", verifyToken, Companies.update);
app.get("/companies/users/:uuid", verifyToken, Companies.getUsers);

// users
app.put("/users", verifyToken, Users.update);
app.put("/users/remove", verifyToken, Users.remove);

// requests
app.post("/requests", verifyToken, Requests.create);
app.get("/requests", verifyToken, Requests.getAll);
app.post("/requests/:uuid", verifyToken, Requests.update);

// auth
app.post("/auth/signin", Auth.signin);
app.post("/auth/signup", Auth.signup);

app.get("/", function(req, res) {
  res.status(200).send({message: "Welcome to Tenderd"});
});

// 404
app.use(function(req, res) {
  res.status(404).send({message: "Resource not found"});
});

exports.app = functions.https.onRequest(app);
