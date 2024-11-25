import 'package:flutter/material.dart';

class HamburgerMenu extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width, // Makes the drawer fill the screen horizontally
      child: Drawer(
        child: Container(
          color: Color(0xFF333333), // Dark gray background color
          child: Column(
            children: [
              // Hamburger Icon Header
              Container(
                padding: EdgeInsets.only(top: 40, left: 16), // Add padding from the top
                alignment: Alignment.centerLeft,
                child: GestureDetector(
                  onTap: () {
                    Navigator.pop(context); // Close the drawer
                  },
                  child: Icon(Icons.menu, color: Colors.white, size: 28),
                ),
              ),

              // Vertically Centered Menu Items
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center, // Center items vertically
                  children: [
                    _buildDividerBigger(),
                    _buildMenuItem(context, "HOME", '/home'),
                    _buildDivider(),
                    _buildMenuItem(context, "RELATÓRIO", '/relatorio'),
                    _buildDivider(),
                    _buildMenuItem(context, "HISTÓRICO", '/historico'),
                    _buildDivider(),
                    _buildMenuItem(context, "CALENDÁRIO", '/calendar'),
                    _buildDivider(),
                    _buildMenuItem(context, "PERFIL", '/perfil'),
                    _buildDividerBigger(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Helper to Build Menu Items
  Widget _buildMenuItem(BuildContext context, String title, String routeName) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0), // Add spacing between items
      child: ListTile(
        title: Center(
          child: Text(
            title,
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
        onTap: () {
          Navigator.pop(context); // Close the drawer
          Navigator.pushNamed(context, routeName); // Navigate to the respective page
        },
      ),
    );
  }

  Widget _buildDivider() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 60.0), // Add padding to the sides
      child: Divider(
        color: Colors.grey,
        thickness: 0.3, // Adjust thickness if needed
      ),
    );
  }

  Widget _buildDividerBigger() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 25.0), // Add padding to the sides
      child: Divider(
        color: Colors.grey,
        thickness: 2, // Adjust thickness if needed
      ),
    );
  }
}
