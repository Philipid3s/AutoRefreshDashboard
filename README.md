# Auto Refresh Dashboard
[![Build status](https://ci.appveyor.com/api/projects/status/186wq79hw2d818kxqxnh/branch/master?svg=true)]
### Description
A Node.js server connects, by interval, to a SQL server to send request(s). 
The result is propagated to the web client dashboard and is automatically displayed.

### Pre requisites
- Node.js
- websocket.io (https://socket.io/)
- Express - minimalist web framewark (http://expressjs.com/)
- mssql - MS Sql client for node.js (https://www.npmjs.com/package/mssql)
