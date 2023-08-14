const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
    },
  });
};

module.exports = register;
