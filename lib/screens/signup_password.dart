// screens/signup_password.dart
import 'package:flutter/material.dart';

class SignupPasswordScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Signup Password")),
      body: Center(
        child: ElevatedButton(
          child: Text("Complete Signup"),
          onPressed: () => Navigator.pushNamed(context, '/signup_complete'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
          ),
        ),
      ),
    );
  }
}
