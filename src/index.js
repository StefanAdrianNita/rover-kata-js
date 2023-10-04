import { readInput, writeOutput } from "./iostream.js";
import Rover from "./Rover.js";

const startTime = Date.now();

const inputArray = readInput("files/input.txt");

// Extract obstacles from input
const obstacleList = inputArray
  .slice(2)
  .filter(([type]) => type === "Obstacle")
  .map(([, x, y]) => [y, x]);

// Create grid
let grid = [];
for (let i = 0, gridSizeY = inputArray[1][2]; i < gridSizeY; i++) {
  const row = Array(Number(inputArray[1][1])).fill(0);
  grid.push(row);
}

// Place obstacles on the grid
for (let i = 0, nrObstacles = obstacleList.length; i < nrObstacles; i++) {
  grid[obstacleList[i][0]][obstacleList[i][1]] = 1;
}

const commandsList = [];
let foundCommands = false;
for (let i = 2, len = inputArray.length; i < len; i++) {
  if (foundCommands) {
    commandsList.push(inputArray[i][0]);
  }
  if (inputArray[i][0] === "Commands") {
    foundCommands = true;
  }
}

const rover = new Rover(0, 0, grid);

// for(let i = 0; i < commandsList.length; i++) {
//     const response = rover.execCommands(commandsList[i]);
//     writeOutput('files/output.txt', `${response.hasObstacle ? "O:": ""}${response.x}:${response.y}:${response.direction}`)
// }

const charDir = {
  90: "N",
  180: "W",
  270: "S",
  0: "E",
};
commandsList.forEach((command) => {
  const response = rover.execCommands(command);
  const output = `${response.hasObstacle ? "O:" : ""}${response.x}:${
    response.y
  }:${charDir[response.direction]}`;
  writeOutput("files/output.txt", output);
});

const endTime = Date.now();

//use startTime and endTime to calculate the time elapsed with 2 decimals
const timeElapsed = endTime - startTime;

console.log(`Execution time: ${timeElapsed}ms`);
