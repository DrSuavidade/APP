// screens/historico.dart
import 'package:flutter/material.dart';

class HistoricoScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("History")),
      body: Center(
        child: ElevatedButton(
          child: Text("Back to Home"),
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
