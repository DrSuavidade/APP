import 'package:flutter/material.dart';

class SignupNameScreen extends StatelessWidget {
  final TextEditingController _nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    final email = args['EMAIL'];

    return Scaffold(
      backgroundColor: Colors.black,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32.0),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset(
                  'assets/images/Logofinal1.png',
                  height: 80.0,
                ),
                SizedBox(height: 24.0),
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
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    CircleAvatar(radius: 6, backgroundColor: Colors.white),
                    SizedBox(width: 8),
                    CircleAvatar(radius: 6, backgroundColor: Colors.white),
                    SizedBox(width: 8),
                    CircleAvatar(radius: 6, backgroundColor: Colors.grey),
                  ],
                ),
                SizedBox(height: 24.0),
                TextField(
                  controller: _nameController,
                  style: TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    labelText: 'Nome Completo',
                    labelStyle: TextStyle(color: Colors.white),
                    hintText: 'Insira o seu nome aqui',
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
                ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(
                      context,
                      '/signup_password',
                      arguments: {
                        'EMAIL': email,
                        'NOME': _nameController.text.trim(),
                      },
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey[900],
                    padding: EdgeInsets.symmetric(vertical: 14.0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  child: Text("Continuar", style: TextStyle(color: Colors.white)),
                ),
                Divider(color: Colors.grey, height: 36.0),
                TextButton(
                  onPressed: () => Navigator.pushNamed(context, '/'),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Text("Já tens uma conta? ", style: TextStyle(color: Colors.white)),
                      Text("Log in", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
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
