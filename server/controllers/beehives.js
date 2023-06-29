const Beehive = require("../models/beehive");
const Inspection = require("../models/inspection");

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

exports.getBeehiveById = async function (req, res) {
  try {
    const { id } = req.params;
    const user = req.user;

    const beehive = await Beehive.findById(id);
    if (beehive.user._id.toHexString() !== user.id) {
      return res.status(401).send("Unauthorized");
    }
    return res.json(beehive);
  } catch (err) {
    console.log(err);
  }
};

exports.getBeehiveInspections = async function (req, res) {
  try {
      const beehiveId = req.query.id;
      const inspections = await Inspection.find({}).where({'beehive': beehiveId})
      return res.json(inspections)
  } catch (err) {
      console.log(err.message)
  }
} 