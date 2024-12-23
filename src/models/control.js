const mongoose = require("mongoose");

const controlSchema = new mongoose.Schema({
  isEditAllowed: {
    type: Boolean,
    required: true,
    default: true,
  },
  deptList: [{ type: String, required: true }],
});

const Control = mongoose.model("Control", controlSchema);

module.exports = Control;
