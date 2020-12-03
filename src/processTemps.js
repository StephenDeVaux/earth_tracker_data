const fs = require('fs');
const parse = require("csv-parse");

const filePathTemp = "./data/temp/land_sea_temp.csv"

const fileJSONTemp = "./results/temp.json"

const readCSV = async () => {
    console.log("Start program")
    fs.createReadStream(filePathTemp).pipe(parse({ delimiter: ',' }, function (err, csvData) {
        if (err) { console.log('Error reading CSV file1', err); return; }

        let yearlyTemps = {}
        for(let i = 0; i < csvData.length ; i++ ) {
            let row = csvData[i][0].split("    ")
            console.log(row)
            yearlyTemps[row[0]] = row[1]
        }

        

        let data = JSON.stringify(yearlyTemps);
        fs.writeFileSync(fileJSONTemp, data);
        console.log("complete")
    }));
}

module.exports = readCSV
