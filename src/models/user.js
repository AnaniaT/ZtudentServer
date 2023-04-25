const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    registrationNo: {
      type: String,
      required: true,
      unique: true
    },
    loginCode: {
      type: String,
      required: false,
      unique: true
    },
    isScoreboardAllowed: {
      type: Boolean,
      required: false,
      default: false
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
      ref: 'Control',
      immuteable: true,
      set: value => new mongoose.Types.ObjectId(process.env.CONTROL_ID),
      default: new mongoose.Types.ObjectId(process.env.CONTROL_ID)
    }
  },
  {
    timestamps: true,
  }
);

// Model Functions (query methods)

userSchema.statics.findByLoginCode = async function (loginCode) {
  const user = await User.findOne({ loginCode }).populate('control');
  if (!user) {
    throw new Error("Invalid login code");
  }
  return user;
};

// Model Middlewares

// TODO: set the loginCode when document created for the first time
// userSchema.pre("save", async function (next) {
//   // this refres to the saving object
//   //   if (this.isModified("password")) {
//   //     this.password = await bcrypt.hash(this.password, 8);
//   //   }
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
