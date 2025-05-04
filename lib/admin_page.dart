import 'package:flutter/material.dart';
import 'home_page.dart'; // pour revenir à l'accueil

class AdminPage extends StatelessWidget {
  const AdminPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: const Text('Espace Administrateur'),
        backgroundColor: Colors.amber,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const HomePage()),
              );
            },
          )
        ],
      ),
      body: const Center(
        child: Text(
          'Bienvenue, Admin !',
          style: TextStyle(fontSize: 26, color: Colors.amber),
        ),
      ),
    );
  }
}
