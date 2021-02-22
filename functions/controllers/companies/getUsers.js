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
    const {uuid} = value;

    db.collection("users")
        .where("companyID", "==", uuid)
        .get()
        .then((snapshot)=> {
          const data = [];
          snapshot.forEach((doc) => {
            data.push(doc.data());
          });

          return res.status(200).json({
            data,
          });
        }).catch((err) => {
          return res.status(500).json({message: err.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

