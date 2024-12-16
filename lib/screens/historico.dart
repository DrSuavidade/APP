// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'hamburger_menu.dart';

class HistoricoScreen extends StatelessWidget {
  final List<Map<String, dynamic>> reports = [
    {"name": "Afonso Lopes", "stars": 5, "status": "yellow"},
    {"name": "Mário Hernani", "stars": 4, "status": "green"},
    {"name": "Rodrigo Marques", "stars": 2, "status": "red"},
    {"name": "Marco Saraiva", "stars": 4, "status": "yellow"},
    {"name": "David Moreira", "stars": 3, "status": "yellow"},
    // Add more reports as needed
  ];

  HistoricoScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
        elevation: 0,
        title: Row(
          children: [
            Builder(
            builder: (context) => IconButton(
              icon: Icon(Icons.menu, color: Colors.white),
              onPressed: () {
                Scaffold.of(context).openDrawer(); // Open the custom drawer
              },
            ),
          ),
            Spacer(),
            Image.asset(
              'assets/images/Logofinal1.png',
              height: 40,
            ),
          ],
        ),
      ),
      drawer: HamburgerMenu(),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: "Escreva o dia do tipo...",
                hintStyle: TextStyle(color: Colors.grey),
                prefixIcon: Icon(Icons.search, color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[800],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
          ),
          // Reports List
          Expanded(
            child: ListView.builder(
              itemCount: reports.length,
              itemBuilder: (context, index) {
                final report = reports[index];
                return Card(
                  color: Colors.grey[800],
                  margin: EdgeInsets.symmetric(vertical: 5, horizontal: 16),
                  child: ListTile(
                    title: Text(
                      report['name'],
                      style: TextStyle(color: Colors.white),
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          "${report['stars']}",
                          style: TextStyle(color: Colors.white),
                        ),
                        Icon(Icons.star, color: Colors.yellow),
                        SizedBox(width: 10),
                        CircleAvatar(
                          radius: 6,
                          backgroundColor: _statusColor(report['status']),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: Stack(
  alignment: Alignment.bottomCenter,
  children: [
    // Shadow Rectangle for Depth
    Positioned(
      bottom: 16, // Slightly below the actual navbar
      left: 16,
      right: 16,
      child: Container(
        height: 70,
        decoration: BoxDecoration(
          color: const Color.fromARGB(255, 36, 36, 36), // Dark shadow color
          borderRadius: BorderRadius.circular(16),
        ),
      ),
    ),
    // Actual Bottom Navigation Bar
    Container(
      margin: EdgeInsets.fromLTRB(16, 16, 16, 24), // Adjusted margin for the bottom
      height: 64,
      decoration: BoxDecoration(
        color: const Color.fromARGB(255, 77, 77, 77),
        borderRadius: BorderRadius.circular(16),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            // Calendar Button
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, '/calendar'); // Navigate to calendar
              },
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    height: double.infinity,
                    width: 80, // Highlight width (wider for selected)
                    decoration: BoxDecoration(
                      color: 0 == 2 // Highlight condition
                          ? Colors.grey[600] // Selected button background
                          : Colors.transparent, // Default button background
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  Icon(
                    Icons.calendar_today,
                    color: 0 == 2 ? Colors.white : Colors.grey, // Icon color
                    size: 34,
                  ),
                ],
              ),
            ),
            // Soccer Button
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, '/home');
              },
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    height: double.infinity,
                    width: 80, // Highlight width (wider for selected)
                    decoration: BoxDecoration(
                      color: 1 == 2 // Highlight condition
                          ? Colors.grey[600] // Selected button background
                          : Colors.transparent, // Default button background
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  Icon(
                    Icons.sports_soccer,
                    color: 1 == 2 ? Colors.white : Colors.grey, // Icon color
                    size: 34,
                  ),
                ],
              ),
            ),
            // History Button
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, '/historico'); // Navigate to historico
              },
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    height: double.infinity,
                    width: 104, // Highlight width (wider for selected)
                    decoration: BoxDecoration(
                      color: 2 == 2 // Highlight condition
                          ? Colors.grey[600] // Selected button background
                          : Colors.transparent, // Default button background
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  Icon(
                    Icons.history,
                    color: 2 == 2 ? Colors.white : Colors.grey, // Icon color
                    size: 34,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  ],
),

    );
  }

  Color _statusColor(String status) {
    switch (status) {
      case "green":
        return Colors.green;
      case "yellow":
        return Colors.yellow;
      case "red":
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
}
