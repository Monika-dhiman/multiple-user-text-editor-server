const { authenticationController } = require("./authentication.controller");

const router = require("express").Router();

router.post('/login', authenticationController.login);


module.exports = router;