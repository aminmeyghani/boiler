/**
* ## actions/tunnel ##
* 
* - Author: Amin Meyghani
* - Date: 05/03/2015
* - Description: Tunnels a local port to a public url. http(s)://subdomain.ngrok.com
*
**/
var inquirer = require("inquirer");
var ngrok = require("ngrok");
var tunnel = {
	run: function(options){
		var questions = [
			{
				type: "input",
				name: "port",
				message: "Which local port to you want to tunnel? eg: 3000",
				validate: function( value ) {
					var pass = value ? value.match(/[0-9]/) : value = true // Port >= 8000  && port < 9000
					return pass ? true : "Invalid port :( Port # should be higher than 8000 and less than 9000";
				}
			},
			{
				type: "input",
				name: "subdomain",
				message: "Assign a public subdomain. eg: coolsite",
				validate: function( value ) {
					var isValid = value.match(/^[a-zA-Z_][\w]+$/);  // can start with a letter or underscore followed by a-zA-Z_ (no spaces, no hyphens) (at least for now)
					return isValid ? true : "Invalid name :( hyphens and spaces are not allowed for now";
				}
			},
		];
		inquirer.prompt( questions, function( answers ) {
			ngrok.connect({
				authtoken: "iAd/S3/D+epB5rJKt8ZP",
				subdomain: answers.subdomain || "boil",
				port: answers.port || 3000,
			}, function(err, url){
				__blogger.info("You can view the site at: http://" + answers.subdomain + ".ngrok.com" );
			});
		});
	}
};

module.exports = tunnel;
