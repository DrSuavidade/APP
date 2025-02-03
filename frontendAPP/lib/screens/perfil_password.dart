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
  String password = _passwordController.text.trim();
  String confirmPassword = _confirmPasswordController.text.trim();

  if (password.isEmpty || confirmPassword.isEmpty) {
    _showErrorDialog("Erro", "Os campos de senha não podem estar vazios.");
    return;
  }

  // Ensure password has at least one uppercase letter and one number
  if (!RegExp(r'^(?=.*[A-Z])(?=.*\d).{6,}$').hasMatch(password)) {
    _showErrorDialog("Erro", "A senha deve conter pelo menos uma letra maiúscula e um número.");
    return;
  }

  if (password != confirmPassword) {
    _showErrorDialog("Erro", "As senhas não coincidem.");
    return;
  }

  try {
    await api.editUser(widget.userId, {"PASSWORD": password});
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
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Stack(
        children: [
          // Background Image
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Padrao.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Column(
            children: [
              SizedBox(height: 50),
              Column(
      children: [
        CircleAvatar(radius: 40, backgroundColor: Colors.grey[700], child: Icon(Icons.person, color: Colors.white, size: 40)),
        SizedBox(height: 8),
        Divider(color: Colors.grey[600]),
      ],
    ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildInputLabel("NOVA PASSWORD"),
                    _buildTextField(_passwordController, isPassword: true),
                    SizedBox(height: 16),
                    _buildInputLabel("REPITA A PASSWORD"),
                    _buildTextField(_confirmPasswordController, isPassword: true),
                  ],
                ),
              ),
              Spacer(),
              _buildConfirmButton(_updatePassword),
            ],
          ),
        ],
      ),
    );
  }


  Widget _buildInputLabel(String label) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4.0),
      child: Text(label, style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
    );
  }

  Widget _buildTextField(TextEditingController controller, {bool isPassword = false}) {
    return TextField(
      controller: controller,
      obscureText: isPassword,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        filled: true,
        fillColor: Colors.grey[900],
        border: OutlineInputBorder(borderSide: BorderSide.none),
      ),
    );
  }

  Widget _buildConfirmButton(VoidCallback onPressed) {
    return SizedBox(
      width: double.infinity,
      height: 50,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(backgroundColor: Colors.green, shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero)),
        child: Text("CONFIRMAR", style: TextStyle(color: Colors.white, fontSize: 16)),
      ),
    );
  }
}
