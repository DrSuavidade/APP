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
  String email = _emailController.text.trim();
  String confirmEmail = _confirmEmailController.text.trim();

  if (email.isEmpty || confirmEmail.isEmpty) {
    _showErrorDialog("Erro", "Os campos de e-mail não podem estar vazios.");
    return;
  }

  // Ensure email format is correct
  if (!email.contains('@') || !email.contains('.')) {
    _showErrorDialog("Erro", "O e-mail inserido não é válido. Insira um e-mail correto.");
    return;
  }

  if (email != confirmEmail) {
    _showErrorDialog("Erro", "Os emails não coincidem.");
    return;
  }

  try {
    await api.editUser(widget.userId, {"EMAIL": email});
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
                    _buildInputLabel("NOVO EMAIL"),
                    _buildTextField(_emailController),
                    SizedBox(height: 16),
                    _buildInputLabel("REPITA O EMAIL"),
                    _buildTextField(_confirmEmailController),
                  ],
                ),
              ),
              Spacer(),
              _buildConfirmButton(_updateEmail),
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

  Widget _buildTextField(TextEditingController controller) {
    return TextField(
      controller: controller,
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
