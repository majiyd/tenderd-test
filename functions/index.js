const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({origin: true}));

const companies = require("./controllers/companies");

// companies
app.post("/companies", companies.create);
app.get("/companies", companies.getAll);
app.get("/companies/:uuid", companies.getOne);

// 404
app.use(function(req, res) {
  res.status(404).send({message: "Resource not found"});
});

exports.app = functions.https.onRequest(app);
