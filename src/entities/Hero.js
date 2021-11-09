const { randomUUID } = require('crypto');

class Hero {
  constructor({ name, age, power }) {
    this.id = randomUUID();
    this.age = age;
    this.name = name;
    this.power = power;
  }

  isValid() {
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

module.exports = Hero;