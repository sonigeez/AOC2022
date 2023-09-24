// ignore_for_file: constant_identifier_names

import 'dart:io';

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

const int DrawScore = 3;
const int WinScore = 6;

void main() {
  processGame(computeScoreSolution, Solution.Solution1);
  processGame(computeScoreSolution, Solution.Solution2);
}

void processGame(
    List<int> Function(List<String>, Solution solution) scoringFunction,
    Solution solution) {
  try {
    var input = File('lib/day02/input.txt').readAsStringSync();
    var moves = input.split('\n');
    var scores = scoringFunction(moves, solution);
    print('Scores: ${scores[0]}, ${scores[1]}');
  } catch (e) {
    print(e.toString());
  }
}

List<int> computeScoreSolution(List<String> moves, Solution solution) {
  var myScore = 0;
  var opponentScore = 0;

  for (var move in moves) {
    var opponentMove = parseMove(move[0]);
    var myMove = Move.InvalidMove;
    if (solution == Solution.Solution1) {
      myMove = parseMove(move[move.length - 1]);
    } else {
      var desiredOutcome = move[move.length - 1];
      myMove = getMoveForDesiredOutcome(opponentMove, desiredOutcome);
    }

    if (opponentMove == myMove) {
      myScore += opponentMove.index + DrawScore;
      opponentScore += opponentMove.index + DrawScore;
    } else if (hasOpponentWon(opponentMove, myMove)) {
      opponentScore += opponentMove.index + WinScore;
      myScore += myMove.index;
    } else {
      myScore += myMove.index + WinScore;
      opponentScore += opponentMove.index;
    }
  }

  return [myScore, opponentScore];
}

Move parseMove(String move) {
  switch (move) {
    case 'A':
    case 'X':
      return Move.Rock;
    case 'B':
    case 'Y':
      return Move.Paper;
    case 'C':
    case 'Z':
      return Move.Scissors;
    default:
      return Move.InvalidMove;
  }
}

bool hasOpponentWon(Move opponentMove, Move myMove) {
  return (opponentMove == Move.Rock && myMove == Move.Scissors) ||
      (opponentMove == Move.Paper && myMove == Move.Rock) ||
      (opponentMove == Move.Scissors && myMove == Move.Paper);
}

Move getMoveForDesiredOutcome(Move opponentMove, String outcome) {
  switch (outcome) {
    case 'X':
      return getLosingMove(opponentMove);
    case 'Y':
      return opponentMove;
    case 'Z':
      return getWinningMove(opponentMove);
    default:
      return Move.InvalidMove;
  }
}

Move getWinningMove(Move opponentMove) {
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

Move getLosingMove(Move opponentMove) {
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
