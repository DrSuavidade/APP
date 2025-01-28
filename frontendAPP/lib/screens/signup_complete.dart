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
                ElevatedButton(
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
                    backgroundColor: Colors.grey[900],
                    padding: EdgeInsets.symmetric(vertical: 14.0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                  ),
                  child: Text("Confirmar Cadastro", style: TextStyle(color: Colors.white)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
