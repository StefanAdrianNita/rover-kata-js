# Rover Kata

The **Rover Kata** is a coding exercise that simulates the movement of a rover on a grid. The objective is to practice problem-solving, algorithmic thinking, and coding skills by implementing a rover's movement and obstacle detection logic.

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
  - [Input File for the Rover](#input-file-for-the-rover)
  - [Output File for the Rover](#output-file-for-the-rover)
- [Pre-requisites](#pre-requisites)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Author](#author)

## Problem Description

A rover is a vehicle that moves in a grid. The grid is divided into cells. The rover can move only forward and turn left or right. The rover can move only one cell at a time. The rover can't move to a cell occupied by an obstacle.

The rover receives a string of commands. Each command is a letter that represents an action. The possible commands are:

- `F`: move forward
- `L`: turn left
- `R`: turn right
- `B`: move backward

The rover receives a string of obstacles. Each obstacle is a pair of coordinates that represents a cell occupied by an obstacle. The rover can't move to a cell occupied by an obstacle.

## Examples

### Input File for the Rover

    Grid
    Size 5 4
    Obstacle 2 0
    Obstacle 0 3
    Obstacle 3 2
    Commands
    RFF
    RF
    LFRFFLFFFLL

### Output File for the Rover

    O:1:0:E
    1:3:S
    0:1:W

## Pre-requisites

- [Node.js](https://nodejs.org/en/) 18.18.0 or higher

## Installation

1. Clone the repository or download the latest release.

```bash
git clone https://github.com/StefanAdrianNita/rover-kata-js.git
```

2. Navigate to the project directory.

```bash
cd rover-kata-js
```

3. No installation is required. The project is ready to use.

## Usage

1. Create an input file for the rover(inside the files folder). The input file must contain the following sections:

- `Grid`
- `Size`: the size of the grid
- `Obstacle`: the coordinates of an obstacle (you can have multiple obstacles)
- `Commands`: This line indicates the start of the list of commands for the rover

2. Run the following command to start the rover.

```bash
npm start

# or

node index.js
```

3. The output file will be created in the files folder. While the program is running you can see the rover's position in the terminal.

## License

This project is licensed under the GNU GPL-3 License - see the **LICENSE** file for details.

## Author

**Stefan Adrian Nita**
