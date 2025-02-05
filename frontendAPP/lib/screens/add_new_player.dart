import 'package:flutter/material.dart';
import '../api/api_service.dart'; // Ensure API service is imported

class AddNewPlayerScreen extends StatefulWidget {
  final int userId;
  final int idEvento;

  const AddNewPlayerScreen(
      {Key? key, required this.userId, required this.idEvento})
      : super(key: key);

  @override
  _AddNewPlayerScreenState createState() => _AddNewPlayerScreenState();
}

class _AddNewPlayerScreenState extends State<AddNewPlayerScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _nationalityController = TextEditingController();
  final api = ApiService(baseUrl: 'http://10.0.2.2:3000/api');
  String? selectedGender;

  void _addPlayer() async {
  if (_nameController.text.isEmpty ||
      selectedGender == null) {
    _showErrorDialog("Erro", "Nome e Genero devem estar preenchidos.");
    return;
  }

  try {
    // Step 1: Create the new player
    final newPlayerResponse = await api.addJogador({
      "NOME": _nameController.text,
      "DATA_NASC": "2000-01-01T00:00:00.000Z", // Default placeholder date
      "GENERO": selectedGender,
      "LINK": "", // Placeholder
      "NACIONALIDADE": _nationalityController.text,
      "DADOS_ENC": "",
      "NOTA_ADM": 0,
      "STATUS": "Inactive"
    });

    if (newPlayerResponse == null || newPlayerResponse["jogador"] == null) {
      throw Exception("Falha ao criar jogador.");
    }

    int newPlayerId = newPlayerResponse["jogador"]["ID_JOGADORES"];

    // Step 2: Create relatorio for the new player
    await api.addRelatorio({
      "TECNICA": 0,
      "VELOCIDADE": 0,
      "COMPETITIVA": 0,
      "INTELIGENCIA": 0,
      "ALTURA": "null",
      "MORFOLOGIA": "null",
      "COMENTARIO": "null",
      "STATUS": "Ativo",
      "ID_USER": widget.userId,
      "ID_JOGADORES": newPlayerId,
      "ID_EVENTOS": widget.idEvento,
      "COMENTARIO_ADM": "null",
      "DATA": DateTime.now().toIso8601String(),
      "NOTA": 0,
    });

    _showSuccessDialog();
  } catch (e) {
    _showErrorDialog("Erro", "Falha ao criar jogador e relatório.");
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

  void _showSuccessDialog() {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text('Sucesso'),
      content: Text('Relatório criado com sucesso!'),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.pop(context); // Close dialog
            Navigator.pushNamedAndRemoveUntil(
              context,
              '/home',
              (route) => false, // Remove all previous routes
              arguments: {'userId': widget.userId}, // Pass userId
            );
          },
          child: const Text('OK'),
        ),
      ],
    ),
  );
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.transparent,
        elevation: 0,
        toolbarHeight: 50,
        title: Row(
          children: [
            IconButton(
              icon: const Icon(Icons.arrow_back, color: Colors.white),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            const Spacer(),
            Image.asset(
              'assets/images/Logofinal1.png',
              height: 40,
            ),
          ],
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

          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 20),

              // Title
              Center(
                child: Text(
                  "INFORMAÇÕES DO JOGADOR",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                  ),
                ),
              ),

              SizedBox(height: 15),

              // Profile Picture on Top Left
              Padding(
                padding: const EdgeInsets.only(left: 20),
                child: Container(
                  width: 60,
                  height: 60,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white.withOpacity(0.2),
                  ),
                  child: Icon(Icons.person, color: Colors.white, size: 30),
                ),
              ),

              // 🔹 White Line (Divider)
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Divider(
                  color: Colors.white, // White line
                  thickness: 1, // Thin but visible
                ),
              ), // Spacing before input fields

              // Nome Field
              _buildTextField("Nome", _nameController),

              // Gênero Dropdown
              _buildDropdown("Gênero", ["Masculino", "Feminino", "Outro"]),

              // Nacionalidade Field
              _buildTextField("Nacionalidade", _nationalityController),

              Spacer(),

              // Add Player Button
              Center(
                child: SizedBox(
                  width: 200,
                  child: ElevatedButton(
                    onPressed: () {
                      _addPlayer();
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.grey[700],
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    child: const Text(
                      'ADICIONAR',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ),
              ),

              SizedBox(height: 3), // Push the button down
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTextField(String label, TextEditingController controller) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(color: Colors.white, fontSize: 12)),
          SizedBox(height: 4),
          Container(
            height: 35, // Shorter height
            padding: EdgeInsets.symmetric(horizontal: 12),
            decoration: BoxDecoration(
              color: Colors.grey[800], // Gray background
              borderRadius: BorderRadius.circular(8),
            ),
            child: TextField(
              controller: controller,
              style: TextStyle(color: Colors.white, fontSize: 13),
              decoration: InputDecoration(
                border: InputBorder.none,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDropdown(String label, List<String> options) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(color: Colors.white, fontSize: 12)),
          SizedBox(height: 4),
          Container(
            height: 35, // Shorter height
            padding: EdgeInsets.symmetric(horizontal: 12),
            decoration: BoxDecoration(
              color: Colors.grey[800], // Gray background
              borderRadius: BorderRadius.circular(8),
            ),
            child: DropdownButton<String>(
              dropdownColor: Colors.black,
              value: selectedGender,
              isExpanded: true,
              icon: Icon(Icons.arrow_drop_down, color: Colors.white),
              underline: SizedBox(),
              style: TextStyle(color: Colors.white, fontSize: 13),
              onChanged: (String? newValue) {
                setState(() {
                  selectedGender = newValue;
                });
              },
              items: options.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}
