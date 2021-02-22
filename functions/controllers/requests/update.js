const Joi = require("@hapi/joi");
const db = require("../../db");

module.exports = function(req, res) {
  try {
    const {uuid} = req.params;
    const schema = Joi.object({
      message: Joi.string().required(),
      status: Joi.string().valid(
          "In progress", "Completed", "Cancelled"
      ).required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    const {message, status} = value;

    const data = {
      status,
    };
    if (status == "In progress") {
      data.processingAt = Date.now();
      data.processingMessage = message;
    } else {
      data.completedAt = Date.now();
      data.completedMessage = message;
    }

    db.collection("requests").doc(uuid)
        .update(data)
        .then(() => {
          return res.status(200).json(data);
        })
        .catch((err)=> {
          return res.status(500).json({message: err.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}
;
