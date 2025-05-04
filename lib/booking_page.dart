import 'package:flutter/material.dart';

class BookingPage extends StatefulWidget {
  final Map vehicle;

  const BookingPage({Key? key, required this.vehicle}) : super(key: key);

  @override
  State<BookingPage> createState() => _BookingPageState();
}

class _BookingPageState extends State<BookingPage> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final vehicle = widget.vehicle;

    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text('Réservation', style: TextStyle(color: Colors.amber)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '${vehicle['brand']} ${vehicle['name']}',
              style: const TextStyle(
                fontSize: 24,
                color: Colors.amber,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              'Prix: ${vehicle['price_per_day']} DH / jour',
              style: const TextStyle(color: Colors.white),
            ),
            const SizedBox(height: 30),

            TextField(
              controller: _nameController,
              style: const TextStyle(color: Colors.white),
              decoration: const InputDecoration(
                labelText: 'Nom complet',
                labelStyle: TextStyle(color: Colors.amber),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.amber),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.amber, width: 2),
                ),
              ),
            ),
            const SizedBox(height: 20),

            TextField(
              controller: _phoneController,
              keyboardType: TextInputType.phone,
              style: const TextStyle(color: Colors.white),
              decoration: const InputDecoration(
                labelText: 'Téléphone',
                labelStyle: TextStyle(color: Colors.amber),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.amber),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Colors.amber, width: 2),
                ),
              ),
            ),
            const SizedBox(height: 30),

            Center(
              child: ElevatedButton(
                onPressed: () {
                  if (_nameController.text.isEmpty || _phoneController.text.isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Veuillez remplir tous les champs')),
                    );
                    return;
                  }

                  // 🔁 À connecter à ton backend plus tard
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Réservation envoyée avec succès')),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.amber,
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                ),
                child: const Text('Réserver', style: TextStyle(color: Colors.black)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}



