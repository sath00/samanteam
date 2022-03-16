const http = require('http');

const app = require('./backend/app');


//setting up the port and creating the server
const port = 3000;
app.set('port',port)
const server = http.createServer(app);
server.listen(port);
