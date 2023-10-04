import fs from "fs";

export const readInput = (input) => {
  try {
    const data = fs.readFileSync(input, "utf8");
    return data.split("\n").map((line) => line.trim().split(/\s+/));
  } catch (err) {
    throw new Error(err);
  }
};

export const writeOutput = (output, data) => {
  console.log(data);
  fs.appendFileSync(output, data + "\n");
};
