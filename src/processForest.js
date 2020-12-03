const fs = require('fs');
const parse = require("csv-parse");

const filePath = "./data/forest/forest-area-km.csv"
const fileJSON = "./results/forset.json"

const readCSV = async () => {
    console.log("Start program")
    fs.createReadStream(filePath).pipe(parse({ delimiter: ',' }, function (err, csvData) {
        if (err) { console.log('Error reading CSV file1', err); return; }

        // console.log(csvData)

        let forestYearly = {} 
        for ( let i = 1; i < csvData.length - 1; i++ ){
            let row = csvData[i]
            // console.log(row)
            if(row[0] === "World"){ 
                // console.log('found world')
                forestYearly[Number(row[2])] = row[3]
            }
        }

        console.log(forestYearly)

        let data = JSON.stringify(forestYearly);
        fs.writeFileSync(fileJSON, data);
        console.log("complete")

    }));
}

module.exports = readCSV
