const Beehive = require("../models/beehive");

exports.createBeehives = function (req, res) {
  const beehiveData = req.body;
  const user = req.user;

  const beehive = new Beehive(beehiveData);
  beehive.user = user;

  beehive
    .save()
    .then((createdBeehive) => {
      return res.json(createdBeehive);
    })
    .catch((err) => {
      console.log(err);
    });
};
