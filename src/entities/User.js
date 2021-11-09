const { 
	randomUUID,
	createHmac
} = require('crypto');

const SECRET_KEY_FOR_PASSWORDS = 'df31sdf65sd1f546s4f464s4f1s4';

class User {
	constructor (user, id='') {
		const { name, email, password } = user;

		this.id = id === '' ? randomUUID() : id;
		this.name = name;
		this.email = email;
		this.password = createHmac('md5', SECRET_KEY_FOR_PASSWORDS).update(password).digest('hex');
		this.token = '';
	}	

	isValid() {
		delete this.token; 
		
  	const propertyNames = Object.getOwnPropertyNames(this);
  	const amountInvalid = propertyNames
    	.map(property => (!!this[property]) ? null : `${property} is missing`)
    	.filter(item => !!item)

  	return {
    	valid: amountInvalid.length === 0,
    	error: amountInvalid
  	}
  }
}

module.exports = User;