// pagination will not be implemeneted for the sake of simplicity
const Joi = require("@hapi/joi");
const _ = require("lodash");
const db = require("../../db");

module.exports = function(req, res) {
  try {
    const {uuid} = req;
    const schema = Joi.object({
      companyID: Joi.string().guid({version: "uuidv4"}).required(),
    });

    const {error, value} = schema.validate(req.query);
    if (error) {
      return res.status(400).json({message: error.message});
    }

    const {companyID} = value;

    const dbRef = db.collection("requests");

    const createdByUser = dbRef.where("createdBy", "==", uuid).get();
    const companyTagged = dbRef.where("taggedCompany", "==", companyID).get();

    Promise.all([createdByUser, companyTagged])
        .then(([userSnapshot, companySnapshot]) => {
          const requestsArray = _.concat(
              userSnapshot.docs, companySnapshot.docs
          );


          const data = [];

          requestsArray.forEach((doc) => {
            data.push(doc.data());
          });

          return res.status(200).json({
            data: _.uniqWith(
                data, _.isEqual
            ),
          });
        })
        .catch((err) => {
          return res.status(500).json({message: err.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

