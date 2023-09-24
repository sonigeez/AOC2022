import 'dart:io';

class Day01 {
  static List<int> _computeSums() {
    var text = File('lib/day01/input.txt').readAsStringSync();

    List<int> sums = [];
    List<int> currentNumbers = [];
    for (var item in text.split('\n')) {
      if (item.isEmpty) {
        sums.add(currentNumbers.reduce((a, b) => a + b));
        currentNumbers.clear();
      } else {
        currentNumbers.add(int.parse(item));
      }
    }
    sums.sort((a, b) => a.compareTo(b));
    return sums;
  }

  static int solution01() {
    var sums = _computeSums();
    print(sums[0]);
    return sums[0];
  }

  static int solution2() {
    var sums = _computeSums();
    var result = sums[0] + sums[1] + sums[2];
    print(result);
    return result;
  }
}

void main() {
  Day01.solution01();
  Day01.solution2();
}
