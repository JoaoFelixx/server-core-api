const { readFile, writeFile } = require('fs/promises');
const { Buffer } = require('buffer');

class UserRepository {
	constructor ({ file }) {
    this.file = file;
  }

  async __currentFileContent() {
    return JSON.parse(await readFile(this.file, 'utf8'));
  } 

  async recordInTheFile(currentFile) {
    return await writeFile(this.file, JSON.stringify(currentFile), 'utf8');
  }

  async createUser(user) {
    try {
      const allUsers = await this.__currentFileContent();
      
      user.token = await this.generateToken(user.id);
      allUsers.push(user);

      await this.recordInTheFile(allUsers);

      return { 
        token: user.token,
        id: user.id
      };
    } catch(err) {      
      throw new Error(err);
    }
  }

  async updateUser({ id, user }) {
    try {
      const allUsers = await this.__currentFileContent();
      const savedUsers = allUsers.filter(({ id: _id }) => id != _id);
      
      user.token = await this.generateToken(id);

      savedUsers.push(user);

      await this.recordInTheFile(savedUsers);

      return {
        token: user.token,
        id: user.id
      }
    } catch (err) {
      throw new Error(err);
    }
  	
  }

  async deleteUser(id) {
    try {
      if (!id) return await this.record([]);

      const allUsers = await this.__currentFileContent(); 
      const savedUsers = allUsers.filter(({ id: _id }) => id != _id);
      
      return await this.recordInTheFile(savedUsers);
    
    } catch(err) {
      throw new Error(err);
    }
   
  }

  async generateToken(id) {
    try {
      const token = await 'Bearer live_' + Buffer.from(id, 'utf8').toString('hex');
    
      return await token;

    } catch (err) {
      throw new Error(err);
    }
  }

  async tokenIsRegistered(token) {
    const allUsers = await this.__currentFileContent();
    const dataExists = allUsers.filter(({ token: _token }) => token === _token);

    return dataExists.length > 0 ? true : false;
  }

  async login({ email, password }) {
    const allUsers = await this.__currentFileContent();
    const userExists = allUsers.filter((user) => {
      if (user.email === email && user.password === password)
        return true;
      return false;
    })  
    return userExists;
  }
}

module.exports = UserRepository;