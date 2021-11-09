const { UserService } = require('../services');
const { UserRepository } = require('../repositories');
const { join } = require('path');

const filename = join(__dirname, '..', '..', 'database', 'Users.json');

const generateInstance = () => {
	const userRepository = new UserRepository({ file: filename });

	const userService = new UserService({ userRepository });

	return userService;
}

module.exports = generateInstance;