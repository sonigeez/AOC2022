package main

import (
	"fmt"
	"os"
	"strings"
)

type Move int

type Solution int

const (
	InvalidMove Move = iota
	Rock
	Paper
	Scissors
)

const (
	Solution1 Solution = iota
	Solution2
)

const DrawScore = 3
const WinScore = 6

func main() {
	processGame(Solution1, computeScoreSolution)
	processGame(Solution2, computeScoreSolution)
}

func processGame(solution Solution, scoringFunction func([]string, Solution) (int, int)) {
	input, err := os.ReadFile("lib/day02/input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	moves := strings.Split(string(input), "\n")
	myScore, opponentScore := scoringFunction(moves, solution)
	fmt.Println("Scores:", myScore, opponentScore)
}

func computeScoreSolution(moves []string, solution Solution) (myScore, opponentScore int) {
	for _, move := range moves {
		opponentMove := parseMove(string(move[0]))
		var myMove Move
		if solution == Solution1 {
			myMove = parseMove(string(move[len(move)-1]))
		} else {
			desiredOutcome := string(move[len(move)-1])
			myMove = getMoveForDesiredOutcome(opponentMove, desiredOutcome)
		}

		myScore += int(myMove)
		opponentScore += int(opponentMove)

		if opponentMove == myMove {
			myScore += DrawScore
			opponentScore += DrawScore
		} else if hasOpponentWon(opponentMove, myMove) {
			opponentScore += WinScore
		} else {
			myScore += WinScore
		}
	}
	return
}

func parseMove(move string) Move {
	switch move {
	case "A", "X":
		return Rock
	case "B", "Y":
		return Paper
	case "C", "Z":
		return Scissors
	default:
		return InvalidMove
	}
}

func hasOpponentWon(opponentMove, myMove Move) bool {
	return (opponentMove == Rock && myMove == Scissors) ||
		(opponentMove == Paper && myMove == Rock) ||
		(opponentMove == Scissors && myMove == Paper)
}

func getMoveForDesiredOutcome(opponentMove Move, outcome string) Move {
	switch outcome {
	case "X":
		return getLosingMove(opponentMove)
	case "Y":
		return opponentMove
	case "Z":
		return getWinningMove(opponentMove)
	default:
		return InvalidMove
	}
}

func getWinningMove(opponentMove Move) Move {
	switch opponentMove {
	case Rock:
		return Paper
	case Paper:
		return Scissors
	case Scissors:
		return Rock
	default:
		return InvalidMove
	}
}

func getLosingMove(opponentMove Move) Move {
	switch opponentMove {
	case Rock:
		return Scissors
	case Paper:
		return Rock
	case Scissors:
		return Paper
	default:
		return InvalidMove
	}
}
