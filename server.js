//imported the http module server creation
const http = require('http');



//setting up the port and creating the server
const port = 3000;
const app = require('./backend/app');
const server = http.createServer(app);
server.listen(port);
//imported app.js
app.set('port', port)