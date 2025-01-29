import 'package:flutter/material.dart';

class SignupPasswordScreen extends StatelessWidget {
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    final email = args['EMAIL'];
    final nome = args['NOME'];

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
                crossAxisAlignment: CrossAxisAlignment.start, // Align labels and inputs
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

                  // Title
                  Center(
                    child: Text(
                      "Crie a sua conta",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22.0,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  SizedBox(height: 35.0),

                  // Progress Indicator (Fixed Alignment)
                  Center(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Column(
                          children: [
                            CircleAvatar(radius: 10, backgroundColor: Colors.grey[600]),
                            SizedBox(height: 4),
                            Text("email", style: TextStyle(color: Colors.white, fontSize: 10)),
                          ],
                        ),
                        Padding(
                          padding: EdgeInsets.only(bottom: 15), // Moves the line slightly up
                          child: Container(
                            height: 2, // Line height
                            width: 32, // Line width
                            color: Colors.grey[600],
                          ),
                        ),
                        Column(
                          children: [
                            CircleAvatar(radius: 10, backgroundColor: Colors.grey[600]),
                            SizedBox(height: 4),
                            Text("nome", style: TextStyle(color: Colors.white, fontSize: 10)),
                          ],
                        ),
                        Padding(
                          padding: EdgeInsets.only(bottom: 15), // Moves the line slightly up
                          child: Container(
                            height: 2, // Line height
                            width: 32, // Line width
                            color: Colors.grey[600],
                          ),
                        ),
                        Column(
                          children: [
                            CircleAvatar(radius: 10, backgroundColor: Colors.grey[600]),
                            SizedBox(height: 4),
                            Text("pass", style: TextStyle(color: Colors.white, fontSize: 10)),
                          ],
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 25.0),

                  // Password Label
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 6.0),
                    child: Text(
                      "Password",
                      style: TextStyle(color: Colors.white, fontSize: 14.0),
                    ),
                  ),
                  SizedBox(height: 6.0),

                  // Password Input Field
                  SizedBox(
                    height: 40.0,
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 6.0),
                      child: TextField(
                        controller: _passwordController,
                        obscureText: true,
                        style: TextStyle(color: Colors.white),
                        decoration: InputDecoration(
                          hintText: 'Digite sua senha',
                          hintStyle: TextStyle(color: Colors.grey[300], fontSize: 14.0, fontWeight: FontWeight.w300),
                          filled: true,
                          fillColor: const Color.fromARGB(255, 169, 169, 169),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(30.0),
                            borderSide: BorderSide.none,
                          ),
                          contentPadding: EdgeInsets.symmetric(vertical: 2.0, horizontal: 30.0),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 16.0),

                  // Confirm Password Label
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 6.0),
                    child: Text(
                      "Confirmar Password",
                      style: TextStyle(color: Colors.white, fontSize: 14.0),
                    ),
                  ),
                  SizedBox(height: 6.0),

                  // Confirm Password Input Field
                  SizedBox(
                    height: 40.0,
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 6.0),
                      child: TextField(
                        controller: _confirmPasswordController,
                        obscureText: true,
                        style: TextStyle(color: Colors.white),
                        decoration: InputDecoration(
                          hintText: 'Repita sua senha',
                          hintStyle: TextStyle(color: Colors.grey[300], fontSize: 14.0, fontWeight: FontWeight.w300),
                          filled: true,
                          fillColor: const Color.fromARGB(255, 169, 169, 169),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(30.0),
                            borderSide: BorderSide.none,
                          ),
                          contentPadding: EdgeInsets.symmetric(vertical: 2.0, horizontal: 30.0),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 24.0),

                  // Continue Button
                  Center(
                    child: ElevatedButton(
                      onPressed: () {
                        if (_passwordController.text.trim() != _confirmPasswordController.text.trim()) {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text('Erro'),
                              content: Text('As senhas não coincidem.'),
                              actions: [
                                TextButton(
                                  onPressed: () => Navigator.pop(context),
                                  child: Text('OK'),
                                ),
                              ],
                            ),
                          );
                          return;
                        }

                        Navigator.pushNamed(
                          context,
                          '/signup_complete',
                          arguments: {
                            'EMAIL': email,
                            'NOME': nome,
                            'PASSWORD': _passwordController.text.trim(),
                          },
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.grey[800],
                        padding: EdgeInsets.symmetric(vertical: 4.0, horizontal: 60.0),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30.0),
                        ),
                      ),
                      child: Text("Continuar", style: TextStyle(color: Colors.white)),
                    ),
                  ),
                  SizedBox(height: 80.0),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
