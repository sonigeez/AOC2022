import { readFileSync } from "fs";

enum Move {
  InvalidMove,
  Rock,
  Paper,
  Scissors,
}

enum Solution {
  Solution1,
  Solution2,
}

const DrawScore = 3;
const WinScore = 6;

function main() {
  console.log("Solution 1 Results:");
  processGame(computeScoreSolution, Solution.Solution1);

  console.log("\nSolution 2 Results:");
  processGame(computeScoreSolution, Solution.Solution2);
}

function processGame(
  scoringFunction: (moves: string[], solution: Solution) => [number, number],
  solution: Solution
) {
  try {
    const input = readFileSync("lib/day02/input.txt", "utf-8");
    const moves = input.split("\n");
    const [myScore, opponentScore] = scoringFunction(moves, Solution.Solution1);
    console.log("Scores:", myScore, opponentScore);
  } catch (error) {
    console.error(error);
  }
}

function computeScoreSolution(
  moves: string[],
  solution: Solution
): [number, number] {
  let myScore = 0;
  let opponentScore = 0;

  for (const move of moves) {
    const opponentMove = parseMove(move[0]);
    let myMove = Move.InvalidMove;
    if (solution === Solution.Solution1) {
      myMove = parseMove(move[move.length - 1]);
    } else {
      const desiredOutcome = move[move.length - 1];
      myMove = getMoveForDesiredOutcome(opponentMove, desiredOutcome);
    }

    if (opponentMove === myMove) {
      myScore += myMove + DrawScore;
      opponentScore += opponentMove + DrawScore;
    } else if (hasOpponentWon(opponentMove, myMove)) {
      opponentScore += opponentMove + WinScore;
      myScore += myMove;
    } else {
      myScore += myMove + WinScore;
      opponentScore += opponentMove;
    }
  }

  return [myScore, opponentScore];
}

function parseMove(move: string): Move {
  switch (move) {
    case "A":
    case "X":
      return Move.Rock;
    case "B":
    case "Y":
      return Move.Paper;
    case "C":
    case "Z":
      return Move.Scissors;
    default:
      return Move.InvalidMove;
  }
}

function hasOpponentWon(opponentMove: Move, myMove: Move): boolean {
  return (
    (opponentMove === Move.Rock && myMove === Move.Scissors) ||
    (opponentMove === Move.Paper && myMove === Move.Rock) ||
    (opponentMove === Move.Scissors && myMove === Move.Paper)
  );
}

function getMoveForDesiredOutcome(opponentMove: Move, outcome: string): Move {
  switch (outcome) {
    case "X":
      return getLosingMove(opponentMove);
    case "Y":
      return opponentMove;
    case "Z":
      return getWinningMove(opponentMove);
    default:
      return Move.InvalidMove;
  }
}

function getWinningMove(opponentMove: Move): Move {
  switch (opponentMove) {
    case Move.Rock:
      return Move.Paper;
    case Move.Paper:
      return Move.Scissors;
    case Move.Scissors:
      return Move.Rock;
    default:
      return Move.InvalidMove;
  }
}

function getLosingMove(opponentMove: Move): Move {
  switch (opponentMove) {
    case Move.Rock:
      return Move.Scissors;
    case Move.Paper:
      return Move.Rock;
    case Move.Scissors:
      return Move.Paper;
    default:
      return Move.InvalidMove;
  }
}

main();
