import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const seedAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) return;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ email });

  if (!existing) {
    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });
    return;
  }

  const update = {};

  if (existing.role !== "admin") update.role = "admin";
  update.password = hashedPassword;

  if (Object.keys(update).length > 0) {
    await User.updateOne({ _id: existing._id }, { $set: update });
  }
};
