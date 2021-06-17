const csv = require('@fast-csv/parse');
module.exports =
   {
     main
   }

function main(options){


    const filename =    options.filename;
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
                .parseFile(filename, { headers: true, delimiter: fileType })
                .on("data", function (data) {
                    dataArr.push(data);
                })
                .on("end", function () {
                    resolve(true);
                    console.log("++++++++++++Favorite color and Lastname SORT ASC+++++++++++");
                    dataArr = dataArr.sort(sortByPropertyASC("FavoriteColor"));
                    console.log(dataArr.sort(sortByPropertyASC("LastName")));

                    console.log("++++++++++++Birthdate SORT asc+++++++++++");
                    console.log(dataArr.sort((a, b) => new Date(a.DateOfBirth) - new Date(b.DateOfBirth)));

                    console.log("++++++++++++Lastname SORT DESC+++++++++++");
                    console.log(dataArr.sort(sortByPropertyDESC("LastName")));

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