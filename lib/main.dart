import 'package:flutter/material.dart';
import 'screens/login.dart';
import 'screens/signup_email.dart';
import 'screens/signup_name.dart';
import 'screens/signup_password.dart';
import 'screens/signup_complete.dart';
import 'screens/home.dart';
import 'screens/perfil.dart';
import 'screens/perfil_email.dart';
import 'screens/perfil_password.dart';
import 'screens/relatorio.dart';
import 'screens/calendar.dart';
import 'screens/historico.dart';
import 'screens/add_game.dart';
import 'screens/add_player.dart';
import 'screens/add_player_bd.dart';
import 'screens/add_player_name.dart';
import 'screens/privacidade.dart';
import 'screens/password_recover.dart';
import 'screens/password_recover_confirm.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (context) => LoginPage(),
        '/signup_email': (context) => SignupEmailScreen(),
        '/signup_name': (context) => SignupNameScreen(),
        '/signup_password': (context) => SignupPasswordScreen(),
        '/signup_complete': (context) => SignupCompleteScreen(),
        '/home': (context) => HomeScreen(),
        '/perfil': (context) => PerfilScreen(),
        '/perfil_email': (context) => PerfilEmailScreen(),
        '/perfil_password': (context) => PerfilPasswordScreen(),
        '/relatorio': (context) => RelatorioScreen(),
        '/calendar': (context) => CalendarScreen(),
        '/historico': (context) => HistoricoScreen(),
        '/add_game': (context) => AddGameScreen(),
        '/add_player': (context) => AddPlayerScreen(),
        '/add_player_bd': (context) => AddPlayerBDScreen(),
        '/add_player_name': (context) => AddPlayerNameScreen(),
        '/privacidade': (context) => PrivacidadeScreen(),
        '/password_recover': (context) => PasswordRecoverScreen(),
        '/password_recover_confirm': (context) => PasswordRecoverConfirmScreen(),
      },
    );
  }
}
