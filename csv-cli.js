#!/usr/bin/env node


const yargs = require("yargs");
const csv = require('@fast-csv/parse');


const options = yargs
 .usage("Usage: -f <filename>")
 .option("f", { alias: "filename", describe: "filename to parse", type: "string", demandOption: true})
 .argv;

const greeting = `Hello, ${options.name}!`;
const filename = options.filename;

console.log(filename);



let parserFcn = new Promise((resolve, reject) => {
    const parser = csv
        .parseFile(filename, { headers: true })
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