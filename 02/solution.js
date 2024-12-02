import { readFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';

const totalStartTime = performance.now();

const parsingStartTime = performance.now();
//const fileName = '02/input_example';
const fileName = '02/input';
const fileContent = readFileSync(fileName).toString();
const lines = fileContent.split('\n').filter(l => l);
const values = lines.map(line => line.split(/\s+/g)).map(array => array.map(s => parseInt(s)));
const parsingEndTime = performance.now();
console.log(`Parsing time: ${(parsingEndTime-parsingStartTime).toFixed(3)}ms`)
console.log(' ');

// Part 1
function isSafe1(reportData) {
    let increasing;
    for (let i=1; i<reportData.length; i++) {
        const delta = reportData[i-1] - reportData[i];
        const deltaAbs = Math.abs(delta);
        if (deltaAbs < 1 || deltaAbs > 3) return false;
        if (i===1) {
            increasing = (delta > 0);
        } else {
            if (increasing && delta < 0) return false;
            if (!increasing && delta > 0) return false;
        }
    }
    return true;
}
const part1StartTime = performance.now();
let safeReports = 0;
for (let j=0; j<values.length; j++) {
    if (isSafe1(values[j])) safeReports++;
}
const part1EndTime = performance.now();
console.log('Part1: #Safe Reports = ' + safeReports);
console.log(`Part1 time: ${(part1EndTime-part1StartTime).toFixed(3)}ms`)
console.log(' ');


// Part 2
function isSafe2(reportData) {
    let increasing;
    for (let i=1; i<reportData.length; i++) {
        const delta = reportData[i-1] - reportData[i];
        const deltaAbs = Math.abs(delta);
        if (deltaAbs < 1 || deltaAbs > 3) return { result: false, idx: i};
        if (i===1) {
            increasing = (delta > 0);
        } else {
            if (increasing && delta < 0) return { result: false, idx: i};
            if (!increasing && delta > 0) return { result: false, idx: i};
        }
    }
    return { result: true, idx: 0};
}
function removeElementAt(array, index) {
    return [
        ...array.slice(0, index),
        ...array.slice(index+1, array.length)
    ]
}
const part2StartTime = performance.now();
let safeReports2 = 0;
for (let j=0; j<values.length; j++) {
    const report = values[j];
    const val = isSafe2(report);
    if (val.result) {
        safeReports2++;
        continue;
    }
    // If there's a problem, we need to check several places for removal
    const indexesToCheck = [val.idx-2, val.idx-1, val.idx, val.idx+1, val.idx+2].filter(idx => idx >= 0 && idx < report.length);
    let safe = false;
    for (let i=0; i<indexesToCheck.length; i++) {
        const idx = indexesToCheck[i];
        const reportWithoutIdx = removeElementAt(report, idx);    
        if (isSafe1(reportWithoutIdx)) {
            safeReports2++;
            safe = true;
            break;            
        }
    }
    if (!safe) {
        let debug = true;
    }
}
const part2EndTime = performance.now();
console.log('Part2: #Safe Reports = ' + safeReports2);
console.log(`Part2 time: ${(part2EndTime-part2StartTime).toFixed(3)}ms`)
console.log(' ');


const totalEndTime = performance.now();
console.log(`Total time: ${(totalEndTime-totalStartTime).toFixed(3)}ms`)        // Total time is much more that the sum of parsing+part1+part2... But why?