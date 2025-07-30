import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
