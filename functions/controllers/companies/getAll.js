const Joi = require("@hapi/joi");
const db = require("../../db");


module.exports = function(req, res) {
  try {
    const schema = Joi.object({
      cursor: Joi.number().default(1),
      limit: Joi.number().default(20),
    });

    const {error, value} = schema.validate(req.query);
    if (error) {
      return res.status(400).json({message: error.message});
    }

    db.collection("companies")
        .orderBy("timestamp")
        .startAfter(value.cursor)
        .limit(value.limit)
        .get()
        .then((snapshot)=> {
          const data = [];
          if (snapshot.empty) {
            return res.status(200).json({
              data,
            });
          }
          snapshot.forEach((doc) => {
            data.push(doc.data());
          });

          const cursor =
          snapshot.docs[snapshot.docs.length - 1].data().timestamp;

          return res.status(200).json({
            cursor,
            data,
          });
        }).catch((err) => {
          return res.status(500).json({message: err.message});
        });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

