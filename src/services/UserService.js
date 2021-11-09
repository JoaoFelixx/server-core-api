class UserService {
  constructor ({ userRepository }) {
    this.userRepository = userRepository;
  }

  async login({ email, password }) {
    return await this.userRepository.login({ email, password });
  }

  async createUser(data) {
    return await this.userRepository.createUser(data);
  }

  async updateUser({ id, user }) {
    return await this.userRepository.updateUser({ id, user });
  }

  async excludeUser(id) {
    return await this.userRepository.deleteUser(id);
  }

  async tokenIsRegistered(token) {
    return await this.userRepository.tokenIsRegistered(token);
  } 
}

module.exports = UserService;