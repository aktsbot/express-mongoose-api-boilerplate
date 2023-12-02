import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";

import logger from "../logger.js";

const UserSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      default: () => uuidv4(),
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "active", // active, inactive
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const passwordHash = await argon2.hash(this.password);
  this.password = passwordHash;
  return;
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await argon2.verify(this.password, password);
  } catch (error) {
    logger.error("Could not validate password");
    return false;
  }
};

export default mongoose.model("User", UserSchema);
