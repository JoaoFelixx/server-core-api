const {
  Hero: {
    getHeroes,
    createHero,
    deleteHero,
    updateHero
  },
  User: {
    createUser,
    updateUser,
    deleteUser,
    login,
  }
} = require('../useCases');

const pageNotAFound = (request, response) => {
  response
    .writeHead(404, { 'Content-Type': 'application/json' })
    .end(JSON.stringify({
      error: true,
      message: 'Page not a found'
    }));
}

module.exports = {
  '/login:post': login,
  '/users:post': createUser,
  '/users:put': updateUser,
  '/users:delete': deleteUser,
  '/heroes:get': getHeroes,
  '/heroes:post': createHero,
  '/heroes:put': updateHero,
  '/heroes:delete': deleteHero,
  'default': pageNotAFound 
}