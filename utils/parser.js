const csv = require('@fast-csv/parse');
let config = require('../config.json');
module.exports = {
    main, 
    readCsv,
    insertRecord
}

function main(options) {


    const filename = options.filename;
    let fileType;
    let dataArr = [];
    switch (options.fileType) {
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

    let parser = new Promise((resolve, reject) => {

        try {
            const parser = csv
                .parseFile(filename, {
                    headers: true,
                    delimiter: fileType
                })
                .on("data", function (data) {
                    dataArr.push(data);
                })
                .on("end", function () {
                    console.log("++++++++++++Favorite color and Lastname SORT ASC+++++++++++");
                    dataArr = dataArr.sort(sortByPropertyASC("FavoriteColor"));
                    console.log(dataArr.sort(sortByPropertyASC("LastName")));

                    console.log("++++++++++++Birthdate SORT asc+++++++++++");
                    console.log(dataArr.sort((a, b) => new Date(a.DateOfBirth) - new Date(b.DateOfBirth)));

                    console.log("++++++++++++Lastname SORT DESC+++++++++++");
                    console.log(dataArr.sort(sortByPropertyDESC("LastName")));
                    resolve(true);
                })
                .on("error", function () {
                    reject(false);
                    console.log("++csv is in ERROR++")
                });

        } catch (e) {
            console.log(e.stack)
        }
    });



    return dataArr;
}
    
async function readCsv(sortType) {
    return new Promise((resolve, reject) => {
      const data = [];
        console.log("sortType:"+ sortType);
      const parser = csv.parseFile(config.default.file, {
        headers: true,
        delimiter: config.default.type
    })
        .on("error", reject)
        .on("data", (obj) => {
          if (obj) data.push(obj);
          if (sortType === 'birthdate') {
            data.sort((a, b) => new Date(a.DateOfBirth) - new Date(b.DateOfBirth))
          }else if(sortType ==='color'){
            data.sort(sortByPropertyASC('FavoriteColor'));
          }else if(sortType ==='name'){
            data.sort(sortByPropertyASC('LastName'));
          } else {
                data.sort(sortByPropertyASC(sortType));
            }
        })
        .on("end", () => {
          resolve(data);
        });
    });
  }

function sortByPropertyASC(property) {
    return function (a, b) {
        if (a[property] > b[property])
            return 1;
        else if (a[property] < b[property])
            return -1;

        return 0;
    }
}

function sortByPropertyDESC(property) {
    return function (a, b) {
        if (a[property] > b[property])
            return -1;
        else if (a[property] < b[property])
            return 1;

        return 0;
    }
}

async function insertRecord(record){

    return Promise.all([
        commaInsert(),
        pipeInsert(),
        spaceInsert()
      ]).then(recordPromise => {
  
        const resObj = {
          data: {
            message: 'Success',
            status: '200'
          },
          success: true
        }
        return res.status(200).send(resObj)
      }).catch(e => {
        console.error('e', e)
        const resObj = {
          data: null,
          success: false
        }
        return res.status(500).send(resObj)
      })
    }



const commaInsert = () => {
    let success = true;
    console.log('comma insert');
    
    return success;
}

const pipeInsert = () => {
    let success = true;
    console.log('pipe insert');
    return success;
}
const spaceInsert = () => {
    let success = true;
    console.log('space insert');
    return success;
}
