import 'package:flutter/material.dart';
import 'main.dart'; // pour aller vers HomePage

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const HomePage()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          Image.network(
            'https://i.imgur.com/vsBpETz.jpg', // 🔥 Lamborghini image ici
            fit: BoxFit.cover,
          ),
          Container(
            color: Colors.black.withOpacity(0.5), // assombri légèrement pour mieux voir le texte
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Icon(Icons.directions_car, color: Colors.amber, size: 100),
                SizedBox(height: 20),
                Text(
                  'LUXE RENTAL CAR',
                  style: TextStyle(
                    color: Colors.amber,
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 2,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
