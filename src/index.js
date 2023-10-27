import {readInput} from "./iostream.js";
import {createGrid, execCommands, extractCommandList, extractObstacles, placeObstacles} from "./setup.js";

const startTime = Date.now();

const inputArray = readInput("files/input.txt");
const obstacleList = extractObstacles(inputArray);
const grid = createGrid(inputArray);
placeObstacles(grid, obstacleList);
const commandList = extractCommandList(inputArray);

execCommands(commandList, grid);

const endTime = Date.now();
const timeElapsed = endTime - startTime;
console.log(`Execution time: ${timeElapsed}ms`);
