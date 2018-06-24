var express = require('express');
var app = require('express')();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const config = require("./config");

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Object that handle the result of the SQL request
var message = {
  time: Date.now(),
  data: {}
}


// Every 30 seconds, we send a request to the SQL Server
setInterval(() => {
  const sql = require('mssql');

  // Open Sql Server Configuration Manager,
  // and enable TCP/IP protocol from SQL Server Network Configuration
  // Port 1433
  console.log("Connecting sql server...");
  sql.connect(config, (err) => {
    if (err) {
      console.log(err);
      return;
    };

    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT count(*) as count FROM ALF', function (err, result) {
      if (err) {
        console.log(err);
        return;
      };

      message = {
        time: Date.now(),
        data: result.recordset[0].count
      }

      console.log(message);

      sql.close();
    });
  })
}, 30000);

// Every 5 seconds we send the updated result to the client
io.on('connection', function (socket) {

  console.log("New Client !");
  // test initial
  socket.emit('news', { hello: 'world' });

  setInterval(() => {
        socket.emit('result', {
          message: message
        })
  }, 5000);
});
