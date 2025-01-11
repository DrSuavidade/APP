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
import 'package:mongo.dart/mongo_dart.dart';


void main() async {
    runApp(MyApp());
  // Substitua pela sua string de conexão
  final db = Db('mongodb+srv://Admin:egNRjxkxZBa74nVl@cluster0.6tsv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  try {
    await db.open();
    print('Conexão estabelecida com sucesso!');
  } catch (e) {
    print('Erro ao conectar: $e');
  } finally {
    await db.close();
  }
}


class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginScreen(),
        '/signup_email': (context) => SignupEmailScreen(),
        '/signup_name': (context) => SignupNameScreen(),
        '/signup_password': (context) => SignupPasswordScreen(),
        '/signup_complete': (context) => const SignupCompleteScreen(),
        '/home': (context) => const HomeScreen(),
        '/perfil': (context) => const PerfilScreen(),
        '/perfil_email': (context) => PerfilEmailScreen(),
        '/perfil_password': (context) => PerfilPasswordScreen(),
        '/relatorio': (context) => const RelatorioScreen(),
        '/calendar': (context) =>  CalendarScreen(),
        '/historico': (context) =>  HistoricoScreen(),
        '/add_game': (context) => AddGameScreen(),
        '/add_player': (context) =>  AddPlayerScreen(),
        '/add_player_bd': (context) =>  AddPlayerBDScreen(),
        '/add_player_name': (context) => const AddPlayerNameScreen(),
        '/privacidade': (context) => const PrivacidadeScreen(),
        '/password_recover': (context) => PasswordRecoverScreen(),
        '/password_recover_confirm': (context) => const PasswordRecoverConfirmScreen(),
      },
    );
  }
}
