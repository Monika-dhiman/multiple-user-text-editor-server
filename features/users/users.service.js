const {
  userRepository,
} = require("../../infrastructure/repositories/users/users.repository");

class UserService {
  async createUser(payload) {
    const { name, email, password } = payload;
    if (!name || !email || !password) {
      throw new Error("Name, email and password are required");
    }
    return userRepository.createUser({ name, email, password });
  }

  async listUsers() {
    return userRepository.findAllUsers();
  }

  async getUserById(id) {
    return userRepository.findUserById({ _id: id });
  }

  async updateUser(id, payload) {
    const { name } = payload;
    const user = await userRepository.updateUser({ _id: id }, { name });
    return user;
  }

  async deleteUser(id) {
    return userRepository.deleteUser({ _id: id });
  }
}

exports.userService = new UserService();
