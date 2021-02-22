const Joi = require("@hapi/joi");
const {v4: uuidv4} = require("uuid");
const db = require("../../db");

module.exports = function(req, res) {
  try {
    const schema = Joi.object({
      type: Joi.string().valid(
          "Breakdown", "Maintenance", "Replacement", "Demobilisation"
      ).required(),
      description: Joi.string().required(),
      companyID: Joi.string().guid({version: "uuidv4"}).required(),
      taggedUser: Joi.string().required(),
      taggedCompany: Joi.string().guid({version: "uuidv4"}).required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    const {type, description, companyID, taggedUser, taggedCompany} = value;

    const uuid = uuidv4();
    const data = {
      uuid,
      type,
      description,
      status: "Created",
      createdAt: Date.now(),
      companyID,
      taggedUser,
      taggedCompany,
      createdBy: req.uuid,
    };


    db.collection("requests").doc(uuid)
        .set(data)
        .then(()=> {
          return res.status(201).json(data);
        })
        .catch((err) => {
          return res.status(500).json({message: err.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}
;
