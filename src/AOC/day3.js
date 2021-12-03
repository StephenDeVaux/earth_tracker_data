const fs = require('fs');
const parse = require("csv-parse");

const inputCsv = "./AOCData/day3data.csv"
// const inputCsv = "./AOCData/day3dataTest.csv"

const readCSV = async () => {
    console.log("Day 3")
    fs.createReadStream(inputCsv).pipe(parse({ delimiter: ' ' }, function (err, csvData) {
        let arrayData = csvData.map(x => x[0])
        let bitLength = arrayData[0].length
        let [gamma, eps] = ['','']

        // Part 1
        for (let i = 0; i < bitLength; i++) {
            gamma += getMostCommonBit(i, arrayData)
            eps += getLeastCommonBit(i, arrayData)
        }
        console.log(`Gamma: ${gamma} \nEps: ${eps} \nPower consumption: ${parseInt(gamma, 2)* parseInt(eps,2)} `)
        
        // Part 2
        let oxyArray = [...arrayData]
        let co2Array = [...arrayData]

        for (let i = 0; i < bitLength; i++) {
            oxyArray = filterDataByBit(i, oxyArray, getMostCommonBit(i, oxyArray))
            co2Array = filterDataByBit(i, co2Array, getLeastCommonBit(i, co2Array))
        }
        
        oxy = parseInt(oxyArray[0], 2)
        co2 = parseInt(co2Array[0], 2)
        console.log(`Oxy: ${oxy} \nCo2: ${co2} \nPower consumption: ${oxy * co2} `)
    }));
}


function getMostCommonBit ( index, data ) {
    let count = data.length
    let count1s = 0 
    data.forEach(el => {
        if (el.split('')[index] === '1') count1s ++
    });
    return (count1s >= count/2) ? '1' : '0'
}

function getLeastCommonBit ( index, data ) {
     return (getMostCommonBit(index, data) === '1') ? '0' : '1'
}

function filterDataByBit ( index, data, bit ) {
    if (data.length === 1) return data
    return data.filter( row => (row[index] === bit) )
}

module.exports = readCSV
