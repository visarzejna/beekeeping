const Inspection = require('../models/inspection');

exports.createInspections = function (req, res) {
    const inspectionData = req.body;
  
    const inspection = new Inspection(inspectionData);
  
    inspection
      .save()
      .then((createdInspection) => {
        return res.json(createdInspection);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.getInspectionById = async function (req, res) {
    try {
      const { id } = req.params;
    //   const user = req.user;
  
      const inspection = await Inspection.findById(id);
    //   if (inspection.user._id.toHexString() !== user.id) {
    //     return res.status(401).send("Unauthorized");
    //   }
      return res.json(inspection);
    } catch (err) {
      console.log(err);
    }
  };