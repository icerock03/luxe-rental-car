import 'package:flutter/material.dart';

class ContactPage extends StatelessWidget {
  const ContactPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text('Contactez-nous'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const Text(
              'Luxe Rental Car',
              style: TextStyle(
                fontSize: 28,
                color: Colors.amber,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),
            const ListTile(
              leading: Icon(Icons.phone, color: Colors.amber),
              title: Text('+212 6 00 00 00 00',
                  style: TextStyle(color: Colors.white)),
            ),
            const ListTile(
              leading: Icon(Icons.email, color: Colors.amber),
              title: Text('contact@luxerental.com',
                  style: TextStyle(color: Colors.white)),
            ),
            const ListTile(
              leading: Icon(Icons.location_on, color: Colors.amber),
              title: Text('Casablanca, Maroc',
                  style: TextStyle(color: Colors.white)),
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.amber,
                padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
              ),
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Retour',
                  style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }
}

