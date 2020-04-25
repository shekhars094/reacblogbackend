const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSaltSync(10);
  const hash = await bcryptjs.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods.comparePass = function (plainText) {
  return bcryptjs.compareSync(plainText, this.password);
};

module.exports = mongoose.model("User", userSchema);
