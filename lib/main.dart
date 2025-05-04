import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const LuxeRentalCarApp());
}

class LuxeRentalCarApp extends StatelessWidget {
  const LuxeRentalCarApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: const HomeScreen(),
    );
  }
}



