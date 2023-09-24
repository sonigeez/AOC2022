package commons

import (
	"os"
)

// readFile reads the content of a given file and returns it as a string.
// Returns an empty string and an error if there's any issue.
func ReadFileAsText(filename string) (string, error) {
	data, err := os.ReadFile(filename)
	if err != nil {
		return "", err
	}
	return string(data), nil
}
