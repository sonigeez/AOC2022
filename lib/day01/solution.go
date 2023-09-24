package main

import (
	"fmt"
	"sort"
	"strconv"
	"strings"

	"adventofcode.com/lib/commons"
)

func main() {
	text, _ := commons.ReadFileAsText("lib/day01/input.txt")

	var sum []int
	var tempList []int

	stringList := strings.Split(text, "\n")

	for _, item := range stringList {
		if item == "" {
			tempSum := 0
			for _, num := range tempList {
				tempSum += num
			}
			sum = append(sum, tempSum)
			tempList = nil
		} else {
			num, err := strconv.Atoi(item)
			if err != nil {
				panic(err)
			}
			tempList = append(tempList, num)
		}
	}

	sort.Slice(sum, func(i, j int) bool {
		return sum[i] < sum[j]
	})
	max := sum[len(sum)-1]
	fmt.Println("The maximum sum is:", max)

}
