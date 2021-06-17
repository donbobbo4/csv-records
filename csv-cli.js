#!/usr/bin/env node

const parser = require('./parser.js');
const yargs = require("yargs");
//function main(args) {
   
    let args;

    let options;

    console.log("+++ARGS"+ args);

    if (!args) {
        console.log("OOH NOOOO");
        options = yargs
            .usage("Usage: -f <filename>")
            .option("f", { alias: "filename", describe: "filename to parse", type: "string", demandOption: true })
            .option("t", { alias: "fileType", describe: "comma,pipe, or space", type: "string", demandOption: true })
            .argv;
    } else {
        console.log("succeed");
        options = args;
    }
    parser.main(options)

console.log("options" + options.filename);




//main();
