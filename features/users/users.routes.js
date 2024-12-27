const { userController } = require("./users.controller");

const router = require("express").Router();

router.get("/", userController.listUsers);
router.post("/register", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
