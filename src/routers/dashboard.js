const express = require("express");

const Control = require("../models/control"); // apparently removing this yields an error
const User = require("../models/user");

const router = new express.Router();

// SECTION: User adminstration
// This endpoint is reserved for admins only. (not used on client side)
router.post("/createuser", async (req, res) => {
  if (req.body["adminId"] !== process.env.ADMIN_ID) {
    return res.status(400).send();
  }

  delete req.body["adminId"];

  let user = new User({ ...req.body });

  try {
    await user.save();
    await user.populate("control");
    return res.send(user);
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      const fieldName = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .send(`MongoServerError: ${fieldName} already exists`);
    }
    return res.status(500).send({
      errorMsg: "Server Error",
      error,
    });
  }
});

router.post("/logincode", async (req, res) => {
  if (req.body["loginCode"] === undefined) {
    return res.status(400).send();
  }

  let user;
  try {
    user = await User.findOne({ loginCode: req.body["loginCode"] });
    if (!user) throw new Error("Invalid login code");
  } catch (e) {
    console.log(e);
    return res.status(400).send();
  }

  await user.populate("control");
  return res.send(user);
});

router.post("/updateGrade", async (req, res) => {
  const allowedFields = [
    "id",
    "department",
    "eng",
    "math",
    "phy",
    "geo",
    "critical",
    "psych",
  ];

  // make sure all fields exist
  for (let field of allowedFields) {
    if (req.body[field] === undefined) {
      return res.status(400).send();
    }
  }
  // prevent additional data from comming in
  if (Object.keys(req.body).length !== allowedFields.length) {
    return res.status(400).send();
  }

  const user = await User.findOneAndUpdate(
    { _id: req.body.id },
    {
      department: req.body.department,
      eng: req.body.eng,
      math: req.body.math,
      phy: req.body.phy,
      geo: req.body.geo,
      critical: req.body.critical,
      psych: req.body.psych,

      isScoreboardAllowed: true,
    },
    { new: true }
  );

  await user.populate("control");
  return res.send(user);
});

router.post("/refresh", async (req, res) => {
  if (req.body["id"] === undefined || Object.keys(req.body).length > 1) {
    return res.status(400).send();
  }

  let user;
  try {
    user = await User.findById(req.body.id);
    if (!user) throw new Error();
  } catch (e) {
    return res.status(400).send();
  }

  await user.populate("control");
  return res.send(user);
});

module.exports = router;
