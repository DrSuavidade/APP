import 'package:flutter/material.dart';
import '../api/api_service.dart';

class PasswordRecoverScreen extends StatefulWidget {
  const PasswordRecoverScreen({super.key});

  @override
  PasswordRecoverScreenState createState() => PasswordRecoverScreenState();
}

class PasswordRecoverScreenState extends State<PasswordRecoverScreen> {
  final ApiService api = ApiService(baseUrl: 'https://backendscout-cx6c.onrender.com/api');
  final TextEditingController _emailController = TextEditingController();
  bool isLoading = false;

  Future<void> _sendRecoveryEmail() async {
    try {
      setState(() => isLoading = true);
      await api.sendRecoveryEmail(_emailController.text.trim());
      if (!mounted) return;
      Navigator.pushNamed(context, '/password_recover_confirm'); // Navigate to confirm screen
    } catch (e) {
      _showErrorDialog('Erro', 'Falha ao enviar o e-mail de recuperação.');
    } finally {
      setState(() => isLoading = false);
    }
  }

  void _showErrorDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
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
                crossAxisAlignment: CrossAxisAlignment.start, // Align text fields
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
                      "Recupere a sua conta",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22.0,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 35.0),

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
                      onPressed: isLoading ? null : _sendRecoveryEmail,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.grey[800],
                        padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 50.0),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30.0),
                        ),
                      ),
                      child: isLoading
                          ? const CircularProgressIndicator(color: Colors.white)
                          : const Text("Continuar", style: TextStyle(color: Colors.white)),
                    ),
                  ),
                  const SizedBox(height: 130.0),

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
