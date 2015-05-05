/**
* ## actions/serve ##
* 
* - Author: Amin Meyghani
* - Date: 05/03/2015
* - Description: Responsible for starting a simple static http server.
*
**/

/** 
* ##`run`
* 
* ### Description ###
* 
* Starts the server
* 
* ### Params: ###
* 
*  __options__ (object) : Options used to configure the server.
*
*/

var http = require(__base + 'lib/blserver');
var inquirer = require("inquirer");

var server = {
	run: function(options) {
		var questions = [
			{
				type: "input",
				name: "port",
				message: "Which port: (eg: 8228)",
				validate: function( value ) {
					var pass = value ? value.match(/^[89][0-9]{3}$/) : value = true // Port >= 8000  && port < 9000
					return pass ? true : "Invalid port :( Port # should be higher than 8000 and less than 9000";
				}
			},
			{
				type: "input",
				name: "directory",
				message: "Serve path: (default: .)",
			}
		];
		
		inquirer.prompt( questions, function( answers ) {
			http.listen(answers.port, answers.directory.replace(/\s+/g,""));
		});
		
	},
	runNoPrompt: function (options) {
		http.listen(options.port, options.directory.replace(/\s+/g,""));
	}
};

module.exports = server;
