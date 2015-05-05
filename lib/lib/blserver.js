// --------------
/*
	Author: Amin Meyghani
	Date: 05/03/2015
	Description: 
		Simple web server for running tests or taking screenshots.
*/
// --------------
// Requirements
var connect = require("connect"); // middleware
var serveStatic = require("serve-static"); // connect module for serving static files.
var serverIndex = require("serve-index"); // connect mofule for indexing
var pathUtil = require('path') // helper for resolving path.
var http = require('http'); // http server

var myserver = {
	listen: function (port, publicPath, fn) {
		port = port || 8228; // default 8228
		publicPath = pathUtil.resolve(publicPath || '.') // serve current directory by default.
		// instantiate middleware
		var app = connect()
			.use(serverIndex(publicPath))
			.use(serveStatic(publicPath));
      
		// Instantiate server
		var server = http.createServer(app).listen(port, fn);
		__blogger.log("Server running at http://localhost:" + port + " ...");
		/*
		Useful for logging information:
			server.address()
			server.address().address
			server.address().port
		*/
	}
};
module.exports = myserver;
