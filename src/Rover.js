export const ROVER_SYMBOL = 5;
export const OBSTACLE_SYMBOL = 1;
export const FREE_SYMBOL = 0;


export default class Rover {

  #x = 0;
  #y = 0;
  #direction = 90;
  #grid;

  constructor(y, x, grid) {
    this.#y = y;
    this.#x = x;
    this.#grid = grid;
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
  get direction() {
    return this.#direction;
  }

  #checkForObstacle(y, x) {
    return this.#grid[y][x] === OBSTACLE_SYMBOL;
  }

  #wrapAround(coord, max) {
    return (coord + max) % max;
  }

  #move(fwd) {
    const directionMap = {
      90: { dy: 1, dx: 0 },
      180: { dy: 0, dx: -1 },
      270: { dy: -1, dx: 0 },
      0: { dy: 0, dx: 1 },
    };

    const { dy, dx } = directionMap[this.#direction];

    const newY = this.#wrapAround(this.#y + (fwd ? dy : -dy), this.#grid.length);
    const newX = this.#wrapAround(this.#x + (fwd ? dx : -dx), this.#grid[0].length);

    if (this.#checkForObstacle(newY, newX)) return true;

    this.#y = newY;
    this.#x = newX;
    return false;
  }

  #turn(direction) {
    if (direction === "L") {
      this.#direction = (this.#direction + 90) % 360;
    } else if (direction === "R") {
      this.#direction = (this.#direction - 90 + 360) % 360;
    } else {
      throw new Error("Invalid direction");
    }
  }

  #outputAndDebug() {
    console.log(
      `Rover is at ${this.#x}, ${this.#y}, facing ${this.#direction} degrees`
    );
    
    this.#grid[this.#y][this.#x] = ROVER_SYMBOL;
    this.#grid.reverse();
    console.log(this.#grid);
    this.#grid.reverse();
    this.#grid[this.#y][this.#x] = FREE_SYMBOL;
  }

  execCommands(command) {
    const commandArray = command.split("");
    let hasObstacle = false;
    commandArray.forEach((command) => {
      hasObstacle = this.execCommand(command, hasObstacle);

      this.#outputAndDebug();
    });

    return { hasObstacle, x: this.#x, y: this.#y, direction: this.#direction };
  }

  execCommand(command, hasObstacle) {
    if (command === "F") {
      hasObstacle = this.#move(true);
    } else if (command === "L" || command === "R") {
      this.#turn(command);
    } else if (command === "B") {
      hasObstacle = this.#move(false);
    }
    return hasObstacle;
  }
}
