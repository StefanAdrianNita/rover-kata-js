export default class Rover {
  #x = 0;
  #y = 0;
  #direction = 90;
  #grid;

  constructor(grid) {
    this.#grid = grid;
  }

  #checkForObstacle(y, x) {
    return this.#grid[y][x] === 1;
  }

  #wrapAround(coord, max) {
    return (coord + max) % max;
  }

  #moveForward() {
    const directionMap = {
      90: { dy: 1, dx: 0 },
      180: { dy: 0, dx: -1 },
      270: { dy: -1, dx: 0 },
      0: { dy: 0, dx: 1 },
    };

    const { dy, dx } = directionMap[this.#direction];
    const newPosition = [
      this.#wrapAround(this.#y + dy, this.#grid.length),
      this.#wrapAround(this.#x + dx, this.#grid[0].length),
    ];

    if (this.#checkForObstacle(...newPosition)) return 1;

    this.#y = newPosition[0];
    this.#x = newPosition[1];
    return 0;
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

  execCommands(command) {
    const commandArray = command.split("");
    let hasObstacle = false;
    commandArray.forEach((command) => {
      if (command === "F") {
        hasObstacle = this.#moveForward();
      } else if (command === "L" || command === "R") {
        this.#turn(command);
      }
      console.log(
        `Rover is at ${this.#x}, ${this.#y}, facing ${this.#direction} degrees`
      );
    });

    return { hasObstacle, x: this.#x, y: this.#y, direction: this.#direction };
  }
}
