import fs from "node:fs";

const input = fs.readFileSync("./input.txt").toString().split("\r\n");

const O = {
  Rock: "A",
  Paper: "B",
  Scissors: "C",
};

const M = {
  Paper: "Y",
  Rock: "X",
  Scissors: "Z",
};

const T = {
  Draw: "Y",
  Loss: "X",
  Win: "Z",
};

const getPointsFor = {
  [O.Paper]: 2,
  [O.Rock]: 1,
  [O.Scissors]: 3,
  [M.Paper]: 2,
  [M.Rock]: 1,
  [M.Scissors]: 3,
  Win: 6,
  Loss: 0,
  Draw: 3,
};

const calcWin = (points) => {
  return points + getPointsFor.Win;
};

const calcLoss = (points) => {
  return points + getPointsFor.Loss;
};

const calcDraw = (points) => {
  return points + getPointsFor.Draw;
};

let score = 0;
input.forEach((row) => {
  const [opponent, tip] = row.split(" ");
  let points = 0;
  let mine;

  if (tip === T.Draw) {
    if (opponent === O.Rock) {
      mine = M.Rock;
    } else if (opponent === O.Paper) {
      mine = M.Paper;
    } else if (opponent === O.Scissors) {
      mine = M.Scissors;
    }
  } else if (tip === T.Win) {
    if (opponent === O.Rock) {
      mine = M.Paper;
    } else if (opponent === O.Paper) {
      mine = M.Scissors;
    } else if (opponent === O.Scissors) {
      mine = M.Rock;
    }
  } else if (tip === T.Loss) {
    if (opponent === O.Rock) {
      mine = M.Scissors;
    } else if (opponent === O.Paper) {
      mine = M.Rock;
    } else if (opponent === O.Scissors) {
      mine = M.Paper;
    }
  }

  if (getPointsFor[opponent] === getPointsFor[mine]) {
    points = calcDraw(getPointsFor[mine]);
    console.log("Draw", points);
    score += points;
    return;
  }

  if (opponent === O.Rock) {
    if (mine === M.Paper) {
      points = calcWin(getPointsFor[mine]);
      console.log("Rock - Win", points);
      score += points;
    } else {
      points = calcLoss(getPointsFor[mine]);
      console.log("Rock - Loss", points);
      score += points;
    }
    return;
  }

  if (opponent === O.Paper) {
    if (mine === M.Scissors) {
      points = calcWin(getPointsFor[mine]);
      console.log("Paper - Win", points);
      score += points;
    } else {
      points = calcLoss(getPointsFor[mine]);
      console.log("Paper - Loss", points);
      score += points;
    }
    return;
  }

  if (opponent === O.Scissors) {
    if (mine === M.Rock) {
      points = calcWin(getPointsFor[mine]);
      console.log("Scissors - Win", points);
      score += points;
    } else {
      points = calcLoss(getPointsFor[mine]);
      console.log("Scissors - Loss", points);
      score += points;
    }
    return;
  }
});

console.log(score);
