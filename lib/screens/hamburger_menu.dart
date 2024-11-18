import 'package:flutter/material.dart';

void openHamburgerMenu(BuildContext context) {
  showModalBottomSheet(
    context: context,
    backgroundColor: Colors.grey[900],
    builder: (BuildContext context) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ListTile(
            title: Text("HOME", style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pushNamed(context, '/home');
            },
          ),
          Divider(color: Colors.grey),
          ListTile(
            title: Text("RELATORIO", style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pushNamed(context, '/relatorio');
            },
          ),
          Divider(color: Colors.grey),
          ListTile(
            title: Text("HISTÓRICO", style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pushNamed(context, '/historico');
            },
          ),
          Divider(color: Colors.grey),
          ListTile(
            title: Text("PRÓXIMOS JOGOS", style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pushNamed(context, '/calendar');
            },
          ),
          Divider(color: Colors.grey),
          ListTile(
            title: Text("PERFIL", style: TextStyle(color: Colors.white)),
            onTap: () {
              Navigator.pushNamed(context, '/perfil');
            },
          ),
        ],
      );
    },
  );
}
