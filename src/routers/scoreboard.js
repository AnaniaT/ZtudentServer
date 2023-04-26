const express = require("express");

const User = require("../models/user");

const router = new express.Router();

router.post("/departmentScore", async (req, res) => {
  if (
    req.body["department"] === undefined ||
    Object.keys(req.body).length > 1
  ) {
    return res.status(400).send();
  }

  let gradeAverages = await User.aggregate([
    { $match: { department: req.body.department } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        avgMath: { $avg: "$math" },
        stdDevMath: { $stdDevPop: "$math" },
        avgEng: { $avg: "$eng" },
        stdDevEng: { $stdDevPop: "$eng" },
        avgPhy: { $avg: "$phy" },
        stdDevPhy: { $stdDevPop: "$phy" },
        avgPsych: { $avg: "$psych" },
        stdDevPsych: { $stdDevPop: "$psych" },
        avgGeo: { $avg: "$geo" },
        stdDevGeo: { $stdDevPop: "$geo" },
        avgCritical: { $avg: "$critical" },
        stdDevCritical: { $stdDevPop: "$critical" },
      },
    },
  ]).exec();

  // also send number of student in dept
  // improve error calculation

  return res.send(gradeAverages);
});

module.exports = router;
