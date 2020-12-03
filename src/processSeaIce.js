const fs = require('fs');
const parse = require("csv-parse");

const filePathNorthSeaIce = "./data/sea_ice/northen_sea_ice.csv"
const filePathSouthSeaIce = "./data/sea_ice/southern_sea_ice.csv"

const fileJSONNorthSeaIce = "./results/north_sea_ice.json"
const fileJSONSouthSeaIce = "./results/South_sea_ice.json"
const fileJSONSeaIce = "./results/sea_ice.json"

const csvRowToObject = (dayDataArray) => {
    return yearData = {
        year: Number(dayDataArray[0]),
        month: Number(dayDataArray[1]),
        day: Number(dayDataArray[2]),
        extent: Number(dayDataArray[3]),
        sourceData: dayDataArray[5]
    }
}

const readCSVandSaveJson = (fileName, fileNameJSON) => {
    fs.createReadStream(fileName).pipe(parse({ delimiter: ',' }, function(err, csvData) {
        // CSV dataformat
        // ["Year"," Month"," Day","     Extent","    Missing"," Source Data"]
        if (err) {
            console.log('Error reading CSV file1', err)
            return
        }

        yearlyMinimumArr = []
        let minimumDay = csvRowToObject(csvData[2])
        for (i = 2; i < csvData.length - 1; i++) {
            currentDay = csvRowToObject(csvData[i])
            if (minimumDay.year === currentDay.year) {
                if (currentDay.extent < minimumDay.extent) {
                    minimumDay = {...currentDay }
                }
            } else {
                yearlyMinimumArr.push({...minimumDay })
                minimumDay = {...currentDay }
            }
        }

        let data = JSON.stringify(yearlyMinimumArr);
        fs.writeFileSync(fileNameJSON, data);
    }));
}

function processSeaIce() { 
    console.log("Start program")
    readCSVandSaveJson(filePathNorthSeaIce, fileJSONNorthSeaIce)
    readCSVandSaveJson(filePathSouthSeaIce, fileJSONSouthSeaIce)
    
    let northSeaIce = JSON.parse(fs.readFileSync(fileJSONNorthSeaIce));
    let southSeaIce = JSON.parse(fs.readFileSync(fileJSONSouthSeaIce));
    let totalSeaIce = []
    let errorsCount = 0
    
    for (i = 0; i <= northSeaIce.length - 1; i++) {
        if (northSeaIce[i].year === southSeaIce[i].year) {
            totalSeaIce.push({
                year: northSeaIce[i].year,
                extent: northSeaIce[i].extent + southSeaIce[i].extent,
            })
        } else {
            errorsCount += 1
        }
    }
    
    fs.writeFileSync(fileJSONSeaIce, JSON.stringify(totalSeaIce));
    
    console.log("Errors count in file: " + errorsCount)
    console.log("complete")
}

module.exports = processSeaIce
