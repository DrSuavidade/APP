import 'package:flutter/material.dart';

class SignupEmailPage extends StatelessWidget {
  final _emailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: Text("Página REGISTRAR", style: TextStyle(color: Colors.grey)),
        backgroundColor: Colors.black,
        elevation: 0,
      ),
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

                // Title Text
                Text(
                  "Crie a sua conta",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24.0,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 16.0),

                // Progress Indicator
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircleAvatar(
                      radius: 6,
                      backgroundColor: Colors.white,
                      child: Text(''),
                    ),
                    SizedBox(width: 8),
                    CircleAvatar(
                      radius: 6,
                      backgroundColor: Colors.grey,
                      child: Text(''),
                    ),
                    SizedBox(width: 8),
                    CircleAvatar(
                      radius: 6,
                      backgroundColor: Colors.grey,
                      child: Text(''),
                    ),
                  ],
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
                SizedBox(height: 24.0),

                // Continue Button
                ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/signup_name'); // Assume this goes to the next signup step
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey[900],
                    padding: EdgeInsets.symmetric(vertical: 14.0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  child: Text(
                    "Continuar",
                    style: TextStyle(color: Colors.white),
                  ),
                ),
                SizedBox(height: 24.0),

                // Divider Line
                Divider(color: Colors.grey),

                // "Já tens uma conta? Log in" Button
                TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/'); // Navigates back to login
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Já tens uma conta? ",
                        style: TextStyle(color: Colors.white),
                      ),
                      Text(
                        "Log in",
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
