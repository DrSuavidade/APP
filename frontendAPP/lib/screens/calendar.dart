// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'hamburger_menu.dart';

class CalendarScreen extends StatelessWidget {
  final List<Map<String, String>> games = [
    {
      "home": "A.F Viseu",
      "away": "SL Nelas",
      "time": "12:00 AM",
      "date": "17/10/2024"
    },
    {
      "home": "AC Castro Daire",
      "away": "CD Tondela",
      "time": "18:00 PM",
      "date": "20/10/2024"
    },
    {
      "home": "UD Alta Lisboa",
      "away": "AC Castro Daire",
      "time": "15:00 PM",
      "date": "23/10/2024"
    },
    // Add more games as needed
  ];

  final int userId;

  CalendarScreen({Key? key, required this.userId}) : super(key: key);

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
      drawer: HamburgerMenu(userId: userId),
      body: Column(
        children: [
          // Levels Filter
          SizedBox(
            height: 40,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                _filterButton("Sub-10"),
                _filterButton("Sub-11"),
                _filterButton("Sub-12"),
                _filterButton("Sub-13"),
                _filterButton("Sub-14"),
                _filterButton("Sub-16"),
                _filterButton("Sub-19"),
                _filterButton("Sub-23"),
                _filterButton("PROFISSIONAL"),
              ],
            ),
          ),
          SizedBox(height: 10),
          // Games List
          Expanded(
            child: ListView.builder(
              itemCount: games.length,
              itemBuilder: (context, index) {
                final game = games[index];
                return Card(
                  color: Colors.grey[800],
                  margin: EdgeInsets.symmetric(vertical: 5, horizontal: 16),
                  child: ListTile(
                    title: Text(
                      "${game['home']}  vs  ${game['away']}",
                      style: TextStyle(color: Colors.white),
                    ),
                    subtitle: Text(
                      "${game['date']} at ${game['time']}",
                      style: TextStyle(color: Colors.grey),
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
                color:
                    const Color.fromARGB(255, 36, 36, 36), // Dark shadow color
                borderRadius: BorderRadius.circular(16),
              ),
            ),
          ),
          // Actual Bottom Navigation Bar
          Container(
            margin: EdgeInsets.fromLTRB(
                16, 16, 16, 24), // Adjusted margin for the bottom
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
                      Navigator.pushNamed(
                        context,
                        '/calendar',
                        arguments: {'userId': userId}, // Pass userId here
                      );
                    },
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        Container(
                          height: double.infinity,
                          width: 104, // Highlight width (wider for selected)
                          decoration: BoxDecoration(
                            color: 0 == 0 // Highlight condition
                                ? Colors.grey[600] // Selected button background
                                : Colors
                                    .transparent, // Default button background
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        Icon(
                          Icons.calendar_today,
                          color:
                              0 == 0 ? Colors.white : Colors.grey, // Icon color
                          size: 34,
                        ),
                      ],
                    ),
                  ),
                  // Soccer Button
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        '/home',
                        arguments: {'userId': userId}, // Pass userId here
                      );
                    },
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        Container(
                          height: double.infinity,
                          width: 80, // Highlight width (wider for selected)
                          decoration: BoxDecoration(
                            color: 1 == 0 // Highlight condition
                                ? Colors.grey[600] // Selected button background
                                : Colors
                                    .transparent, // Default button background
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        Icon(
                          Icons.sports_soccer,
                          color:
                              1 == 0 ? Colors.white : Colors.grey, // Icon color
                          size: 34,
                        ),
                      ],
                    ),
                  ),
                  // History Button
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        '/historico',
                        arguments: {'userId': userId}, // Pass userId here
                      );
                    },
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        Container(
                          height: double.infinity,
                          width: 80, // Highlight width (wider for selected)
                          decoration: BoxDecoration(
                            color: 2 == 0 // Highlight condition
                                ? Colors.grey[600] // Selected button background
                                : Colors
                                    .transparent, // Default button background
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        Icon(
                          Icons.history,
                          color:
                              2 == 0 ? Colors.white : Colors.grey, // Icon color
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

  Widget _filterButton(String label) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: ElevatedButton(
        onPressed: () {
          // Filter functionality
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.grey[900],
        ),
        child: Text(label, style: TextStyle(color: Colors.white)),
      ),
    );
  }
}
