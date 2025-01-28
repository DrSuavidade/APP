// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import '../api/api_service.dart';

class PerfilScreen extends StatelessWidget {
  final int userId; // Pass the logged-in user's ID
  final ApiService apiService = ApiService(baseUrl: 'http://localhost:3000/api');

  PerfilScreen({Key? key, required this.userId}) : super(key: key);

  void _deleteAccount(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Confirmar Exclusão"),
          content: Text("Tem certeza de que deseja apagar sua conta?"),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text("Cancelar"),
            ),
            TextButton(
              onPressed: () async {
                try {
                  await apiService.deleteUser(userId);
                  Navigator.of(context).pushNamedAndRemoveUntil('/', (route) => false);
                } catch (e) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text("Erro ao apagar a conta")),
                  );
                }
              },
              child: Text("Apagar", style: TextStyle(color: Colors.red)),
            ),
          ],
        );
      },
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
        title: Text("PERFIL", style: TextStyle(color: Colors.white)),
      ),
      body: FutureBuilder(
        future: apiService.getUserDetails(userId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text("Erro ao carregar perfil", style: TextStyle(color: Colors.red)));
          }

          final user = snapshot.data as Map<String, dynamic>;
          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                // Profile Picture and User Info
                CircleAvatar(
                  radius: 40,
                  backgroundColor: Colors.grey[700],
                  child: Icon(Icons.person, color: Colors.white, size: 40),
                ),
                SizedBox(height: 16),
                Text(
                  "NOME: ${user['NOME']}\nEMAIL: ${user['EMAIL']}",
                  style: TextStyle(color: Colors.white),
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 32),
                // Buttons Section
                _buildCustomButton(context, "ALTERAR PASSWORD", () => Navigator.pushNamed(
      context,
      '/perfil_password',
      arguments: {
        'userId': userId,
      },
    )),
                SizedBox(height: 10),
                _buildCustomButton(context, "ALTERAR EMAIL", () => Navigator.pushNamed(
      context,
      '/perfil_email',
      arguments: {
        'userId': userId,
      },
    )),
                SizedBox(height: 10),
                _buildCustomButton(context, "POLÍTICAS DE PRIVACIDADE", () => Navigator.pushNamed(context, '/privacidade')),
                Spacer(),
                // Logout Button
                ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                    padding: EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
                  ),
                  child: Text("TERMINAR SESSÃO", style: TextStyle(color: Colors.white, fontSize: 16)),
                ),
                SizedBox(height: 16),
                // Delete Account Link
                GestureDetector(
                  onTap: () => _deleteAccount(context),
                  child: Text(
                    "APAGAR CONTA?",
                    style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildCustomButton(BuildContext context, String label, VoidCallback onPressed) {
    return SizedBox(
      width: double.infinity,
      height: 50,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.grey[800],
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5),
          ),
        ),
        child: Align(
          alignment: Alignment.centerLeft,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              label,
              style: TextStyle(color: Colors.white, fontSize: 16),
            ),
          ),
        ),
      ),
    );
  }
}
