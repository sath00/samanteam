//imported the http module server creation
const http = require('http');
//setting up the port and creating the server
const port = process.env.PORT || 3000;
const app = require('./appRoutes');
const server = http.createServer(app);
server.listen(port);
console.log("Server Listening on port " + port);
//imported app.js
app.set('port', port)