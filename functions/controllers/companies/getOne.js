const Joi = require("@hapi/joi");
const db = require("../../db");


module.exports = function(req, res) {
  try {
    const schema = Joi.object({
      uuid: Joi.string().guid({version: "uuidv4"}).required(),
    });

    const {error, value} = schema.validate(req.params);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    db.collection("companies").doc(`${value.uuid}`)
        .get()
        .then((data)=> {
          if (data.exists) {
            return res.status(200).json(data.data());
          } else {
            return res.status(404).send({message: "Company not found"});
          }
        }).catch((err) => {
          return res.status(500).json({message: err.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

