// screens/privacidade.dart
import 'package:flutter/material.dart';

class PrivacidadeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Privacy")),
      body: Center(
        child: ElevatedButton(
          child: Text("Back to Profile"),
          onPressed: () => Navigator.pop(context),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
          ),
        ),
      ),
    );
  }
}
