const Joi = require("@hapi/joi");
const db = require("../../db");


module.exports = function(req, res) {
  try {
    const {uuid} = req;

    if (!uuid) {
      return res.status(400).json({message: "Missing params uuid"});
    }

    const schema = Joi.object({
      name: Joi.string(),
      companyID: Joi.string().guid({version: "uuidv4"}),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    const {name, companyID} = value;

    if (!name && !companyID) {
      return res.status(400).json({
        message: "One of name or companyID must be provided",
      });
    }


    const data = {};
    if (name) data.name = name;
    if (companyID) data.companyID = companyID;

    // is valid company id
    db.collection("companies").doc(companyID)
        .get()
        .then((snapshot)=> {
          if (snapshot.exists) {
            // update user
            db.collection("users").doc(uuid)
                .update(data)
                .then(() => {
                  return res.status(200).json(data);
                })
                .catch((err)=> {
                  return res.status(500).json({message: err.message});
                });
          } else {
            return res.status(400).send({message: "Invalid company ID"});
          }
        }).catch((err) => {
          return res.status(500).json({message: err.message});
        });

    console.log("data", data);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

