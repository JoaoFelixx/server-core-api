const { HeroService }    = require('../services');
const { HeroRepository } = require('../repositories');
const { join } = require('path');

const filename = join(__dirname, '..', '..', 'database', 'Heroes.json');

const generateInstance = () => {
  
  const heroRepository = new HeroRepository({ file: filename });

  const heroService = new HeroService({ heroRepository });

  return heroService; 
}

module.exports = generateInstance;