const fs = require('fs');
const parse = require("csv-parse");

const filePath = "./data/population/projected-population-by-country.csv"

const fileJSON = "./results/population.json"

const readCSV = async () => {
    console.log("Start program")
    fs.createReadStream(filePath).pipe(parse({ delimiter: ',' }, function (err, csvData) {
        if (err) { console.log('Error reading CSV file1', err); return; }

        // console.log(csvData)

        let yearlyPopulation = {}
        for(let i = 1; i < csvData.length ; i++ ) {
            let row = csvData[i]
            if( row[0] === "World" && Number(row[2]) > 0 && Number(row[2] < 2021) ){
                // console.log(row)
                yearlyPopulation[row[2]] = Number(row[3])
            }
        }

        let lastValue = 0
        for( let i = 1; i < 2021; i++ ) { 
            if(yearlyPopulation[i]){
                lastValue = Math.round(Number(yearlyPopulation[i])/1000000)
                yearlyPopulation[i] = lastValue
            } else ( 
                yearlyPopulation[i] = lastValue    
            )
        }

        // console.log(yearlyPopulation)

        

        let data = JSON.stringify(yearlyPopulation);
        fs.writeFileSync(fileJSON, data);
        console.log("complete")
    }));
}

module.exports = readCSV
