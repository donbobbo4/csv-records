#!/usr/bin/env node


const yargs = require("yargs");
const csv = require('@fast-csv/parse');


const options = yargs
 .usage("Usage: -f <filename>")
 .option("f", { alias: "filename", describe: "filename to parse", type: "string", demandOption: true})
 .option("t", { alias: "fileType", describe: "comma,pipe, or space", type: "string", demandOption: true})
 .argv;

const filename = options.filename;
let fileType;
switch(options.fileType) {
    case "comma":
        fileType = ","
        break;
    case "pipe":
        fileType = "|"
        break;
    case "space":
        fileType = " "
        break;
}

console.log(filename);

let parserFcn = new Promise((resolve, reject) => {
    const parser = csv
        .parseFile(filename, { headers: true, delimiter: fileType })
        .on("data", function (data) {
            console.log(data);
        })
        .on("end", function () {
            resolve(true);
        })
        .on("error", function () {
            reject(false);
            console.log("++csv is in ERROR++")
        });
    });