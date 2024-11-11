// screens/signup_name.dart
import 'package:flutter/material.dart';

class SignupNameScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Signup Name")),
      body: Center(
        child: ElevatedButton(
          child: Text("Next"),
          onPressed: () => Navigator.pushNamed(context, '/signup_password'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
          ),
        ),
      ),
    );
  }
}
