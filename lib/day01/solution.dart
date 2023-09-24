import 'package:advent_of_code_2022/commons/read_file_as.dart';

class Day01 {
  static int soltion01() {
    var text = readFileAsText('lib/day01/input.txt');
    List<int> sum = [];
    List<int> tempList = [];
    List<String> stringList = text.split('\n');
    for (var item in stringList) {
      if (item.isEmpty) {
        sum.add(tempList.reduce((a, b) => a + b));
        tempList = [];
      } else {
        tempList.add(int.parse(item));
      }
    }
    //get maximum sum
    sum.sort((a, b) => b.compareTo(a));
    print(sum.first);
    return sum.first;
  }
}
