const fs = require('fs');
const parse = require("csv-parse");

const filePathC02 = "./data/co2/CO2_histroical.csv"
const filePathC021980 = "./data/co2/C02GlobalAverage.csv"

const fileJSONCO2 = "./results/co2.json"

const readCSV = async () => {
    console.log("Start program")
    fs.createReadStream(filePathC02).pipe(parse({ delimiter: ',' }, function (err, csvData) {
        if (err) { console.log('Error reading CSV file1', err); return; }

        let yearlyC02ppm = {}
        for (let i = 1; i < csvData.length; i++) {
            yearlyC02ppm[csvData[i][0]] = Math.round(Number(csvData[i][1]) * 100) / 100;
        }

        fs.createReadStream(filePathC021980).pipe(parse({ delimiter: ',' }, function (err, csvData) {
            if (err) { console.log('Error reading CSV file2', err); return; }

            let processedData = csvData.map(row => {
                let splitRow = row[0].trim().split("  ");
                return [splitRow[0], Number(splitRow[1].trim())]
            })
            for (let i = 0; i < csvData.length; i++) {
                yearlyC02ppm[processedData[i][0]] = processedData[i][1];
            }

            let data = JSON.stringify(yearlyC02ppm);
            fs.writeFileSync(fileJSONCO2, yearlyC02ppm);
            console.log("complete")

        }));
    }));
}

module.exports = readCSV
