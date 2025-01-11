// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import '../api/api_service.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');
  bool _isLoading = false;

  void _login() async {
  setState(() {
    _isLoading = true;
  });

  try {
    // Call the login endpoint
    final response = await api.loginUser({
      'email': _emailController.text.trim(),
      'password': _passwordController.text.trim(),
    });

    // Check if the login was successful
    if (response.containsKey('token')) {
      setState(() {
        _isLoading = false;
      });

      // Navigate to the home page on successful login
      Navigator.pushNamed(context, '/home');
      print('Login successful: ${response['token']}');
    } else {
      setState(() {
        _isLoading = false;
      });

      // Show an error dialog if login failed
      _showErrorDialog('Login Failed', response['error'] ?? 'Invalid credentials');
    }
  } catch (e) {
    // Handle exceptions
    setState(() {
      _isLoading = false;
    });

    _showErrorDialog('Login Failed', e.toString());
  }
}

void _showErrorDialog(String title, String message) {
  showDialog(
    context: context,
    builder: (context) {
      return AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('OK'),
          ),
        ],
      );
    },
  );
}


  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32.0),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Logo
                Image.asset(
                  'assets/images/Logofinal1.png',
                  height: 80.0,
                ),
                SizedBox(height: 24.0),

                // Welcome Text
                Text(
                  "Bem vindo de volta!",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24.0,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 24.0),

                // Email Input Field
                TextField(
                  controller: _emailController,
                  style: TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    labelText: 'Email',
                    labelStyle: TextStyle(color: Colors.white),
                    hintText: 'acviseu@exemplo.com',
                    hintStyle: TextStyle(color: Colors.grey),
                    filled: true,
                    fillColor: Colors.grey[800],
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                      borderSide: BorderSide.none,
                    ),
                  ),
                ),
                SizedBox(height: 16.0),

                // Password Input Field
                TextField(
                  controller: _passwordController,
                  obscureText: true,
                  style: TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    labelText: 'Password',
                    labelStyle: TextStyle(color: Colors.white),
                    filled: true,
                    fillColor: Colors.grey[800],
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10.0),
                      borderSide: BorderSide.none,
                    ),
                  ),
                ),
                SizedBox(height: 24.0),

                // Login Button
                _isLoading
                    ? CircularProgressIndicator()
                    : ElevatedButton(
                        onPressed: _login,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.grey[900],
                          padding: EdgeInsets.symmetric(vertical: 14.0),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10.0),
                          ),
                        ),
                        child: Text(
                          "Log in",
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                SizedBox(height: 8.0),

                // "Não te lembras da password?" Button
                TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/password_recover');
                  },
                  child: Text(
                    "Não te lembras da password?",
                    style: TextStyle(color: Colors.white),
                  ),
                ),
                SizedBox(height: 24.0),

                // Divider Line
                Divider(color: Colors.grey),

                // "Registrar" Button
                TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/signup_email');
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Não tens conta? ",
                        style: TextStyle(color: Colors.white),
                      ),
                      Text(
                        "Registrar",
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}