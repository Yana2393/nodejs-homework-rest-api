const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, authenticate } = require("../../middlewares");

const schemas = require("../../schemas/contacts.js");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/",authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId",authenticate, ctrlWrapper(ctrl.getById));

router.post("/",authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId",authenticate, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteContactSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;