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
      taggedUserName: Joi.string().required(),
      taggedCompany: Joi.string().guid({version: "uuidv4"}).required(),
      taggedCompanyName: Joi.string().required(),
    });

    const {error, value} = schema.validate(req.body);

    if (error) {
      return res.status(400).json({message: error.message});
    }

    const {
      type,
      description,
      companyID,
      taggedUser,
      taggedCompany,
      taggedUserName,
      taggedCompanyName,
    } = value;

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
      taggedUserName,
      taggedCompanyName,
      createdBy: req.uuid,
    };

    // verify user valid, verify company valid, verify company id

    const getTaggedUser = db.collection("users").doc(taggedUser).get();
    const getTaggedCompany = db
        .collection("companies").doc(taggedCompany).get();
    const getCompany = db.collection("companies").doc(companyID).get();

    Promise.all([getTaggedUser, getTaggedCompany, getCompany])
        .then(([tagged, taggedUserCompany, company]) => {
          if (!tagged.exists) {
            console.log("tagged", tagged);
            return res.status(400).json({
              message: "Assigned user does not exist",
            });
          }
          if (!taggedUserCompany.exists) {
            return res.status(400).json({
              message: "Assigned company does not exist",
            });
          }
          if (!company.exists) {
            return res.status(400).json({
              message: "User company does not exist",
            });
          }

          db.collection("requests").doc(uuid)
              .set(data)
              .then(()=> {
                return res.status(201).json(data);
              })
              .catch((err) => {
                return res.status(500).json({message: err.message});
              });
        })
        .catch((err) => {
          return res.status(500).json({message: err.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}
;
