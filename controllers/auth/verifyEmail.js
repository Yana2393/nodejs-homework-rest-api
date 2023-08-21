const sgMail = require("@sendgrid/mail");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { SEND_GRID_API_KEY } = process.env;
const { RequestError } = require("../helpers");

sgMail.setApiKey(SEND_GRID_API_KEY);

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "Verification has already been passed ");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;