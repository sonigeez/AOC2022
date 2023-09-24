package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	text, err := os.ReadFile("lib/day01/input.txt")
	if err != nil {
		panic(err)
	}

	sums := processInput(string(text))

	if len(sums) == 0 {
		fmt.Println("No data found to process.")
		return
	}

	sort.Slice(sums, func(i, j int) bool {
		return sums[i] > sums[j]
	})
	fmt.Println("The maximum sum is:", sums[0])
	fmt.Println("The sum of top is :", sums[0]+sums[1]+sums[2])
}

func processInput(text string) []int {
	var sums []int
	var tempNumbers []int

	lines := strings.Split(text, "\n")

	for _, line := range lines {
		if line == "" {
			sums = append(sums, sum(tempNumbers))
			tempNumbers = nil
		} else {
			num, err := strconv.Atoi(line)
			if err != nil {
				panic(err)
			}
			tempNumbers = append(tempNumbers, num)
		}
	}

	return sums
}

func sum(numbers []int) int {
	total := 0
	for _, num := range numbers {
		total += num
	}
	return total
}
