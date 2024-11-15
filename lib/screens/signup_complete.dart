// screens/signup_complete.dart
import 'package:flutter/material.dart';

class SignupCompleteScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Signup Complete")),
      body: Center(
        child: ElevatedButton(
          child: Text("Back to Login"),
          onPressed: () => Navigator.pushNamed(context, '/'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
          ),
        ),
      ),
    );
  }
}
