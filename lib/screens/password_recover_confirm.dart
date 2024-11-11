// screens/password_recover_confirm.dart
import 'package:flutter/material.dart';

class PasswordRecoverConfirmScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Confirm Recovery")),
      body: Center(
        child: ElevatedButton(
          child: Text("Back to Login"),
          onPressed: () => Navigator.pushReplacementNamed(context, '/login'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
          ),
        ),
      ),
    );
  }
}
