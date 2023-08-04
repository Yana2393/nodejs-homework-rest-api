const {Contact} = require("../../models/contact")

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };

  if (favorite === "true") {
    filter.favorite = true;
  } else if (favorite === "false") {
    filter.favorite = false;
  }
  const result = await Contact.find(filter, "", { skip, limit });
  res.status(200).json(result);
};


module.exports = getAll;