import 'package:flutter/material.dart';

class AddPlayerNameScreen extends StatefulWidget {
  @override
  _AddPlayerNamePageState createState() => _AddPlayerNamePageState();
}

class _AddPlayerNamePageState extends State<AddPlayerNameScreen> {
  final _nameController = TextEditingController();
  final _nationalityController = TextEditingController();
  String? _selectedGender;

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
        child: Column(
          children: [
            CircleAvatar(
              radius: 40,
              backgroundColor: Colors.grey[700],
              child: Icon(Icons.person, color: Colors.white, size: 40),
            ),
            SizedBox(height: 16),
            // Name Input
            TextField(
              controller: _nameController,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: "NOME",
                labelStyle: TextStyle(color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[800],
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
              ),
            ),
            SizedBox(height: 16),
            // Gender Dropdown
            DropdownButtonFormField<String>(
              value: _selectedGender,
              dropdownColor: Colors.grey[900],
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: "GENERO",
                labelStyle: TextStyle(color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[800],
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
              ),
              items: ["Masculino", "Feminino", "Outro"]
                  .map((gender) => DropdownMenuItem(value: gender, child: Text(gender)))
                  .toList(),
              onChanged: (value) {
                setState(() {
                  _selectedGender = value;
                });
              },
            ),
            SizedBox(height: 16),
            // Nationality Input
            TextField(
              controller: _nationalityController,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: "NACIONALIDADE",
                labelStyle: TextStyle(color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[800],
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
              ),
            ),
            Spacer(),
            // Add Button
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/relatorio'); // Navigate to relatorio.dart
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.grey[900],
                padding: EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              child: Text("ADICIONAR", style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }
}
