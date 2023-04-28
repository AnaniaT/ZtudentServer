const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    registrationNo: {
      type: String,
      required: true,
      unique: true,
    },
    loginCode: {
      type: String,
      required: false,
      unique: true,
      default: "",
    },
    isScoreboardAllowed: {
      type: Boolean,
      required: false,
      default: false,
    },
    eng: {
      type: Number,
      required: false,
      default: 0,
    },
    math: {
      type: Number,
      required: false,
      default: 0,
    },
    phy: {
      type: Number,
      required: false,
      default: 0,
    },
    geo: {
      type: Number,
      required: false,
      default: 0,
    },
    critical: {
      type: Number,
      required: false,
      default: 0,
    },
    psych: {
      type: Number,
      required: false,
      default: 0,
    },
    department: {
      type: String,
      required: false,
      default: "",
    },
    control: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Control",
      immuteable: true,
      set: (value) => new mongoose.Types.ObjectId(process.env.CONTROL_ID),
      default: new mongoose.Types.ObjectId(process.env.CONTROL_ID),
    },
  },
  {
    timestamps: true,
  }
);

// Model Functions (query methods)
//...

// Model Middlewares

userSchema.pre("save", function (next) {
  if (this.isNew) {
    const nanoid = customAlphabet(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz"
    );
    this.loginCode = nanoid(10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
