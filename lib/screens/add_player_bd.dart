// screens/add_player_bd.dart
import 'package:flutter/material.dart';

class AddPlayerBDScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Add Player BD")),
      body: Center(
        child: ElevatedButton(
          child: Text("Jogador não está na Base de dados?"),
          onPressed: () => Navigator.pushNamed(context, '/add_player_name'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
          ),
        ),
      ),
    );
  }
}
