import { readFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';

const totalStartTime = performance.now();

const parsingStartTime = performance.now();
//const fileName = '01/input_example';
const fileName = '01/input';
const fileContent = readFileSync(fileName).toString();
const linesArray = fileContent.split('\n').filter(l => l);
const valuesMatrix = linesArray.map(line => line.split(/\s+/g));
//const transposedValuesMatrix = valuesMatrix[0].map((_, columnIndex) => valuesMatrix.map(line => line[columnIndex]));
const leftValues = valuesMatrix.map(lineValuesArray => parseInt(lineValuesArray[0]));
const rightValues = valuesMatrix.map(lineValuesArray => parseInt(lineValuesArray[1]));
const parsingEndTime = performance.now();
console.log(`Parsing time: ${(parsingEndTime-parsingStartTime).toFixed(3)}ms`)
console.log(' ');

// Part 1
const part1StartTime = performance.now();
leftValues.sort();
rightValues.sort();
const sumOfDifferences = leftValues.reduce((prev, cur, idx) => prev + (Math.abs(cur - rightValues[idx])), 0);
const part1EndTime = performance.now();
console.log('Part1: sumOfDifferences = ' + sumOfDifferences);
console.log(`Part1 time: ${(part1EndTime-part1StartTime).toFixed(3)}ms`)
console.log(' ');

// Part 2
const part2StartTime = performance.now();
const occurrencesRight = rightValues.reduce((map, val) => map.set(val, (map.get(val) || 0) + 1), new Map());
const sumOfSimilarities = leftValues.reduce((prev, val) => prev + (val*(occurrencesRight.get(val) || 0)), 0);
const part2EndTime = performance.now();
console.log('Part 2: sumOfSimilarities = ' + sumOfSimilarities);
console.log(`Part2 time: ${(part2EndTime-part2StartTime).toFixed(3)}ms`)
console.log(' ');

const totalEndTime = performance.now();
console.log(`Total time: ${(totalEndTime-totalStartTime).toFixed(3)}ms`)        // Total time is much more that the sum of parsing+part1+part2... But why?