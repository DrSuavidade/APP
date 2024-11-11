// screens/add_player_name.dart
import 'package:flutter/material.dart';

class AddPlayerNameScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Add Player Name")),
      body: Center(
        child: ElevatedButton(
          child: Text("Confirmar Novo Jogador"),
          onPressed: () => Navigator.pushReplacementNamed(context, '/relatorio'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
          ),
        ),
      ),
    );
  }
}
