// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import '../api/api_service.dart';

class PerfilPasswordScreen extends StatefulWidget {
  final int userId;

  const PerfilPasswordScreen({Key? key, required this.userId}) : super(key: key);

  @override
  State<PerfilPasswordScreen> createState() => _PerfilPasswordScreenState();
}

class _PerfilPasswordScreenState extends State<PerfilPasswordScreen> {
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');

  Future<void> _updatePassword() async {
    if (_passwordController.text != _confirmPasswordController.text) {
      _showErrorDialog("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      await api.editUser(widget.userId, {"PASSWORD": _passwordController.text});
      _showSuccessDialog("Sucesso", "Senha alterada com sucesso!");
    } catch (e) {
      _showErrorDialog("Erro", "Falha ao alterar a senha.");
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
            onPressed: () => Navigator.of(context).pop(),
            child: const Text("OK"),
          ),
        ],
      ),
    );
  }

  void _showSuccessDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.of(context).pop();
            },
            child: const Text("OK"),
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
        backgroundColor: Colors.black,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text("Alterar Senha", style: TextStyle(color: Colors.white)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            CircleAvatar(
              radius: 40,
              backgroundColor: Colors.grey[700],
              child: Icon(Icons.person, color: Colors.white, size: 40),
            ),
            SizedBox(height: 16),
            TextField(
              controller: _passwordController,
              obscureText: true,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: "Nova Senha",
                labelStyle: TextStyle(color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[800],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
            SizedBox(height: 16),
            TextField(
              controller: _confirmPasswordController,
              obscureText: true,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: "Confirmar Senha",
                labelStyle: TextStyle(color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[800],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
            Spacer(),
            ElevatedButton(
              onPressed: _updatePassword,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                padding: EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              child: Text("CONFIRMAR", style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }
}
