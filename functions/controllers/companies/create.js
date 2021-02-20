const Joi = require("@hapi/joi");
const {v4: uuidv4} = require("uuid");
const db = require("../../db");


module.exports = function(req, res) {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    const uuid = uuidv4();
    const data = {
      name: value.name,
      uuid,
    };

    db.collection("companies").doc(`${data.name}`)
        .set(data)
        .then(()=> {
          return res.status(201).json(data);
        }).catch((err) => {
          return res.status(500).json({message: err.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

