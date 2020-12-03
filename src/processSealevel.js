const fs = require('fs');
const parse = require("csv-parse");

const filePath = "./data/sealevel/CSIRO_Recons_gmsl_yr_2019 (1).csv"

const fileJSON = "./results/seaLevel(mm).json"

const readCSV = async () => {
    console.log("Start program")
    fs.createReadStream(filePath).pipe(parse({ delimiter: ',' }, function (err, csvData) {
        if (err) { console.log('Error reading CSV file1', err); return; }

        // console.log(csvData)

        let yearlyLevel = {}
        for(let i = 1; i < csvData.length ; i++ ) {
            let row = csvData[i]
            // console.log(row)
            yearlyLevel[row[0].slice(0,4)] = Number(row[1].trim())
        }

        console.log(yearlyLevel)

        

        let data = JSON.stringify(yearlyLevel);
        fs.writeFileSync(fileJSON, data);
        console.log("complete")
    }));
}

module.exports = readCSV
