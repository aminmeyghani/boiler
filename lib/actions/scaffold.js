/**
* ## actions/scaffold ##
* 
* - Author: Amin Meyghani
* - Date: 05/03/3015
* - Description: Example for a task with multiple options
*
**/

/** 
* ##`run`
* 
* ### Description ###
* 
* Runs the action.
* 
* ### Params: ###
* 
* 1. __thing__ : Questions configuration used to ask user input.
* 2. __opts__: Options passed int
* 3. __flags__: The possible flags
*/

var scaffold = {
  run: function(thing, opts, flags) {
    __blogger.info(thing);
    __blogger.info(opts);
    console.log("Flags: %j", flags);
    __blogger.info("Running the command from: "+ process.cwd()); // current directory: whereever it is:
    __blogger.warn("The directory where this script is " + __dirname); // directory from which the code is running from: node_modules/boiler/lib/actions
  }
};

module.exports = scaffold;
