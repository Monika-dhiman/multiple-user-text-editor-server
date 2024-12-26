const User = require("../../../domain/users/users.entity");
const BaseRepository = require("../base.repositories");

class UserRepository extends BaseRepository {
  constructor() {
    super({ model: User });
  }

  async createUser(payload, options) {
    return this.create(payload);
  }

  async findAllUsers(projection = {}, options = {}) {
    return this.find({}, projection, options);
  }

  async findUserById(criteria, projection = {}, options = {}) {
    return this.findOne(criteria, projection, options);
  }

  async updateUser(criteria, payload, options = {}) {
    return this.update(criteria, payload, options);
  }

  async deleteUser(query, options = {}) {
    return this.delete(query, options);
  }
}

exports.userRepository = new UserRepository();
