// screens/add_player.dart
import 'package:flutter/material.dart';

class AddPlayerScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Add Player")),
      body: Center(
        child: ElevatedButton(
          child: Text("Jogador não está na equipa?"),
          onPressed: () => Navigator.pushNamed(context, '/add_player_bd'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
          ),
        ),
      ),
    );
  }
}
