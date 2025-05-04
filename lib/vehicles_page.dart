import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'booking_page.dart';

class VehiclesPage extends StatefulWidget {
  const VehiclesPage({Key? key}) : super(key: key);

  @override
  State<VehiclesPage> createState() => _VehiclesPageState();
}

class _VehiclesPageState extends State<VehiclesPage> {
  List<dynamic> vehicles = [];

  @override
  void initState() {
    super.initState();
    fetchVehicles();
  }

  Future<void> fetchVehicles() async {
    try {
      final response = await http.get(Uri.parse('https://luxe-rental-car.onrender.com/api/vehicles'));
      if (response.statusCode == 200) {
        setState(() {
          vehicles = json.decode(response.body);
        });
      } else {
        throw Exception('Erreur de chargement');
      }
    } catch (e) {
      print('Erreur : $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text('Nos Véhicules', style: TextStyle(color: Colors.amber)),
        centerTitle: true,
      ),
      body: vehicles.isEmpty
          ? const Center(child: CircularProgressIndicator(color: Colors.amber))
          : ListView.builder(
              itemCount: vehicles.length,
              itemBuilder: (context, index) {
                final vehicle = vehicles[index];
                return Card(
                  color: Colors.black,
                  margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15),
                    side: const BorderSide(color: Colors.amber, width: 1),
                  ),
                  child: ListTile(
                    contentPadding: const EdgeInsets.all(10),
                    leading: vehicle['image'] != null
                        ? ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: Image.network(
                              'https://luxe-rental-car.onrender.com/upload/${vehicle['image']}',
                              width: 80,
                              height: 80,
                              fit: BoxFit.cover,
                            ),
                          )
                        : const Icon(Icons.directions_car, size: 50, color: Colors.amber),
                    title: Text(
                      '${vehicle['brand']} ${vehicle['name']}',
                      style: const TextStyle(color: Colors.amber, fontWeight: FontWeight.bold),
                    ),
                    subtitle: Text(
                      '${vehicle['price_per_day']} DH / jour',
                      style: const TextStyle(color: Colors.white70),
                    ),
                    trailing: ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => BookingPage(vehicle: vehicle),
                          ),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.amber,
                        foregroundColor: Colors.black,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: const Text('Réserver'),
                    ),
                  ),
                );
              },
            ),
    );
  }
}

