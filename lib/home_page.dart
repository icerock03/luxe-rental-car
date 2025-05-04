import 'package:flutter/material.dart';
import 'vehicles_page.dart';
import 'contact_page.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key}); // ✅ Le constructeur est bien là

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Fond d’écran Porsche
          Positioned.fill(
            child: Image.asset(
              'assets/images/porsche.jpg',
              fit: BoxFit.cover,
            ),
          ),

          // Couche sombre
          Container(color: Colors.black.withOpacity(0.6)),

          // Contenu
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  'Luxe Rental Car',
                  style: TextStyle(
                    fontSize: 38,
                    fontWeight: FontWeight.bold,
                    color: Colors.amber,
                  ),
                ),
                const SizedBox(height: 25),

                // Bouton véhicules
                ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const VehiclesPage()),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.amber,
                    padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                  ),
                  child: const Text('Voir nos véhicules',
                      style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
                ),
                const SizedBox(height: 15),

                // Bouton contact
                OutlinedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => const ContactPage()),
                    );
                  },
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Colors.amber),
                    padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                  ),
                  child: const Text('Contact',
                      style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

