const { User } = require("../../models/user");

const { RequestError } = require("../helpers");


const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Email not found");
  }
  if (user.verify) {
    throw RequestError(404, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a
        target="_blanc"
        href="${BASE_URL}/api/users/verify/${user.verificationToken}"
      >
        Click verify email
      </a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send",
  });
};

module.exports = resendVerifyEmail;