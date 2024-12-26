const router = require("express").Router();

router.use("/auth", require("./authentication/authentication.routes"));
router.use("/users", require("./users/users.routes"));

module.exports = router;
