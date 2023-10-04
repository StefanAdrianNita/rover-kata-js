export default class Rover {
    #x = 0; 
    #y = 0; 
    #direction = 90;
    #grid;

    constructor(grid) {
        this.#grid = grid;
    }

    #checkForObstacle(y,x) {
        if(this.#grid[y][x] === 1) {
            return true;
        }
        return false;
    }

    #moveForward() {
        const directionMap = {
            90: {dy: 1, dx:0},
            180: {dy: 0, dx:-1},
            270: {dy: -1, dx: 0},
            0: {dy: 0, dx: 1}
        }
        
        const {dy, dx} = directionMap[this.#direction];
        const newPosition = [this.#y + dy, this.#x + dx];

        if(newPosition[0] > this.#grid.length-1) {
            newPosition[0] = 0;
        }
        else if (newPosition[0] < 0) {
            newPosition[0] = this.#grid.length-1;
        }
        if(newPosition[1] > this.#grid[0].length-1) {
            newPosition[1] = 0;
        }
        else if (newPosition[1] < 0) {
            newPosition[1] = this.#grid[0].length-1;
        }

        if(this.#checkForObstacle(...newPosition)) {
            console.log("Obstacle detected");
            return 1;
        }
        else {
            this.#y = newPosition[0];
            this.#x = newPosition[1];
            return 0;
        }

        
    }

    #turn(direction){
        if(direction === "L"){
            this.#direction = (this.#direction + 90) % 360;
        }
        else if(direction === "R"){
            this.#direction = (this.#direction - 90 + 360) % 360;
        }
        else {
            console.log("Invalid direction");
        }

    }

    execCommands(command){
        const commandArray = command.split("");
        let hasObstacle = false;
        commandArray.forEach(command => {
            if(command === "F"){
                hasObstacle = this.#moveForward();
            }
            else if(command === "L" || command === "R"){
                this.#turn(command);
            }
            else {
                console.log("Invalid command");
            }
            console.log(`Rover is at ${this.#x}, ${this.#y}, facing ${this.#direction} degrees`);
            this.#consoleGUI();
        })

        const charDir = {
            90: "N",
            180: "W",
            270: "S",
            0: "E"
        }
        return {hasObstacle, x: this.#x, y: this.#y, direction: charDir[this.#direction]};
    }

    #consoleGUI() {
        let grid = this.#grid;
        grid[this.#y][this.#x] = 8;
        grid.reverse();
        console.log(grid);
        grid.reverse();
        grid[this.#y][this.#x] = 0;
    }
}