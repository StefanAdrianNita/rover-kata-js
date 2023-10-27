import fs from "fs";

export const readInput = (input) => {
    const data = fs.readFileSync(input, "utf8");
    return data.split("\n").map((line) => line.trim().split(/\s+/));
};

export const writeOutput = (output, data) => {
  console.log(data);
  fs.appendFileSync(output, data + "\n");
};
