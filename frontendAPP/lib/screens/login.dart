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
  final ApiService api = ApiService(baseUrl: 'http://10.0.2.2:3000/api');
  bool _isLoading = false;

  void _login() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final response = await api.loginUser({
        'EMAIL': _emailController.text.trim(),
        'PASSWORD': _passwordController.text.trim(),
      });

      if (response.containsKey('token') && response.containsKey('USER') && response['USER'] != null) {
        final user = response['USER'];
        final userId = user['ID_USER']; // Extract id_user (number) from the response

        setState(() {
          _isLoading = false;
        });

        // Pass id_user to the /home route
        Navigator.pushNamed(
          context,
          '/home',
          arguments: {'userId': userId}, // Pass id_user as arguments
        );
      } else {
        setState(() {
          _isLoading = false;
        });

        _showErrorDialog(
          'Login Failed',
          response['error'] ?? 'Invalid credentials or missing user data',
        );
      }
    } catch (e) {
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
      body: Stack(
        children: [
          // Background Image
          Container(
            width: double.infinity,
            height: double.infinity,
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Padrao.png'), // Background image
                fit: BoxFit.cover, // Cover the full screen
              ),
            ),
          ),
          Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start, // Aligns all elements to the left
                children: [
                  SizedBox(height: 45.0),
                  // Logo
                  Center(
                    child: Image.asset(
                      'assets/images/Logofinal1.png',
                      height: 120.0,
                    ),
                  ),
                  SizedBox(height: 45.0),

                  // Welcome Text
                  Center(
                    child: Text(
                      "Bem vindo de volta!",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22.0,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  SizedBox(height: 35.0),

                  // Email Label and Input
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 6.0), // Aligns label with text field
                    child: Text(
                      "Email",
                      style: TextStyle(color: Colors.white, fontSize: 14.0),
                    ),
                  ),
                  SizedBox(height: 6.0), // Spacing before text field
                  SizedBox(
                    height: 40.0,
                    child: TextField(
                      controller: _emailController,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        hintText: 'acviseu@exemplo.com',
                        hintStyle: TextStyle(color: Colors.grey[300],fontSize: 14.0, fontWeight: FontWeight.w300),
                        filled: true,
                        fillColor: const Color.fromARGB(255, 169, 169, 169),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30.0), // More rounded
                          borderSide: BorderSide.none,
                        ),
                        contentPadding: EdgeInsets.symmetric(vertical: 2.0, horizontal: 30.0),
                      ),
                    ),
                  ),
                  SizedBox(height: 12.0),

                  // Password Label and Input
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 6.0),
                    child: Text(
                      "Password",
                      style: TextStyle(color: Colors.white, fontSize: 14.0),
                    ),
                  ),
                  SizedBox(height: 6.0), // Spacing before text field
                  SizedBox(
                    height: 40.0,
                    child: TextField(
                      controller: _passwordController,
                      obscureText: true,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: const Color.fromARGB(255, 169, 169, 169),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30.0), // More rounded
                          borderSide: BorderSide.none,
                        ),
                        contentPadding: EdgeInsets.symmetric(vertical: 2.0, horizontal: 30.0),
                      ),
                    ),
                  ),
                  SizedBox(height: 20.0),

                  // Login Button
                  Center(
                    child: _isLoading
                        ? CircularProgressIndicator()
                        : ElevatedButton(
                            onPressed: _login,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.grey[800],
                              padding: EdgeInsets.symmetric(vertical: 4.0, horizontal: 60.0),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(30.0), // More rounded
                              ),
                            ),
                            child: Text(
                              "Log in",
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                  ),

                  // "Não te lembras da password?" Button
                  Center(
                    child: TextButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/password_recover');
                      },
                      child: Text(
                        "Não te lembras da password?",
                        style: TextStyle(color: Colors.white, fontSize: 10.0),
                      ),
                    ),
                  ),
                  SizedBox(height: 30.0),

                  // Divider Line
                  Divider(color: Colors.grey),

                  // "Registrar" Button
                  Center(
                    child: TextButton(
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
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
