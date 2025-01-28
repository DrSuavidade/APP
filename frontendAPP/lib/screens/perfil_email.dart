// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import '../api/api_service.dart';

class PerfilEmailScreen extends StatefulWidget {
  final int userId;

  const PerfilEmailScreen({Key? key, required this.userId}) : super(key: key);

  @override
  State<PerfilEmailScreen> createState() => _PerfilEmailScreenState();
}

class _PerfilEmailScreenState extends State<PerfilEmailScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _confirmEmailController = TextEditingController();
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');

  Future<void> _updateEmail() async {
    if (_emailController.text != _confirmEmailController.text) {
      _showErrorDialog("Erro", "Os emails não coincidem.");
      return;
    }

    try {
      await api.editUser(widget.userId, {"EMAIL": _emailController.text});
      _showSuccessDialog("Sucesso", "Email alterado com sucesso!");
    } catch (e) {
      _showErrorDialog("Erro", "Falha ao alterar o email.");
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
        title: Text("Alterar Email", style: TextStyle(color: Colors.white)),
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
              controller: _emailController,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: "Novo Email",
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
              controller: _confirmEmailController,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                labelText: "Confirmar Email",
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
              onPressed: _updateEmail,
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
