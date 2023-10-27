import Rover from "./Rover.js";
import {writeOutput} from "./iostream.js";

export const extractObstacles = (inputArray) => {
    return inputArray
        .slice(2)
        .filter(([type]) => type === "Obstacle")
        .map(([, x, y]) => [y, x]);
}
export const createGrid = (inputArray) => {
    const grid = [];
    for (let i = 0, gridSizeY = inputArray[1][2]; i < gridSizeY; i++) {
        const row = Array(Number(inputArray[1][1])).fill(0);
        grid.push(row);
    }
    return grid;
}
export const placeObstacles = (grid, obstacleList) => {
    for (let i = 0, nrObstacles = obstacleList.length; i < nrObstacles; i++) {
        grid[obstacleList[i][0]][obstacleList[i][1]] = 1;
    }
}
export const extractCommandList = (inputArray) => {
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
    return commandsList;
}
export const execCommands = (commandsList, grid) => {
    const rover = new Rover(0, 0, grid);

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
}