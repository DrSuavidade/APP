// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import '../api/api_service.dart';

class PerfilScreen extends StatelessWidget {
  final int userId;
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
      extendBodyBehindAppBar: true, // Overlay app bar on background
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

          FutureBuilder(
            future: apiService.getUserDetails(userId),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(
                  child: Text(
                    "Erro ao carregar perfil",
                    style: TextStyle(color: Colors.red),
                  ),
                );
              }

              final user = snapshot.data as Map<String, dynamic>;
              return Column(
                children: [
                  SizedBox(height: 50), // Move content down slightly

                  // Profile Section
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 40,
                          backgroundColor: Colors.grey[700],
                          child: Icon(Icons.person, color: Colors.white, size: 40),
                        ),
                        SizedBox(height: 8),

                        // Name & Email
                        Text(
                          user['NOME'] ?? '',
                          style: TextStyle(color: Colors.white, fontSize: 16),
                        ),
                        Text(
                          user['EMAIL'] ?? '',
                          style: TextStyle(color: Colors.white60, fontSize: 14),
                        ),

                        SizedBox(height: 15),

                        Divider(color: Colors.grey[600], thickness: 1),
                      ],
                    ),
                  ),

                  // Buttons
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16.0),
                      child: Column(
                        children: [
                          _buildCustomButton(context, "ALTERAR PASSWORD", () {
                            Navigator.pushNamed(context, '/perfil_password', arguments: {'userId': userId});
                          }),
                          SizedBox(height: 10),

                          _buildCustomButton(context, "ALTERAR EMAIL", () {
                            Navigator.pushNamed(context, '/perfil_email', arguments: {'userId': userId});
                          }),
                          SizedBox(height: 10),

                          _buildCustomButton(context, "POLÍTICAS DE PRIVACIDADE", () {
                            Navigator.pushNamed(context, '/privacidade');
                          }),

                          Spacer(), // Push logout button to bottom

                          // Logout Button
                          SizedBox(
                            width: double.infinity,
                            height: 50,
                            child: ElevatedButton(
                              onPressed: () {
                                Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.red[800], // Match screenshot
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.zero),
                              ),
                              child: Text(
                                "TERMINAR SESSÃO",
                                style: TextStyle(color: Colors.white, fontSize: 16),
                              ),
                            ),
                          ),

                          SizedBox(height: 10),

                          // Delete Account
                          GestureDetector(
                            onTap: () => _deleteAccount(context),
                            child: Text(
                              "APAGAR CONTA?",
                              style: TextStyle(color: Colors.white70, fontSize: 14),
                            ),
                          ),
                          SizedBox(height: 20),
                        ],
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildCustomButton(BuildContext context, String label, VoidCallback onPressed) {
    return SizedBox(
      width: double.infinity,
      height: 50,
      child: TextButton(
        onPressed: onPressed,
        style: TextButton.styleFrom(
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
