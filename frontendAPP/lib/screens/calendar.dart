import 'package:flutter/material.dart';
import '../api/api_service.dart';
import 'hamburger_menu.dart';

class CalendarScreen extends StatefulWidget {
  final int userId;
  const CalendarScreen({Key? key, required this.userId}) : super(key: key);

  @override
  _CalendarScreenState createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');
  List<dynamic> eventos = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData({String? escalao}) async {
    try {
      setState(() => isLoading = true);
      List<dynamic> response;
      if (escalao == null) {
        response = await api.listEventosByUser(widget.userId);
      } else {
        response = await api.getFilteredEventosByEscalao(widget.userId, escalao);
      }
      setState(() {
        eventos = response;
        isLoading = false;
      });
    } catch (e) {
      setState(() => isLoading = false);
      _showErrorDialog('Erro', 'Não foi possível carregar os eventos.');
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
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  Widget _filterButton(String label, String? escalaoFilter) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: ElevatedButton(
        onPressed: () => _fetchData(escalao: escalaoFilter),
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.grey[900],
        ),
        child: Text(label, style: const TextStyle(color: Colors.white)),
      ),
    );
  }

  Widget _eventoCard(dynamic evento) {
    return Card(
      color: Colors.grey[800],
      margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 16),
      child: ListTile(
        title: Text(
          "${evento['EQUIPA_CASA']}  vs  ${evento['VISITANTE']}",
          style: const TextStyle(color: Colors.white),
        ),
        subtitle: Text(
          "${evento['DATA']} às ${evento['HORA']} - ${evento['LOCAL']}",
          style: const TextStyle(color: Colors.grey),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
        elevation: 0,
        title: Row(
          children: [
            Builder(
              builder: (context) => IconButton(
                icon: const Icon(Icons.menu, color: Colors.white),
                onPressed: () {
                  Scaffold.of(context).openDrawer(); // Open the custom drawer
                },
              ),
            ),
            const Spacer(),
            Image.asset(
              'assets/images/Logofinal1.png',
              height: 40,
            ),
          ],
        ),
      ),
      drawer: HamburgerMenu(userId: widget.userId),
      body: Column(
        children: [
          // Filters Section
          SizedBox(
            height: 40,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                _filterButton("Todos", null),
                _filterButton("Sub-10", "Sub-10"),
                _filterButton("Sub-11", "Sub-11"),
                _filterButton("Sub-12", "Sub-12"),
                _filterButton("Sub-13", "Sub-13"),
                _filterButton("Sub-14", "Sub-14"),
                _filterButton("Sub-16", "Sub-16"),
                _filterButton("Sub-19", "Sub-19"),
                _filterButton("Sub-23", "Sub-23"),
                _filterButton("Profissional", "Profissional"),
              ],
            ),
          ),
          const SizedBox(height: 10),
          // Events List
          Expanded(
            child: isLoading
                ? const Center(child: CircularProgressIndicator())
                : eventos.isEmpty
                    ? const Center(
                        child: Text(
                          'Não existem eventos para o filtro selecionado',
                          style: TextStyle(color: Colors.white),
                        ),
                      )
                    : ListView.builder(
                        itemCount: eventos.length,
                        itemBuilder: (context, index) {
                          return _eventoCard(eventos[index]);
                        },
                      ),
          ),
        ],
      ),
      bottomNavigationBar: Stack(
        alignment: Alignment.bottomCenter,
        children: [
          // Shadow Rectangle for Depth
          Positioned(
            bottom: 16,
            left: 16,
            right: 16,
            child: Container(
              height: 70,
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 36, 36, 36),
                borderRadius: BorderRadius.circular(16),
              ),
            ),
          ),
          // Bottom Navigation Bar
          Container(
            margin: const EdgeInsets.fromLTRB(16, 16, 16, 24),
            height: 64,
            decoration: BoxDecoration(
              color: const Color.fromARGB(255, 77, 77, 77),
              borderRadius: BorderRadius.circular(16),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  // Calendar Button
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        '/calendar',
                        arguments: {'userId': widget.userId},
                      );
                    },
                    child: _bottomNavBarButton(Icons.calendar_today, true),
                  ),
                  // Soccer Button
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        '/home',
                        arguments: {'userId': widget.userId},
                      );
                    },
                    child: _bottomNavBarButton(Icons.sports_soccer, false),
                  ),
                  // History Button
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        '/historico',
                        arguments: {'userId': widget.userId},
                      );
                    },
                    child: _bottomNavBarButton(Icons.history, false),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _bottomNavBarButton(IconData icon, bool isSelected) {
    return Stack(
      alignment: Alignment.center,
      children: [
        Container(
          height: double.infinity,
          width: 80,
          decoration: BoxDecoration(
            color: isSelected ? Colors.grey[600] : Colors.transparent,
            borderRadius: BorderRadius.circular(16),
          ),
        ),
        Icon(
          icon,
          color: isSelected ? Colors.white : Colors.grey,
          size: 34,
        ),
      ],
    );
  }
}
