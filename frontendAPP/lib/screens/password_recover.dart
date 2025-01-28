import 'package:flutter/material.dart';
import '../api/api_service.dart';

class PasswordRecoverScreen extends StatefulWidget {
  const PasswordRecoverScreen({Key? key}) : super(key: key);

  @override
  _PasswordRecoverScreenState createState() => _PasswordRecoverScreenState();
}

class _PasswordRecoverScreenState extends State<PasswordRecoverScreen> {
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');
  final TextEditingController _emailController = TextEditingController();
  bool isLoading = false;

  Future<void> _sendRecoveryEmail() async {
    try {
      setState(() => isLoading = true);
      await api.sendRecoveryEmail(_emailController.text.trim());
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
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: const Text('Recuperar Senha'),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _emailController,
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: 'E-mail',
                labelStyle: const TextStyle(color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[800],
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: isLoading ? null : _sendRecoveryEmail,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              child: isLoading
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text('Enviar Recuperação', style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }
}
