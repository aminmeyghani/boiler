// --------------
/*
	- Author: Amin Meyghani
	- Date: 05/3/2015
	- Description: Helper for logging to the console.

	### Modules ###
  * - __chalk__: pretty printing to the console.
  * - __chip__: helper for logging.
	* - __colors__: add colors to the console output.
  * - __fs__: for working with files and folders.
	* - __path__: used for resolving paths.
*/
// --------------
var chalk = require('chalk'); // used for pretty printing to the console.
var log = require('chip')(); // helper for logging.
var colors = require('colors'); // add colors to the console.
var fs = require("fs");
var path = require("path");



var help = {
	printHelp: function () {

		console.log('  Keywords:\n');
		console.log('    ui: scaffolds a new ui component \n'+
										 '    service: scaffolds a new service \n' + 
										 '    generate: general purpose generator for making uis, services, etc. \n');
										 
		
		console.log('  Description:\n');
		console.log('    boiler is a general purpose commander interface. It wraps around commander and other \n'+
										 '    modules to prompt the user to run commands. \n');

		console.log('  Examples:\n'.inverse.green);

		console.log('    Make a new ui element');
		console.log('        boiler ui'.white);

		console.log('    Spin up a simple static http server');
		console.log('        boiler serve ./site -p 5000\n'.white);
	},
	// prints docs for a given action.
	docsFor: function(file){
		var filePath = __base + "/docs/" + file + ".txt";
		
		fs.readFile(filePath, "utf-8", function(err, data){
			if ( err ) {throw new Error(); console.log(err)}
			console.log(data);
		});
	},
	// helpers for printing to the console.
	log:   function (msg) { log.info(chalk.green(msg))},
	info:  function (msg) { log.debug(chalk.magenta(msg))},
	warn:  function (msg) { log.warn(chalk.yellow(msg))},
	error: function (msg) { log.error(chalk.red(msg))}
};
module.exports = help;
