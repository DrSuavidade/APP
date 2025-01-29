import 'package:flutter/material.dart';

class SignupNameScreen extends StatelessWidget {
  final TextEditingController _nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    final email = args['EMAIL'];

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
                            color: Colors.white,
                          ),
                        ),
                        Column(
                          children: [
                            CircleAvatar(radius: 10, backgroundColor: Colors.white),
                            SizedBox(height: 4),
                            Text("pass", style: TextStyle(color: Colors.white, fontSize: 10)),
                          ],
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 25.0),

                  // Name Label
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 6.0),
                    child: Text(
                      "Nome Completo",
                      style: TextStyle(color: Colors.white, fontSize: 14.0),
                    ),
                  ),
                  SizedBox(height: 6.0),

                  // Name Input Field
                  SizedBox(
                    height: 40.0,
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 6.0),
                      child: TextField(
                        controller: _nameController,
                        style: TextStyle(color: Colors.white),
                        decoration: InputDecoration(
                          hintText: 'Insira o seu nome aqui',
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

                  // Divider Line
                  Divider(color: Colors.grey),

                  // "Já tens uma conta?" Button
                  Center(
                    child: TextButton(
                      onPressed: () => Navigator.pushNamed(context, '/'),
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
