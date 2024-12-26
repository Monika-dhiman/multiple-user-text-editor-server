const { userController } = require("./users.controller");

const router = require("express").Router();

router.post('/register', userController.createUser);

module.exports = router;