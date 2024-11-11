import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF120F0F), // Cor de fundo escura
      body: Center(
        child: Container(
          width: 360,
          padding: EdgeInsets.symmetric(horizontal: 36), // Espaçamento similar ao screenshot
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              // Widget para a imagem centrada
              Center(
                
                child: Image.asset(
                  'assets/images/Logofinal1.png', // Garanta que tem essa imagem nos assets
                  width: 200, // Defina a largura conforme necessário
                  height: 100, // Defina a altura conforme necessário
                ),
              ),
              SizedBox(height: 48),
              Text(
                'Bem vindo de volta!',
                style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 40),
              TextField(
                decoration: InputDecoration(
                  filled: true,
                  fillColor: Colors.white,
                  hintText: 'Email',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
              SizedBox(height: 16),
              TextField(
                decoration: InputDecoration(
                  filled: true,
                  fillColor: Colors.white,
                  hintText: 'Password',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: BorderSide.none,
                  ),
                ),
                obscureText: true,
              ),
              SizedBox(height: 32),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.pink[800], // Cor rosa escura para o botão
                  minimumSize: Size(double.infinity, 50), // Torna o botão largo
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                onPressed: () {},
                child: Text('Log in'),
              ),
              TextButton(
                onPressed: () {},
                child: Text(
                  'Não te lembras da password?',
                  style: TextStyle(color: Colors.grey[300]),
                ),
              ),
              SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    'Não tens conta? ',
                    style: TextStyle(color: Colors.white),
                  ),
                  GestureDetector(
                    onTap: () {},
                    child: Text(
                      'Registrar',
                      style: TextStyle(
                        color: Colors.pink[300], // Cor rosa clara para o link de registro
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
