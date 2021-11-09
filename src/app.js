const { createServer } = require('http');
const routes           = require('./routes');
const DEFAULT_HEADER   = { 'Content-Type': 'application/json' };

const internalServerError = (request, response) => {
  response
    .writeHead(500, { 'Content-Type': 'application/json' })
    .end(JSON.stringify({
      error: true,
      message: "internal server error"
    }));
}

const server = (request, response) => {
  try {
    const { 
      url, 
      method, 
      headers: {
        authorization
      } 
    } = request;
    
    const [first, route, id] = url.split('/');
    const key = `/${route}:${method.toLowerCase()}`;
    
    request.queryString = { id, authorization };

    response.writeHead(200, DEFAULT_HEADER);

    const chosen = routes[key] || routes.default;

    return chosen(request, response);
  
  } catch (err) {
    internalServerError(request, response);
  }
}

const PORT = 3000;

createServer(server)
  .listen(PORT, console.log(`Server on at ${PORT}`));  