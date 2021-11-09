const DEFAULT_HEADER = { 'Content-Type': 'application/json' };
const {
  generateInstanceForHeroes,
  generateInstanceForUsers,
} = require('./factories');
const { 
  Hero,
  User,
} = require('./entities');
const heroService = generateInstanceForHeroes();
const userService = generateInstanceForUsers(); 


const createHero = async (request, response) => {
  try {
    for await (const dataJson of request) {
      
      const { authorization } = request.queryString;
      const data = JSON.parse(dataJson);
      const hero = new Hero(data);
      const { error, valid } = hero.isValid();

      if (!valid) 
        return response
          .writeHead(400, DEFAULT_HEADER)
          .end(JSON.stringify({ error: error.join(', ')}));

      const tokenIsRegistered = await userService.tokenIsRegistered(authorization);

      if (!tokenIsRegistered) 
        return response.writeHead(401, DEFAULT_HEADER).end();
        
      const ID = await heroService.create(hero);
      
      response
        .writeHead(201, DEFAULT_HEADER)
        .end(JSON.stringify({ id: ID }));
    }
  }
  catch (err) {
    response.writeHead(409, DEFAULT_HEADER).end();
  }
}

const deleteHero = async (request, response) => {
  try {
    const { id, authorization } = request.queryString;

    if (!id) 
      return response
        .writeHead(400, DEFAULT_HEADER)
        .end(JSON.stringify({ result: 'ID is not defined' }));

    const tokenIsRegistered = await userService.tokenIsRegistered(authorization);

    if (!tokenIsRegistered) 
      return response.writeHead(401, DEFAULT_HEADER).end(); 
    
    await heroService.exclude(id);
    
    return response.writeHead(202, DEFAULT_HEADER).end();

  } catch(err) {
    response.writeHead(409, DEFAULT_HEADER).end();
  }
}

const getHeroes = async (request, response) => {
  try {
    const { id, authorization } = request.queryString;

    const tokenIsRegistered = await userService.tokenIsRegistered(authorization);

    if (!tokenIsRegistered) 
      return response.writeHead(401, DEFAULT_HEADER).end(); 

    const heroes = await heroService.find(id);

    if (!heroes) 
      return response.writeHead(204, DEFAULT_HEADER).end();

    return response
      .writeHead(200, DEFAULT_HEADER)
      .end(JSON.stringify([{ heroes }], null, ' '));

  } catch(err) {
    response.writeHead(409, DEFAULT_HEADER).end();
  }
}

const updateHero = async (request, response) => {
  const { id, authorization } = request.queryString;
  
  try {
    for await (const data of request) {
      const item = JSON.parse(data);
      const hero = new Hero(item);

      const tokenIsRegistered = await userService.tokenIsRegistered(authorization);

      if (!tokenIsRegistered) 
        return response.writeHead(401, DEFAULT_HEADER).end() ;

      await heroService.update({ id, hero });
      
      return response.writeHead(202, DEFAULT_HEADER).end();
    }
  } catch (err) {
    response.writeHead(409, DEFAULT_HEADER).end();
  }
}

const createUser = async (request, response) => {
  try {
    for await (const dataJson of request) {
      
      const data = JSON.parse(dataJson);
      const user = new User(data);
      const { error, valid } = user.isValid();

      if (!valid) 
        return response
          .writeHead(400, DEFAULT_HEADER)
          .end(JSON.stringify({ error: error.join(', ')}));

      const { id, token } = await userService.createUser(user);
      
      return response
        .writeHead(201, DEFAULT_HEADER)
        .end(JSON.stringify({ id: id, token: token }));
    }
  }
  catch (err) {
    response.writeHead(409, DEFAULT_HEADER).end();
  }
}

const updateUser = async (request, response) => {
  try {
    const { id, authorization } = request.queryString;

    for await (const dataJson of request) {
      
      const data = JSON.parse(dataJson);
      const user = new User(data);
      const { error, valid } = user.isValid();

      if (!valid) 
        return response
          .writeHead(400, DEFAULT_HEADER)
          .end(JSON.stringify({ error: error.join(', ')}));

      const tokenIsRegistered = await userService.tokenIsRegistered(authorization);

      if (!tokenIsRegistered) 
        return response.writeHead(401, DEFAULT_HEADER).end(); 

      const { id: newId, token } = await userService.updateUser({ id, user });
      
      return response
        .writeHead(202, DEFAULT_HEADER)
        .end(JSON.stringify({ id: newId, token: token }));
      
    }
  } catch (err) {
    response.writeHead(409, DEFAULT_HEADER).end();
  }
}

const deleteUser = async (request, response) => {
  try {
    const { id, authorization } = request.queryString;

    if (!id || id === '') 
      return response
        .writeHead(400, DEFAULT_HEADER)
        .end(JSON.stringify({ result: 'ID is not defined' }));

    const tokenIsRegistered = await userService.tokenIsRegistered(authorization);

    if (!tokenIsRegistered) 
      return response.writeHead(401, DEFAULT_HEADER).end();

    await userService.excludeUser(id);

    return response.writeHead(202, DEFAULT_HEADER).end();

  } catch(err) {
    response.writeHead(409, DEFAULT_HEADER).end();
  }
}

const login = async (request, response) => {  
  try {
    for await (const userData of request) {
      const data = JSON.parse(userData);
      const user = new User(data);
      const userExists = await userService.login(user);

      if (!userExists.length > 0) 
        return response
          .writeHead(400, DEFAULT_HEADER)
          .end(JSON.stringify({ result: 'Email or password incorrect' }));

      const { id, token } = userExists.reduce((acc, obj) => {
        return obj
      },{})
      
      return response
        .writeHead(200, DEFAULT_HEADER)
        .end(JSON.stringify({ id, token }))
    }
  } catch (err) {
    response.writeHead(409, DEFAULT_HEADER).end();
  }
}

module.exports = {
  Hero: {
    getHeroes,
    createHero,
    deleteHero,
    updateHero,
  },
  User: {
    createUser,
    updateUser,
    deleteUser,
    login,
  }
}