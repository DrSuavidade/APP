// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

import 'package:mongo_dart/mongo_dart.dart';

void main() async {
  // Substitua pela sua string de conexão
  final db = Db('mongodb+srv://Admin:egNRjxkxZBa74nVl@cluster0.6tsv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  try {
    await db.open();
    print('Conexão estabelecida com sucesso!');
  } catch (e) {
    print('Erro ao conectar: $e');
  } finally {
    await db.close();
  }
}



class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  void _login() {
    setState(() {
      _isLoading = true;
    });
    // Placeholder for authentication logic
    Future.delayed(Duration(seconds: 2), () {
      setState(() {
        _isLoading = false;
      });
      Navigator.pushNamed(context, '/home'); // Navigate to home page on successful login
    });
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
                    children: const [
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
