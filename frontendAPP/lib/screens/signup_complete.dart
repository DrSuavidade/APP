import 'package:flutter/material.dart';
import '../api/api_service.dart';

class SignupCompleteScreen extends StatefulWidget {
  const SignupCompleteScreen({super.key});

  @override
  SignupCompleteScreenState createState() => SignupCompleteScreenState();
}

class SignupCompleteScreenState extends State<SignupCompleteScreen> {
  final ApiService api = ApiService(baseUrl: 'https://backendscout-cx6c.onrender.com/api');
  bool isRegistering = true;
  String? errorMessage;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _registerUser();
  }

  Future<void> _registerUser() async {
    if (!isRegistering) return; // Prevent multiple calls

    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    final email = args['EMAIL'];
    final nome = args['NOME'];
    final password = args['PASSWORD'];

    try {
      await api.registerUser({
        'EMAIL': email,
        'NOME': nome,
        'PASSWORD': password,
        'ID_TIPO': 3,
      });

      setState(() {
        isRegistering = false;
      });
    } catch (e) {
      setState(() {
        isRegistering = false;
        errorMessage = 'Falha ao criar usuário.';
      });
    }
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
                crossAxisAlignment: CrossAxisAlignment.center, // Center align everything
                children: [
                  const SizedBox(height: 45.0),

                  // Logo
                  Image.asset(
                    'assets/images/Logofinal1.png',
                    height: 120.0,
                  ),
                  const SizedBox(height: 45.0),

                  // Success Message
                  Text(
                    isRegistering
                        ? "Criando conta..."
                        : (errorMessage != null ? "Erro ao criar conta" : "Conta criada com sucesso!"),
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 22.0,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 10.0),

                  // Secondary Message
                  Text(
                    isRegistering
                        ? "Por favor, aguarde..."
                        : (errorMessage != null
                            ? "Ocorreu um erro ao tentar criar a conta."
                            : "Volte para a página de login para acessar a aplicação"),
                    style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 14.0,
                      fontWeight: FontWeight.w400,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 30.0),

                  if (isRegistering)
                    const CircularProgressIndicator(color: Colors.white),

                  const SizedBox(height: 20.0),

                  // Back to Login Button
                  if (!isRegistering)
                    Center(
                      child: ElevatedButton(
                        onPressed: () {
                          Navigator.pushReplacementNamed(context, '/');
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.grey[800],
                          padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 50.0),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30.0),
                          ),
                        ),
                        child: const Text("Voltar", style: TextStyle(color: Colors.white)),
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
