import 'package:flutter/material.dart';

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
  String? selectedGender;

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

              SizedBox(height: 30), // Push the button down
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

  void _addPlayer() {
    if (_nameController.text.isEmpty ||
        selectedGender == null ||
        _nationalityController.text.isEmpty) {
      _showErrorDialog("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    // Simulating API call
    print(
        "✅ Adicionando jogador: Nome=${_nameController.text}, Gênero=$selectedGender, Nacionalidade=${_nationalityController.text}");

    // Navigate back
    Navigator.pop(context);
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
}
