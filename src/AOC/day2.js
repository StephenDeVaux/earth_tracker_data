const fs = require('fs');
const parse = require("csv-parse");

const inputCsv = "./data/day2data.csv"

const readCSV = async () => {
    console.log("Day 2")
    fs.createReadStream(inputCsv).pipe(parse({ delimiter: ' ' }, function (err, csvData) {
        if (err) { console.log('Error reading CSV file1', err); return; }

        console.log(csvData)

        arrayData = csvData.map(x => x[0])

        console.log(arrayData)

        horizontalPos = 0
        depth = 0 
        aim=0
        csvData.forEach(element => {
            if(element[0] == 'forward'){
                horizontalPos += parseInt(element[1])
                depth += parseInt(element[1])*aim
            }
            if(element[0] == 'down'){
                aim += parseInt(element[1])
            }
            if(element[0] == 'up'){
                aim -= parseInt(element[1])
            }
        });

        console.log('horizontalPos = ' + horizontalPos)
        console.log('depth = ' + depth)
        console.log('Total = ' + depth*horizontalPos)

    }));
}

module.exports = readCSV
