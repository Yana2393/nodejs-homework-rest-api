const express = require("express");

const {validateBody, authenticate, upload} = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const schemas = require("../../schemas/auth.js");

const ctrl = require("../../controllers/auth");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.verifySchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout))

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;