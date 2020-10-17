const fs = require('fs');
const parse = require("csv-parse");

const filePathC02 = "./data/co2/CO2GlobalAverage.csv.csv"
const filePathNorthSeaIce = "./data/sea_ice/northen_sea_ice.csv"
const filePathSouthSeaIce = "./data/sea_ice/southern_sea_ice.csv"

const fileResultsNorthSeaIce = "./results/north_sea_ice.json"

const readCSV = () => {
    fs.createReadStream(filePathNorthSeaIce)
        .pipe(parse({ delimiter: ',' }, parseData));
}

const writeJsonFile = (object, fileName) => {
    let data = JSON.stringify(object);
    fs.writeFileSync(fileName, data);
}

const parseData = (err, csvData) => {
    if (err) {
        console.log('Error reading CSV file1', err)
        return
    }
    console.log("Number of rows - ", csvData.length)
    console.log(csvData[0])
    console.log(csvData[1])
    console.log(csvData[2])
    console.log(csvData[csvData.length - 1])

    newFilteredArr = []
    newFilteredArr.push(csvData[0])
    newFilteredArr.push(csvData[1])

    minimumPoint = csvData[2]
    for (i = 2; i < csvData.length - 1; i++) {
        if (minimumPoint[0] === csvData[i][0]) {
            if (minimumPoint[3] > csvData[i][3]) {
                minimumPoint = csvData[i]
            }
        } else {
            //add smallest year ice and start next year
            newFilteredArr.push(minimumPoint)
            minimumPoint = csvData[i]
        }
    }

    // for (row of csvData) {
    //     parseCountryRCP(row, data)
    //     parseYearAndMonth(row, data2)
    // }
    // totalsTask1(data)
    // itemTotalsTask1(data)
    // writeJsonFile(data, file_pathTask1)
    // writeJsonFile(data2, file_pathTask2)
    // writeJsonFile(data2, file_pathTask3)
    writeJsonFile(newFilteredArr, fileResultsNorthSeaIce)

    // console.log(newFilteredArr)
    console.log('Complete')
}

console.log("Start program")
readCSV()