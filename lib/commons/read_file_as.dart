import 'dart:io';

import 'package:path/path.dart';

String readFileAsText(String path) {
  final filePath = join(Directory.current.path, path);
  final file = File(filePath);
  return file.readAsStringSync();
}
