const { authenticationService } = require("./authentication.service");

class AuthenticationController {
  async login(req, res) {
    try {
      const user = await authenticationService.login(req.body);
      if(user)
      return res.status(200).json({message: "Login successfully"});
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
}

exports.authenticationController = new AuthenticationController();
