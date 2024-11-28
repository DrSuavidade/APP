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
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text("INFORMAÇÕES DO JOGADOR", style: TextStyle(color: Colors.white)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            CircleAvatar(
              radius: 40,
              backgroundColor: Colors.grey[700],
              child: Icon(Icons.person, color: Colors.white, size: 40),
            ),
            SizedBox(height: 16),
            // Player Info
            Text(
              "NOME: Marco Saraiva\nIDADE: 12\nAVALIAÇÃO: BOM",
              style: TextStyle(color: Colors.white),
            ),
            SizedBox(height: 16),
            // Independent Rating Sections
            _buildRatingSection("TÉCNICA", tecnica, (value) => setState(() => tecnica = value)),
            _buildRatingSection("VELOCIDADE", velocidade, (value) => setState(() => velocidade = value)),
            _buildRatingSection("ATITUDE COMPETITIVA", atitudeCompetitiva, (value) => setState(() => atitudeCompetitiva = value)),
            _buildRatingSection("INTELIGÊNCIA", inteligencia, (value) => setState(() => inteligencia = value)),
            // Altura Section
            _buildOptionSection("ALTURA", ["Baixo", "Médio", "Alto"], altura, (value) => setState(() => altura = value)),
            // Morphology Section
            _buildOptionSection("MORFOLOGIA", ["Hectomorfo", "Mesomorfo", "Endomorfo"], morfologia, (value) => setState(() => morfologia = value)),
            // Comment Section
            TextField(
              controller: _commentController,
              maxLines: 4,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: "COMENTÁRIO",
                labelStyle: TextStyle(color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[800],
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
              ),
            ),
            SizedBox(height: 20),
            // Confirm Button
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/home'); // Navigate to home.dart
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.grey[900],
                padding: EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              child: Text("CONFIRMAR", style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }

  // Updated Rating Section for Independent Functionality
  Widget _buildRatingSection(String label, int currentValue, Function(int) onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(color: Colors.white)),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: List.generate(4, (index) {
            return Expanded( // Ensures each button takes equal space
              child: IconButton(
                icon: Icon(
                  Icons.circle,
                  color: index + 1 <= currentValue ? Colors.green : Colors.grey,
                ),
                onPressed: () => onChanged(index + 1),
              ),
            );
          }),
        ),
        SizedBox(height: 10),
      ],
    );
  }

  // Updated Option Section to Handle Different Categories
  Widget _buildOptionSection(String label, List<String> options, String? selectedValue, Function(String) onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(color: Colors.white)),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: options.map((option) {
            return Expanded( // Ensures each chip takes equal space
              child: ChoiceChip(
                label: Text(option, style: TextStyle(color: Colors.white)),
                selected: selectedValue == option,
                onSelected: (selected) {
                  if (selected) {
                    onChanged(option);
                  }
                },
                backgroundColor: Colors.grey[800],
                selectedColor: Colors.green,
              ),
            );
          }).toList(),
        ),
        SizedBox(height: 10),
      ],
    );
  }
}
