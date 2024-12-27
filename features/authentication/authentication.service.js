const {
  userRepository,
} = require("../../infrastructure/repositories/users/users.repository");

class AuthenticationService {
  async login(payload) {
    const { email, password } = payload;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = await userRepository.findUserById({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPassMatch = await user.comparePassword(password);
    console.log(isPassMatch)
    if (!isPassMatch) throw new Error("Invalid Error");

    return user;
  }
}

exports.authenticationService = new AuthenticationService();
