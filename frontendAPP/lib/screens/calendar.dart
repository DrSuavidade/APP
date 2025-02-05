import 'package:flutter/material.dart';
import '../api/api_service.dart';
import 'hamburger_menu.dart';

class CalendarScreen extends StatefulWidget {
  final int userId;
  const CalendarScreen({super.key, required this.userId});

  @override
  CalendarScreenState createState() => CalendarScreenState();
}

class CalendarScreenState extends State<CalendarScreen> {
  final ApiService api = ApiService(baseUrl: 'http://10.0.2.2:3000/api');
  List<dynamic> eventos = [];
  bool isLoading = true;
  String? selectedEscalao;

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData({String? escalao}) async {
    try {
      setState(() {
        isLoading = true;
        selectedEscalao = escalao;
      });

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
    bool isSelected = selectedEscalao == escalaoFilter;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 0.0),
      child: TextButton(
        onPressed: () => _fetchData(escalao: escalaoFilter),
        style: TextButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 0, vertical: 0),
          foregroundColor: isSelected ? Colors.white : Colors.grey[500], // Text color only
        ),
        child: Text(label, style: const TextStyle(fontSize: 10)),
      ),
    );
  }

  Widget _eventoCard(dynamic evento) {
  return GestureDetector(
    onTap: () {
      Navigator.pushNamed(
        context,
        '/list_player',
        arguments: {
          'userId': widget.userId,
          'idEvento': evento['ID_EVENTOS'],
        },
      );
    },
    child: Container(
      margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.grey[600], // Light grey background
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(
            "${evento['EQUIPA_CASA']}  vs  ${evento['VISITANTE']}",
            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 4),
          Text(
            "${evento['DATA']} às ${evento['HORA']} - ${evento['LOCAL']}",
            style: const TextStyle(color: Colors.white70, fontSize: 12),
          ),
        ],
      ),
    ),
  );
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true, // Makes app bar overlay background
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.transparent, // Transparent top bar
        elevation: 0,
        toolbarHeight: 50,
        title: Row(
          children: [
            Builder(
              builder: (context) => IconButton(
                icon: const Icon(Icons.menu, color: Colors.white),
                onPressed: () {
                  Scaffold.of(context).openDrawer();
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
      body: Stack(
        children: [
          // Background Image
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Padrao.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Column(
            children: [
              const SizedBox(height: 50), // Adjusted to move content up
              // Filters Section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 0),
                child: Wrap(
                  alignment: WrapAlignment.center,
                  spacing: 2, // Horizontal spacing
                  runSpacing: -10, // Vertical spacing
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
              const SizedBox(height: 5), // Reduced spacing
              const Text(
                        "PRÓXIMAS PARTIDAS",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 2),

              // Event List in Smaller Grey Box
              Expanded(
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 5), // Adjusted to move up
                  padding: const EdgeInsets.symmetric(vertical: 0, horizontal: 12),
                  decoration: BoxDecoration(
                    color: Colors.grey[800], // Grey background
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // "PRÓXIMAS PARTIDAS" as plain text

                      // List of Events
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
                ),
              ),
              const SizedBox(height: 100),
            ],
          ),
          // Bottom Navigation Bar inside the Stack (fixes white background issue)
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              margin: const EdgeInsets.fromLTRB(16, 16, 16, 24),
              height: 64,
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 77, 77, 77),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _bottomNavButton(Icons.calendar_today, '/calendar', 0, selected: true),
                  _bottomNavButton(Icons.sports_soccer, '/home', 1),
                  _bottomNavButton(Icons.history, '/historico', 2),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _bottomNavButton(IconData icon, String route, int index, {bool selected = false}) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, route, arguments: {'userId': widget.userId});
      },
      child: Container(
        width: 80,
        height: double.infinity,
        decoration: BoxDecoration(
          color: selected ? Colors.grey[600] : Colors.transparent,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Icon(
          icon,
          color: selected ? Colors.white : Colors.grey,
          size: 34,
        ),
      ),
    );
  }
}
