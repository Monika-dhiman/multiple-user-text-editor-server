const { userService } = require("./users.service");

class UserController {
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await userService.deleteUser(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async listUsers(req, res) {
    try {
      const users = await userService.listUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
}

exports.userController = new UserController();