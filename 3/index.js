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

const result = rucksacks.map((rucksack) => {
  const left = rucksack.slice(0, rucksack.length * 0.5);
  const right = rucksack.slice(rucksack.length * 0.5, rucksack.length);
  const used = {};

  const priority = left.split("").map((l) => {
    const index = right.indexOf(l);
    if (index !== -1) {
      const char = right[index];
      if (!used[char]) {
        used[char] = true;
        return getPriority(char);
      }
    }
  });

  const results = priority.filter((element) => {
    return element !== undefined;
  });

  return results;
});

const flattenedResult = result.flat();

const finalResult = flattenedResult.reduce((acc, cur) => {
  return acc + cur;
}, 0);

console.log(finalResult);
