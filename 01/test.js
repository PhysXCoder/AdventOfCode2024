const fs = require('fs');

//const fileName = 'input_example';
const fileName = 'input';
const fileContent = fs.readFileSync(fileName).toString();
const linesArray = fileContent.split('\n').filter(l => l);
const valuesMatrix = linesArray.map(line => line.match(/[^\s]+/g));
//const transposedValuesMatrix = dataPerLine[0].map((_, columnIndex) => dataPerLine.map(line => line[columnIndex]));

// Part 1
const leftValues = valuesMatrix.map(lineValuesArray => lineValuesArray[0]);
const rightValues = valuesMatrix.map(lineValuesArray => lineValuesArray[1]);
leftValues.sort();
rightValues.sort();
const sumOfDifferences = leftValues.reduce((prev, cur, idx) => prev + (Math.abs(cur - rightValues[idx])), 0);
console.log('Part 1: sumOfDifferences = ' + sumOfDifferences);

// Part 2
const occurrencesRight = rightValues.reduce((map, val) => map.set(val, (map.get(val) || 0) + 1), new Map());
const sumOfSimilarities = leftValues.reduce((prev, val) => prev + (val*(occurrencesRight.get(val) || 0)), 0);
console.log('Part 2: sumOfSimilarities = ' + sumOfSimilarities);