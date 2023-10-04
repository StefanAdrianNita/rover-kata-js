import fs from 'fs';

export const readInput = (input) => {
    const data = fs.readFileSync(input, 'utf8');
    const lines = data.split('\n');
    const inputArray = lines.map(line => line.split(' '));
    return inputArray;
    };

export const writeOutput = (output, data) => {
    fs.writeFileSync(output, data);
    }
