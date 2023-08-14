const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");

const { User } = require("../../models/user");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const avatarDir = path.join(__dirname, "../", "public", "avatars");
  const resultUpload = path.join(avatarDir, filename);

  const image = await jimp.read(tmpUpload);
  await image.cover(250, 250).write(resultUpload);

  await fs.unlink(tmpUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;
