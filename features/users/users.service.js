const {
  userRepository,
} = require("../../infrastructure/repositories/users/users.repository");

class UserService {
  async createUser(payload) {
    const user = await userRepository.createUser(payload);
    return user;
  }
}

exports.userService = new UserService();
