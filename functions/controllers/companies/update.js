const Joi = require("@hapi/joi");
const db = require("../../db");


module.exports = function(req, res) {
  try {
    const {uuid} = req.params;
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    const data = {
      name: value.name,
    };

    db.collection("companies").doc(`${uuid}`)
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

