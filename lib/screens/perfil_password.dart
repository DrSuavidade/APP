// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class PerfilPasswordScreen extends StatelessWidget {
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

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
        title: Text("PERFIL", style: TextStyle(color: Colors.white)),
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
            Text(
              "Arasilva\nNOME: Armando Silva\nEMAIL: armandosilva@gmail.com",
              style: TextStyle(color: Colors.white),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 16),
            // Password Input
            _buildTextField(_passwordController, "NOVA PASSWORD"),
            SizedBox(height: 16),
            // Confirm Password Input
            _buildTextField(_confirmPasswordController, "REPITA A PASSWORD"),
            Spacer(),
            // Confirm Button
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/perfil'); // Navigate back to perfil.dart
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
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

  Widget _buildTextField(TextEditingController controller, String label) {
    return TextField(
      controller: controller,
      obscureText: true,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: Colors.grey),
        filled: true,
        fillColor: Colors.grey[800],
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }
}
