import { readFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';


// Parsing
//const fileName = '02/input_example';
const fileName = '02/input';
const startTime = performance.now();
const fileContent = readFileSync(fileName).toString();
const lines = fileContent.split('\n').filter(l => l);
const values = lines.map(line => line.split(/\s+/g)).map(array => array.map(s => parseInt(s)));

// Part 1
function isSafe(reportData) {
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
let safeReports = 0;
for (let j=0; j<values.length; j++) {
    if (isSafe(values[j]).result) safeReports++;
}
console.log('Part1: #Safe Reports = ' + safeReports);

// Part 2
function getArrayWithoutElementAt(array, index) {
    return [
        ...array.slice(0, index),
        ...array.slice(index+1, array.length)
    ]
}
let safeReports2 = 0;
for (let j=0; j<values.length; j++) {
    const report = values[j];
    const check = isSafe(report);
    if (check.result) {
        safeReports2++;
        continue;
    }
    // If there's a problem, we need to check several places for removal
    const indexesToCheck = [check.idx-2, check.idx-1, check.idx, check.idx+1, check.idx+2].filter(idx => idx >= 0 && idx < report.length);    
    for (let i=0; i<indexesToCheck.length; i++) {
        const idx = indexesToCheck[i];
        const reportWithoutIdx = getArrayWithoutElementAt(report, idx);    
        if (isSafe(reportWithoutIdx).result) {
            safeReports2++;            
            break;            
        }
    }    
}
console.log('Part2: #Safe Reports = ' + safeReports2);

const endTime = performance.now();
console.log(`Total time: ${(endTime-startTime).toFixed(3)}ms`)