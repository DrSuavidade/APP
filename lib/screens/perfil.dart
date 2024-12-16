// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class PerfilScreen extends StatelessWidget {
  const PerfilScreen({super.key});

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
            // Profile Picture and User Info
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
            SizedBox(height: 8),
            Text(
              "SCOUTER\n5 avaliações",
              style: TextStyle(color: Colors.green),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 32),
            // Buttons Section
            _buildCustomButton(context, "ALTERAR PASSWORD", () => Navigator.pushNamed(context, '/perfil_password')),
            SizedBox(height: 10),
            _buildCustomButton(context, "ALTERAR EMAIL", () => Navigator.pushNamed(context, '/perfil_email')),
            SizedBox(height: 10),
            _buildCustomButton(context, "POLÍTICAS DE PRIVACIDADE", () => Navigator.pushNamed(context, '/privacidade')),
            Spacer(),
            // Logout Button
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/'); // Navigate to login.dart
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red,
                padding: EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
              ),
              child: Text("TERMINAR SESSÃO", style: TextStyle(color: Colors.white, fontSize: 16)),
            ),
            SizedBox(height: 16),
            // Delete Account Link
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, '/'); // Navigate to login.dart
              },
              child: Text(
                "APAGAR CONTA?",
                style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCustomButton(BuildContext context, String label, VoidCallback onPressed) {
    return SizedBox(
      width: double.infinity,
      height: 50,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.grey[800],
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5),
          ),
        ),
        child: Align(
          alignment: Alignment.centerLeft,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              label,
              style: TextStyle(color: Colors.white, fontSize: 16),
            ),
          ),
        ),
      ),
    );
  }
}
