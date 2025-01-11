// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class RelatorioScreen extends StatefulWidget {
  @override
  _RelatorioPageState createState() => _RelatorioPageState();
}

class _RelatorioPageState extends State<RelatorioScreen> {
  int tecnica = 0, velocidade = 0, atitudeCompetitiva = 0, inteligencia = 0;
  String? altura, morfologia;
  final _commentController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true, // Center the title
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text(
          "INFORMAÇÕES DO JOGADOR",
          style: TextStyle(
            color: Colors.white,
            fontSize: 10,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      body: Stack(
        children: [
          // Background Image
          Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              image: DecorationImage(
                image:
                    AssetImage('assets/images/Padrao.png'), // Background image
                fit: BoxFit.cover, // Cover the full screen
              ),
            ),
          ),
          // Existing content
          Padding(
            padding: const EdgeInsets.only(left: 0, right: 0),
            child: ListView(
              children: [
                // Transparent Container for Player Info
                Container(
                  padding: EdgeInsets.only(left: 20, right: 20),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      CircleAvatar(
                        radius: 40,
                        backgroundColor: Colors.grey[800],
                        child:
                            Icon(Icons.person, color: Colors.white, size: 40),
                      ),
                      SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "NOME: Marco Saraiva",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w300),
                            ),
                            Text(
                              "IDADE: 12",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w300),
                            ),
                            SizedBox(height: 8),
                            Text(
                              "AVALIAÇÃO - BOM",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 12,
                                  fontWeight: FontWeight.w400),
                            ),
                            SizedBox(height: 8),
                            Row(
                              children: [
                                Icon(Icons.circle,
                                    color: Colors.green, size: 12),
                                SizedBox(width: 4),
                                Text(
                                  "3/4",
                                  style: TextStyle(color: Colors.green),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 4),
                _buildDivider(),
                SizedBox(height: 5),
                Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 10), // Add horizontal padding
                  child: Column(
                    children: [
                      // Independent Rating Sections
                      _buildRatingSection("TÉCNICA", tecnica,
                          (value) => setState(() => tecnica = value)),
                      _buildRatingSection("VELOCIDADE", velocidade,
                          (value) => setState(() => velocidade = value)),
                      _buildRatingSection(
                          "ATITUDE COMPETITIVA",
                          atitudeCompetitiva,
                          (value) =>
                              setState(() => atitudeCompetitiva = value)),
                      _buildRatingSection("INTELIGÊNCIA", inteligencia,
                          (value) => setState(() => inteligencia = value)),
                      // Altura Section
                      _buildOptionSection("ALTURA", ["Baixo", "Médio", "Alto"],
                          altura, (value) => setState(() => altura = value)),
                      SizedBox(height: 5),
                      // Morphology Section
                      _buildOptionSection(
                          "MORFOLOGIA",
                          ["Hectomorfo", "Mesomorfo", "Endomorfo"],
                          morfologia,
                          (value) => setState(() => morfologia = value)),
                      SizedBox(height: 5),
                      // Comment Section
                      Stack(
                        children: [
                          // Background box with text field
                          Container(
                            height: 100, // Adjust height as needed
                            decoration: BoxDecoration(
                              color: Colors.grey[
                                  900], // Match other widgets' background color
                            ),
                            padding: EdgeInsets.only(
                                top: 20,
                                left: 10,
                                right: 10), // Padding for the text field
                            child: TextField(
                              controller: _commentController,
                              maxLines: null, // Allow multiline input
                              expands: true, // Expand to fill the container
                              textAlignVertical: TextAlignVertical
                                  .bottom, // Align text to the bottom
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 11), // Text style
                              decoration: InputDecoration(
                                border: InputBorder.none, // Remove border
                                contentPadding: EdgeInsets
                                    .zero, // No extra padding for input text
                              ),
                            ),
                          ),
                          // "COMENTÁRIO" text at the top-left corner
                          Positioned(
                            top: 5, // Adjust vertical position
                            left: 10, // Adjust horizontal position
                            child: Text(
                              "COMENTÁRIO",
                              style:
                                  TextStyle(color: Colors.white, fontSize: 11),
                            ),
                          ),
                        ],
                      ),

                      // Confirm Button
                      SizedBox(height: 10),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pushNamed(
                              context, '/home'); // Navigate to home.dart
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              Colors.white, // Swap background color
                          padding: EdgeInsets.symmetric(
                              vertical: 10, horizontal: 15), // Add padding
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                        child: Text(
                          "CONFIRMAR",
                          style: TextStyle(
                              color: Colors.grey[900], // Swap text color
                              fontSize:
                                  12 // Make the text bold for better visibility
                              ),
                        ),
                      ),
                      SizedBox(height: 20),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Updated Rating Section for Independent Functionality
  Widget _buildRatingSection(
      String label, int currentValue, Function(int) onChanged) {
    return Padding(
      padding:
          const EdgeInsets.only(left: 7), // Align everything with left padding
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(color: Colors.white, fontSize: 11),
          ),
          Transform.translate(
            // Shift dots closer to the text
            offset: Offset(-12, -5), // Adjust the vertical offset as needed
            child: Row(
              mainAxisAlignment:
                  MainAxisAlignment.start, // Align items to the left
              children: [
                ...List.generate(4, (index) {
                  return Padding(
                    padding: const EdgeInsets.only(
                        right: 16), // Add spacing between dots
                    child: IconButton(
                      iconSize: 15, // Slightly smaller dots
                      padding: EdgeInsets
                          .zero, // Remove internal padding of the IconButton
                      constraints:
                          BoxConstraints(), // Remove constraints to make the buttons tighter
                      icon: Icon(
                        Icons.circle,
                        color: index + 1 <= currentValue
                            ? Colors.green
                            : Colors.grey,
                      ),
                      onPressed: () => onChanged(index + 1),
                    ),
                  );
                }),
                SizedBox(width: 10), // Add space between the dots and the text
                Text(
                  "$currentValue/4", // Show the current value dynamically
                  style: TextStyle(color: Colors.white, fontSize: 11),
                ),
              ],
            ),
          ),
          SizedBox(height: 4), // Keeps a small gap below for other sections
        ],
      ),
    );
  }

  // Updated Option Section to Handle Different Categories
  Widget _buildOptionSection(String label, List<String> options,
      String? selectedValue, Function(String) onChanged) {
    return Container(
      padding:
          const EdgeInsets.all(10), // Add some padding inside the container
      decoration: BoxDecoration(
        color: Colors.grey[900], // Background color of the container
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(color: Colors.white, fontSize: 11),
          ),
          SizedBox(height: 10), // Space between the label and options
          Row(
            mainAxisAlignment:
                MainAxisAlignment.spaceBetween, // Ensure equal spacing
            children: [
              Expanded(
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: GestureDetector(
                    onTap: () {
                      onChanged(options[0]); // Handle selection
                    },
                    child: Text(
                      options[0],
                      style: TextStyle(
                        color: selectedValue == options[0]
                            ? Colors.white
                            : const Color.fromARGB(255, 120, 120, 120),
                        fontSize: 12,
                        fontWeight: selectedValue == options[0]
                            ? FontWeight.bold
                            : FontWeight.normal,
                      ),
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Align(
                  alignment: Alignment.center,
                  child: GestureDetector(
                    onTap: () {
                      onChanged(options[1]); // Handle selection
                    },
                    child: Text(
                      options[1],
                      style: TextStyle(
                        color: selectedValue == options[1]
                            ? Colors.white
                            : const Color.fromARGB(255, 120, 120, 120),
                        fontSize: 12,
                        fontWeight: selectedValue == options[1]
                            ? FontWeight.bold
                            : FontWeight.normal,
                      ),
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Align(
                  alignment: Alignment.centerRight,
                  child: GestureDetector(
                    onTap: () {
                      onChanged(options[2]); // Handle selection
                    },
                    child: Text(
                      options[2],
                      style: TextStyle(
                        color: selectedValue == options[2]
                            ? Colors.white
                            : const Color.fromARGB(255, 120, 120, 120),
                        fontSize: 12,
                        fontWeight: selectedValue == options[2]
                            ? FontWeight.bold
                            : FontWeight.normal,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDivider() {
    return Container(
      width: double.infinity, // Make the divider span the full width
      child: Divider(
        color: Colors.white,
        thickness: 1, // Adjust thickness if needed
      ),
    );
  }
}
