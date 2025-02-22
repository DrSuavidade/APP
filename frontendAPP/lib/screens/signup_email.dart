import 'package:flutter/material.dart';

class SignupEmailScreen extends StatelessWidget {
  final TextEditingController _emailController = TextEditingController();

  SignupEmailScreen({super.key});

  void _validateAndProceed(BuildContext context) {
    if (_emailController.text.trim().isEmpty) {
      _showErrorDialog(context, "O campo de e-mail não pode estar vazio.");
      return;
    }

    if (!_emailController.text.trim().contains('@') || !_emailController.text.trim().contains('.')) {
    _showErrorDialog(context, "O e-mail inserido não é válido. Insira um e-mail correto.");
    return;
  }
    
    Navigator.pushNamed(
      context,
      '/signup_name',
      arguments: {'EMAIL': _emailController.text.trim()},
    );
  }

  void _showErrorDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Erro"),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("OK"),
          ),
        ],
      ),
    );
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
                crossAxisAlignment: CrossAxisAlignment.start, // Align labels and inputs
                children: [
                  const SizedBox(height: 45.0),

                  // Logo
                  Center(
                    child: Image.asset(
                      'assets/images/Logofinal1.png',
                      height: 120.0,
                    ),
                  ),
                  const SizedBox(height: 45.0),

                  // Title
                  const Center(
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
                  const SizedBox(height: 35.0),

                  Center(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Column(
                          children: [
                            CircleAvatar(radius: 10, backgroundColor: Colors.grey[600]),
                            const SizedBox(height: 4),
                            const Text("email", style: TextStyle(color: Colors.white, fontSize: 10)),
                          ],
                        ),
                        Padding(
                          padding: const EdgeInsets.only(bottom: 15), // Moves the line slightly up
                          child: Container(
                            height: 2, // Line height
                            width: 32, // Line width
                            color: Colors.white,
                          ),
                        ),
                        const Column(
                          children: [
                            CircleAvatar(radius: 10, backgroundColor: Colors.white),
                            SizedBox(height: 4),
                            Text("nome", style: TextStyle(color: Colors.white, fontSize: 10)),
                          ],
                        ),
                        Padding(
                          padding: const EdgeInsets.only(bottom: 15), // Moves the line slightly up
                          child: Container(
                            height: 2, // Line height
                            width: 32, // Line width
                            color: Colors.white,
                          ),
                        ),
                        const Column(
                          children: [
                            CircleAvatar(radius: 10, backgroundColor: Colors.white),
                            SizedBox(height: 4),
                            Text("pass", style: TextStyle(color: Colors.white, fontSize: 10)),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 25.0),


                  // Email Label
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 6.0),
                    child: Text(
                      "Email",
                      style: TextStyle(color: Colors.white, fontSize: 14.0),
                    ),
                  ),
                  const SizedBox(height: 6.0),

                  // Email Input Field
                  SizedBox(
                    height: 40.0,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 6.0),
                      child: TextField(
                        controller: _emailController,
                        style: const TextStyle(color: Colors.white),
                        decoration: InputDecoration(
                          hintText: 'acviseu@exemplo.com',
                          hintStyle: TextStyle(color: Colors.grey[300], fontSize: 14.0, fontWeight: FontWeight.w300),
                          filled: true,
                          fillColor: const Color.fromARGB(255, 169, 169, 169),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(30.0),
                            borderSide: BorderSide.none,
                          ),
                          contentPadding: const EdgeInsets.symmetric(vertical: 2.0, horizontal: 30.0),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 24.0),

                  // Continue Button
                  Center(
                    child: ElevatedButton(
                      onPressed: () => _validateAndProceed(context),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.grey[800],
                        padding: const EdgeInsets.symmetric(vertical: 4.0, horizontal: 60.0),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30.0),
                        ),
                      ),
                      child: const Text("Continuar", style: TextStyle(color: Colors.white)),
                    ),
                  ),

                  const SizedBox(height: 80.0),

                  // Divider Line
                  const Divider(color: Colors.grey),

                  // "Já tens uma conta?" Button
                  Center(
                    child: TextButton(
                      onPressed: () => Navigator.pushNamed(context, '/'),
                      child: const Row(
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
