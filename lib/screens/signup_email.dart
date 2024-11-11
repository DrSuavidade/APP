// screens/signup_email.dart
import 'package:flutter/material.dart';

class SignupEmailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Signup Email")),
      body: Center(
        child: ElevatedButton(
          child: Text("Next"),
          onPressed: () => Navigator.pushNamed(context, '/signup_name'),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
          ),
        ),
      ),
    );
  }
}
