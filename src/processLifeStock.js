const fs = require('fs');
const parse = require("csv-parse");

const filePath = "./data/livestock/livestock-counts.csv"

const fileJSON = "./results/liveStock.json"

const readCSV = async () => {
    console.log("Start program")
    fs.createReadStream(filePath).pipe(parse({ delimiter: ',' }, function (err, csvData) {
        if (err) { console.log('Error reading CSV file1', err); return; }

        // console.log(csvData)


        let cattle = {}
        let chicken = {}
        for(let i = 1; i < csvData.length ; i++ ) {
            let row = csvData[i]
            if( row[0] === "World" ){
                console.log(row)
                cattle[row[2]] = Math.round(Number(row[5])/1000000)
            }
        }

        let lastValue = 0
        for( let i = 1890; i < 2021; i++ ) { 
            if(cattle[i]){
                lastValue = cattle[i]
            } else ( 
                cattle[i] = lastValue    
            )
        }


        console.log(cattle)

        

        let data = JSON.stringify(cattle);
        fs.writeFileSync(fileJSON, data);
        console.log("complete")
    }));
}

module.exports = readCSV
