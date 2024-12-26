const { userService } = require("./users.service");

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    const user = await userService.createUser({name, email, password});
    res.json(user);
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await this.userService.login(username, password);
    res.json(user);
  }
}

exports.userController = new UserController();