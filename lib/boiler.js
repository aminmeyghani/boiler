#!/usr/bin/env node

// boiler CLI
// -------------
	/**
	* 
	* - Author: Amin Meyghani
	* - Date: 05/03/2015
	* - Description: The boiler-cli
	*
	**/

// Modules
// -------------
	/* ## Modules
	*
	* - __fs-extra__: standard file system operation with addition to the built-in fs.
	* - __commander__: deals with reading command line arguments.
	* - __config__: The cli configuration and settings (internal).
	* - __serve__: The server action (internal).
	* - __inquirer__: Used to get user input.
	* 
	* ## globals
	*
	* - ____base__: The path to the main file: "whateverpath/to/src/".
	* - ____cwd__: The current folder from which the client is calling the command from.
	* - ____brErrors__: Global to keep track of the errors that happened.
	* - ____blogger__: Global helper for printing stuff to the console.
	* - __blogger__: helper for printing help message (internal).
	* - __shelljs__: Makes the unix shell available globally.
	*
	**/

GLOBAL.__base = require('path').dirname(require.main.filename) + "/";
GLOBAL.__cwd = process.cwd() + "/";
GLOBAL.__brErrors = [];
GLOBAL.__brMsg = [];

// utility
// -------------
GLOBAL.__blogger = require(__base + "lib/blogger");
require('shelljs/global');

// Core modules
// -------------
var app = require(__base + "config.js");
var fs = require("fs-extra");
var program = require("commander");
var inquirer = require("inquirer");
var action = require(__base + "action");

// actions (commands)
// -------------
var server = require(__base + "actions/server");
var scaffold = require(__base + "actions/scaffold");
var custom = require(__base + "actions/custom");
var tunnel = require(__base + "actions/tunnel");

// Main Global Settings
// -------------
var global = { keyword: process.argv[2] };

// Main
// -------------

program
	.version(app.version)
	.usage("<keywords> [options]")
	.option("-s, --settings <settings>", "Specify the path of a config.json file")
	.option("-k, --kind <cross browser or responsive testing>", "Type of automated testing, responsive or cross browser testing")
	.option("-p, --port <port number>", "The port that the server would be listening at for requests")
	// .on("--help", function(){ __blogger.printHelp() }) // for custom help

// Serve Action (with prompt)
// -------------
	/** 
	* ##`boiler serve`
	* 
	* ### Description ###
	* 
	* Used to serve static files with a basic http server
	* 
	* ### Usage ###
	*   Simply do `boiler serve` and then you will be prompted to put in values:
	*   - first: The port number: use a value between 8000 and 9000
	*   - second: The directory to serve the files from. You could just drag and drop the folder that you want to serve and hit enter.
	*/
action.add(
	{
		name: "serve",
		description: "Serve static files with a simple http server with connect middleware."
	},
	function(data, dir) {
		server.run();
});

// Serve Action (no prompt)
// -------------
	/** 
	* ##`boiler s <directory> -p <port>`
	* 
	* ### Description ###
	* 
	* Used to serve static files with a basic http server
	* 
	* ### Parameters: ###
	* 
	* 1. __directory__ : *string* (required) The directory to be served.
	* 2. __port__ : *int* The port number. Default: 8228
	* 
	* ### Usage ###
	*   Just do `boiler s path/to/serve -p portvalue`
	* 
	* ### Examples ###
	*
	*   Example 1: Serve current folder at 9000
	*
	*     boiler s . -p 9000
	*
	*   Example 2: Serve ./main/public at 9000
	*
	*     boiler s ./main/public -p 9000
	*
	*/
action.add(
	{
		name: "s",
		arg: "directory",
		description: "Server action without the prompt."
	},
	function(data, dir) {
		server.runNoPrompt({directory: dir, port: data.port});
});

// Tunnel Action (no prompt)
// -------------
  /** 
  * ##`boiler tunnel`
  * 
  * ### Description ###
  * 
  * Used to tunnel a local port to a remote url.
  * 
  */
action.add(
	{
		name: "tunnel",
		description: "Tunnels a local site to a public url: subdomain.ngrok.com"
	},
	function(data) {
		tunnel.run();
});

// Test Action (no prompt)
// task example using a settings file.
// -------------
	/** 
	* ##`boiler custom -k <custom thing> -s <settings-file>`
	* 
	* ### Description ###
	* 
	* Used for running a task with a configuration json file.
	* 
	* ### Parameters: ###
	* 
	* 1. __k__ : *string* (required) a custom thing. Could be the name of an action.
	* 2. __s__ : *string* The path to the settings.json file that has the options.
  *
	*/
action.add(
	{
		name: "custom",
		description: "Test task without prompt. -k: task name, -s: path to settings.json"
	},
	function(data) {
		custom.runNoPrompt({kind: data.kind, settings: data.settings, prompt: data});
});

// Test Action
// -------------
	/** 
	* ##`boiler help`
	* 
	* ### Description ###
	* 
	* Prints a summary of options and commands that are available.
	* 
	* ### Usage ###
	*   Just do `boiler help`
	*/
action.add(
	{
		name: "help",
		description: "Provides overview of the options and actions/keywords"
	},
	function(data) {
		data.help();
});

// docs Action
// -------------
	/** 
	* ##`boiler docs`
	* 
	* ### Description ###
	* 
	* Prints a more detailed documentation for all the tasks and options that are available.
	* 
	* ### Usage ###
	*   Just do `boiler docs`
	*
	*
	*/
action.add(
	{
		name: "docs",
		description: "Prints the docs to the console with examples."
	},
	function(data) {
		__blogger.printHelp();
});

// Docsfor Action
// -------------
	/** 
	* ##`boiler docsfor <command-name>`
	* 
	* ### Description ###
	* 
	* Prints the docs for a given command.
	* 
	* ### Usage ###
	*   Just do `boiler docsfor nameofcommand`
	*/
action.add(
	{
		name: "docsfor",
		arg: "command_name",
		description: "Print the help for a given action or command: eg: boiler docsfor serve"
	},
	function(data, what) {
		__blogger.docsFor(what);
});

// Scaffold Action
// -------------
	/** 
	* ##`boiler scaffold <arg> <params...>`
	* 
	* ### Description ###
	* 
	* Example for a task that uses all the possible options and keywords. You can refer to this as an example to remember what the possible options are.
	* 
	* ### Usage ###
	*   Just do `boiler scaffold`
	*/
action.add(
	{
		name: "scaffold",
		arg:"thing",
		params: "configs",
		description: "A demo task showcasing how a task can be defined without inquir."
	},
	function(data, t, ops) {
		scaffold.run(t, ops, {flag1: "flag1 value", flag2: "flag2 value"});
});

// * Action
// -------------
	/** 
	* ##`boiler invalidcommand`
	* 
	* ### Description ###
	* 
	* Catches invalid commands. Prints help if the command entered is not valid.
	*
	*/
action.add(
	{
		name: "*",
		description: "Catch invalid tasks"
	},
	function(data){
		__blogger.warn("Comand Doesn't exist");
		__blogger.info("See the available options and tasks below:");
		program.help();
});

// -------------
// Read the command line arguments
program.parse(process.argv);

// Print help with no arguments are passed in.
if(!global.keyword) { program.help(); }
