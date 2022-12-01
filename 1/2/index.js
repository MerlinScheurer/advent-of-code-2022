import fs from "node:fs";

const input = fs.readFileSync("./input.txt").toString().split("\r\n");

const elvesCal = [];
let summator = 0;
for (let i = 0; i < input.length; i++) {
  const current = input[i];

  if (current.length === 0) {
    elvesCal.push(summator);
    summator = 0;
  } else {
    summator += Number(current);
  }
}

elvesCal.sort((a, b) => a - b);

const topThree = elvesCal.slice(-3);

const reduced = topThree.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

console.log(reduced);
