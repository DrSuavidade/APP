import 'package:flutter/material.dart';
import '../api/api_service.dart';

class SignupCompleteScreen extends StatefulWidget {
  @override
  _SignupCompleteScreenState createState() => _SignupCompleteScreenState();
}

class _SignupCompleteScreenState extends State<SignupCompleteScreen> {
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    final email = args['EMAIL'];
    final nome = args['NOME'];
    final password = args['PASSWORD'];

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
                  SizedBox(height: 45.0),

                  // Logo
                  Image.asset(
                    'assets/images/Logofinal1.png',
                    height: 120.0,
                  ),
                  SizedBox(height: 45.0),

                  // Success Message
                  Text(
                    "Conta criada com sucesso!",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 22.0,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 10.0),

                  // Secondary Message
                  Text(
                    "Volte para a página de login para acessar a aplicação",
                    style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 14.0,
                      fontWeight: FontWeight.w400,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 30.0),

                  // Confirm Registration Button (Logic Restored)
                  Center(
                    child: ElevatedButton(
                      onPressed: () async {
                        try {
                          await api.registerUser({
                            'EMAIL': email,
                            'NOME': nome,
                            'PASSWORD': password,
                            'ID_TIPO': 3,
                          });

                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text('Sucesso'),
                              content: Text('Usuário criado com sucesso!'),
                              actions: [
                                TextButton(
                                  onPressed: () {
                                    Navigator.pop(context);
                                    Navigator.pushReplacementNamed(context, '/');
                                  },
                                  child: Text('OK'),
                                ),
                              ],
                            ),
                          );
                        } catch (e) {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text('Erro'),
                              content: Text('Falha ao criar usuário.'),
                              actions: [
                                TextButton(
                                  onPressed: () => Navigator.pop(context),
                                  child: Text('OK'),
                                ),
                              ],
                            ),
                          );
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.grey[800],
                        padding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 50.0),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30.0),
                        ),
                      ),
                      child: Text("Confirmar Cadastro", style: TextStyle(color: Colors.white)),
                    ),
                  ),
                  SizedBox(height: 20.0),

                  // Back to Login Button
                  Center(
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.pushReplacementNamed(context, '/');
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.grey[800],
                        padding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 50.0),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30.0),
                        ),
                      ),
                      child: Text("Voltar", style: TextStyle(color: Colors.white)),
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
