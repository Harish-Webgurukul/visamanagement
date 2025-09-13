const express = require("express");
const router = express.Router();
const { userValidation } = require("../validators/userValidator");
const { uploadLocalProfile } = require("../config/multer"); // dual storage
const userController = require("../controllers/userController");

// ✅ Create User (single profile image)
router.post(
  "/",
  uploadLocalProfile.single("profileImage"),
  userValidation(false),
  userController.createUser
);

// ✅ Update User (single profile image)
router.put(
  "/:id",
  uploadLocalProfile.single("profileImage"),
  userValidation(true),
  userController.updateUser
);

// ✅ Get All Users
router.get("/", userController.getUsers);

// ✅ Get Single User
router.get("/:id", userController.getUser);

// ✅ Delete User
router.delete("/:id", userController.deleteUser);

module.exports = router;

