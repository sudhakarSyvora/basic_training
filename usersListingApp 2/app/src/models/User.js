const mongoose = require("mongoose");

 
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  role: {
    type: String,
    enum: ["admin", "operations", "sales"],
    default: "sales",
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
