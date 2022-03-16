//imported the http module server creation
const http = require('http');


//imported app.js
const app = require('./backend/app');


//setting up the port and creating the server
const port = 3000;
app.set('port',port)
const server = http.createServer(app);
server.listen(port);
