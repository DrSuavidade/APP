// screens/perfil_password.dart
import 'package:flutter/material.dart';

class PerfilPasswordScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Edit Password")),
      body: Center(
        child: ElevatedButton(
          child: Text("Save Changes"),
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
