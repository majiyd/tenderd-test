const Joi = require("@hapi/joi");
const db = require("../../db");


module.exports = function(req, res) {
  try {
    const schema = Joi.object({
      uuid: Joi.string().required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    const {uuid} = value;


    const data = {
      companyID: "",
    };

    db.collection("users").doc(`${uuid}`)
        .update(data)
        .then(()=> {
          return res.status(200).json(data);
        }).catch((err) => {
          return res.status(500).json({message: err.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

