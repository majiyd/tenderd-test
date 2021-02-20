const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({origin: true}));

const createCompany = require("./controllers/companies/create");


app.post("/companies", createCompany);

app.use(function(req, res) {
  res.status(404).send({message: "Resource not found"});
});

exports.app = functions.https.onRequest(app);
