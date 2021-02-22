const Joi = require("@hapi/joi");
const db = require("../../db");


module.exports=(req, res) => {
  try {
    const {uuid} = req.params;
    const schema = Joi.object({
      companyID: Joi.string().guid({version: "uuidv4"}).required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }
    if (!uuid) {
      return res.status(400).json({message: "uuid not provided"});
    }

    const {companyID} = value;

    const userRef = db.collection("users").doc(uuid).get();
    const companyRef = db.collection("companies").doc(companyID).get();

    Promise.all([userRef, companyRef])
        .then(([userSnapshot, companySnapshot]) => {
          if (!userSnapshot.exists) {
            return res.status(400).json({message: "Invalid user id"});
          }
          const data = userSnapshot.data();

          if (companySnapshot.exists) {
            const companyName = companySnapshot.data().name;
            data.companyName = companyName;
          }
          return res.status(200).json(data);
        })
        .catch((err) => {
          return res.status(500).json({message: err.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};


