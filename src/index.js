import {readInput, writeOutput} from './iostream.js';
import Rover from './Rover.js';

const startTime = Date.now();

const inputArray = readInput('files/input.txt');

const obstacleList = inputArray.slice(2)
                                .filter(([type]) => type === "Obstacle")
                                .map(([, x, y]) => [x, y])


// Using data from inputfile generate the grid
let grid = [];
for(let i = 0; i < inputArray[1][2]; i++) {
    let row = [];
    for(let j = 0; j < inputArray[1][1]; j++) {
        row.push(0);
    }
    grid.push(row);
}

// Place obstacles on the grid
for(let i = 0; i < obstacleList.length; i++) {
    grid[obstacleList[i][1]][obstacleList[i][0]] = 1;
}

const commandsList = [];
let commandsLine = false;
for(let i = 2; i < inputArray.length; i++) {
    if(commandsLine) {
        commandsList.push(inputArray[i][0]);
    }
    if(inputArray[i][0] === "Commands") {
        commandsLine = true;
    }
}

const rover = new Rover(grid);

for(let i = 0; i < commandsList.length; i++) {
    const response = rover.execCommands(commandsList[i]);
    (response);
    writeOutput('files/output.txt', `${response.hasObstacle ? "O:": ""}${response.x}:${response.y}:${response.direction}`)
}

const endTime = Date.now();
const timeElapsed = endTime - startTime;
console.log(`Execution time: ${timeElapsed}ms`);
