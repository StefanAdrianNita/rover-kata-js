import {readInput, writeOutput} from './iostream.js';
import Rover from './Rover.js';

const inputArray = readInput('files/input.txt');

// Extract Obstacles from inputArray
const obstacleList = [];
for(let i = 2; i < inputArray.length; i++) {
    if(inputArray[i][0] === "Obstacle") {
        obstacleList.push([inputArray[i][1], inputArray[i][2]]);
    }
}

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
    writeOutput('files/output.txt', `${response.hasObstacle ? "O:": ""}${response.x}:${response.y}:${response.direction}`)
}
