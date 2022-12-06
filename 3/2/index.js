import fs from "node:fs";

const rucksacks = fs.readFileSync("./input.txt").toString().split("\r\n");

const alphaUpper = Array.from(Array(26)).map((e, i) => i + 65);
const alpha = Array.from(Array(26)).map((e, i) => i + 97);
const alphabet = [...alpha, ...alphaUpper].map((x) => String.fromCharCode(x));

const getPriority = (char) => {
  if (alphabet.includes(char)) {
    return alphabet.indexOf(char) + 1;
  }
};

let sum = 0;
const chunkSize = 3;
for (let i = 0; i < rucksacks.length; i += chunkSize) {
  const group = rucksacks.slice(i, i + chunkSize);
  const [first, second, third] = group;
  const used = {};

  const priority = first.split("").map((l) => {
    const index2 = second.indexOf(l);
    const index3 = third.indexOf(l);

    if (index2 !== -1 && index3 !== -1) {
      const char = second[index2];

      if (!used[char]) {
        used[char] = true;
        return getPriority(char);
      }
    }
  });

  const resFiltered = priority.filter((element) => {
    return element !== undefined;
  });

  sum += Number(resFiltered);
}

console.log(sum);
