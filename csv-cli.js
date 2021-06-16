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
    let dataArr = [];
    try{
        const parser = csv
            .parseFile(filename, { headers: true, delimiter: fileType })
            .on("data", function (data) {
                console.log(data);
                dataArr.push(data);
                
            })
            .on("end", function () {
                resolve(true);
                console.log("++++++++++++Favorite color and Lastname SORT ASC+++++++++++");
                dataArr = dataArr.sort(sortByPropertyASC("FavoriteColor"));
                console.log(dataArr.sort(sortByPropertyASC("LastName")));
                
                console.log("++++++++++++Birthdate SORT asc+++++++++++");
                console.log(dataArr.sort((a,b) => new Date(a.DateOfBirth) - new Date(b.DateOfBirth)));

                console.log("++++++++++++Lastname SORT DESC+++++++++++");
                console.log(dataArr.sort(sortByPropertyDESC("LastName")));

            })
            .on("error", function () {
                reject(false);
                console.log("++csv is in ERROR++")
            });

        } catch(e){
            console.log(e.stack)
        }
    });

    
    function sortByPropertyASC(property){
        return function(a,b){  
            if(a[property] > b[property])  
               return 1;  
            else if(a[property] < b[property])  
               return -1;  
        
            return 0;  
         }  
      }

      function sortByPropertyDESC(property){
        return function(a,b){  
            if(a[property] > b[property])  
               return -1;  
            else if(a[property] < b[property])  
               return 1;  
        
            return 0;  
         }  
      }
