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
import 'screens/add_new_player.dart';
import 'screens/list_player.dart';
import 'screens/privacidade.dart';
import 'screens/password_recover.dart';
import 'screens/password_recover_confirm.dart';

void main() {
  runApp(const MyApp());
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
        '/home': (context) {
          final arguments = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return HomeScreen(
              userId:
                  arguments['userId']); // Pass userId (number) to HomeScreen
        },
        '/perfil': (context) {
          final arguments = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return PerfilScreen(userId: arguments['userId']);
        },
        '/perfil_email': (context) {
          final args = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return PerfilEmailScreen(userId: args['userId']);
        },
        '/perfil_password': (context) {
          final args = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return PerfilPasswordScreen(userId: args['userId']);
        },
        '/relatorio': (context) => const RelatorioScreen(),
        '/calendar': (context) {
          final arguments = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return CalendarScreen(userId: arguments['userId']);
        },
        '/historico': (context) {
          final arguments = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return HistoricoScreen(userId: arguments['userId']);
        },
        '/add_game': (context) {
          final arguments = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return AddGameScreen(userId: arguments['userId']);
        },
        '/list_player': (context) {
          final arguments = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return ListPlayerScreen(
            userId: arguments['userId'],
            idEvento: arguments['idEvento'],
          );
        },
        '/add_player': (context) {
          final arguments = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return AddPlayerScreen(
              userId: arguments['userId'], idEvento: arguments['idEvento']);
        },
        '/add_player_bd': (context) {
          final arguments = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return AddPlayerBDScreen(
              userId: arguments['userId'], idEvento: arguments['idEvento']);
        },
        '/add_new_player': (context) {
          final arguments = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return AddNewPlayerScreen(
              userId: arguments['userId'], idEvento: arguments['idEvento']);
        },
        '/privacidade': (context) => const PrivacidadeScreen(),
        '/password_recover': (context) => const PasswordRecoverScreen(),
        '/password_recover_confirm': (context) =>
            const PasswordRecoverConfirmScreen(),
      },
    );
  }
}
