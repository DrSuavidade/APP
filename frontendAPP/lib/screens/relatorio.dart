// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import '../api/api_service.dart';

class RelatorioScreen extends StatefulWidget {
  const RelatorioScreen({Key? key}) : super(key: key);

  @override
  _RelatorioPageState createState() => _RelatorioPageState();
}

class _RelatorioPageState extends State<RelatorioScreen> {
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');
  int? tecnica, velocidade, atitudeCompetitiva, inteligencia;
  String? altura, morfologia, comentario;
  late int idJogadores, idUser;

  Map<String, dynamic>? playerInfo;
  Map<String, dynamic>? relatorioInfo;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final args =
        ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    idJogadores = args['id_jogadores'];
    idUser = args['id_user'];
    _fetchData();
  }

  Future<void> _fetchData() async {
    try {
      // Fetch player info
      final playerResponse = await api.get('jogador/list/$idJogadores');
      // Fetch relatorio info
      final relatorioResponse = await api
          .get('relatorio/get?id_jogadores=$idJogadores&id_user=$idUser');

      if (relatorioResponse is Map<String, dynamic>) {
      setState(() {
        playerInfo = playerResponse;
        relatorioInfo = relatorioResponse;

        // Initialize form fields with fetched relatorio data
        tecnica = relatorioInfo?['tecnica'];
        velocidade = relatorioInfo?['velocidade'];
        atitudeCompetitiva = relatorioInfo?['competitiva'];
        inteligencia = relatorioInfo?['inteligencia'];
        altura = relatorioInfo?['altura'];
        morfologia = relatorioInfo?['morfologia'];
        comentario = relatorioInfo?['comentario'];
      });
    } else {
      throw Exception('Invalid API response format');
    }
  } catch (e) {
    _showErrorDialog('Error', e.toString());
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

  Future<void> _updateRelatorio() async {
    try {
      await api.put('relatorio/edit/app/${relatorioInfo!['id_relatorios']}', {
        'tecnica': tecnica,
        'velocidade': velocidade,
        'competitiva': atitudeCompetitiva,
        'inteligencia': inteligencia,
        'altura': altura,
        'morfologia': morfologia,
        'comentario': comentario,
        'data': DateTime.now().toIso8601String(),
      });
      Navigator.pop(context);
    } catch (e) {
      _showErrorDialog('Error', 'Failed to update relatorio');
    }
  }

  @override
  Widget build(BuildContext context) {
    if (playerInfo == null || relatorioInfo == null) {
      return Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true, // Center the title
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text(
          "INFORMAÇÕES DO JOGADOR",
          style: TextStyle(
            color: Colors.white,
            fontSize: 10,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      body: Stack(
        children: [
          // Background Image
          Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              image: DecorationImage(
                image:
                    AssetImage('assets/images/Padrao.png'), // Background image
                fit: BoxFit.cover, // Cover the full screen
              ),
            ),
          ),
          // Existing content
          Padding(
            padding: const EdgeInsets.only(left: 0, right: 0),
            child: ListView(
              children: [
                // Transparent Container for Player Info
                Container(
                  padding: EdgeInsets.only(left: 20, right: 20),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      CircleAvatar(
                        radius: 40,
                        backgroundColor: Colors.grey[800],
                        child:
                            Icon(Icons.person, color: Colors.white, size: 40),
                      ),
                      SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'NOME: ${playerInfo!['nome']}',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w300),
                            ),
                            Text(
                              'IDADE: ${DateTime.now().year - DateTime.parse(playerInfo!['data_nasc']).year}',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w300),
                            ),
                            SizedBox(height: 8),
                            Text(
                              "AVALIAÇÃO - BOM",
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 12,
                                  fontWeight: FontWeight.w400),
                            ),
                            SizedBox(height: 8),
                            Row(
                              children: [
                                Icon(Icons.circle,
                                    color: Colors.green, size: 12),
                                SizedBox(width: 4),
                                Text(
                                  "3/4",
                                  style: TextStyle(color: Colors.green),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 4),
                _buildDivider(),
                SizedBox(height: 5),
                Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 10), // Add horizontal padding
                  child: Column(
                    children: [
                      // Independent Rating Sections
                      _buildRatingSection("TÉCNICA", tecnica ?? 0,
                          (value) => setState(() => tecnica = value)),
                      _buildRatingSection("VELOCIDADE", velocidade ?? 0,
                          (value) => setState(() => velocidade = value)),
                      _buildRatingSection(
                          "ATITUDE COMPETITIVA",
                          atitudeCompetitiva ?? 0,
                          (value) =>
                              setState(() => atitudeCompetitiva = value)),
                      _buildRatingSection("INTELIGÊNCIA", inteligencia ?? 0,
                          (value) => setState(() => inteligencia = value)),
                      // Altura Section
                      _buildOptionSection("ALTURA", ["Baixo", "Médio", "Alto"],
                          altura, (value) => setState(() => altura = value)),
                      SizedBox(height: 5),
                      // Morphology Section
                      _buildOptionSection(
                          "MORFOLOGIA",
                          ["Hectomorfo", "Mesomorfo", "Endomorfo"],
                          morfologia,
                          (value) => setState(() => morfologia = value)),
                      SizedBox(height: 5),
                      // Comment Section
                      Stack(
                        children: [
                          // Background box with text field
                          Container(
                            height: 100, // Adjust height as needed
                            decoration: BoxDecoration(
                              color: Colors.grey[
                                  900], // Match other widgets' background color
                            ),
                            padding: EdgeInsets.only(
                                top: 20,
                                left: 10,
                                right: 10), // Padding for the text field
                            child: TextField(
                              controller:
                                  TextEditingController(text: comentario),
                              onChanged: (value) =>
                                  setState(() => comentario = value),
                              maxLines: null, // Allow multiline input
                              expands: true, // Expand to fill the container
                              textAlignVertical: TextAlignVertical
                                  .bottom, // Align text to the bottom
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 11), // Text style
                              decoration: InputDecoration(
                                border: InputBorder.none, // Remove border
                                contentPadding: EdgeInsets
                                    .zero, // No extra padding for input text
                              ),
                            ),
                          ),
                          // "COMENTÁRIO" text at the top-left corner
                          Positioned(
                            top: 5, // Adjust vertical position
                            left: 10, // Adjust horizontal position
                            child: Text(
                              "COMENTÁRIO",
                              style:
                                  TextStyle(color: Colors.white, fontSize: 11),
                            ),
                          ),
                        ],
                      ),

                      // Confirm Button
                      SizedBox(height: 10),
                      ElevatedButton(
                        onPressed: () async {
                          if (relatorioInfo != null) {
                            try {
                              await api.editRelatorio(
                                relatorioInfo!['id_relatorios'].toString(),
                                {
                                  'tecnica': tecnica,
                                  'velocidade': velocidade,
                                  'competitiva': atitudeCompetitiva,
                                  'inteligencia': inteligencia,
                                  'altura': altura,
                                  'morfologia': morfologia,
                                  'comentario': comentario,
                                  'data': DateTime.now().toIso8601String(),
                                },
                              );
                              Navigator.pop(
                                  context); // Navigate back after success
                            } catch (e) {
                              _showErrorDialog(
                                  'Erro', 'Falha ao atualizar relatório');
                            }
                          }
                        },
                        child: const Text("CONFIRMAR"),
                      ),
                      SizedBox(height: 20),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Updated Rating Section for Independent Functionality
  Widget _buildRatingSection(
      String label, int currentValue, Function(int) onChanged) {
    return Padding(
      padding:
          const EdgeInsets.only(left: 7), // Align everything with left padding
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(color: Colors.white, fontSize: 11),
          ),
          Transform.translate(
            // Shift dots closer to the text
            offset: Offset(-12, -5), // Adjust the vertical offset as needed
            child: Row(
              mainAxisAlignment:
                  MainAxisAlignment.start, // Align items to the left
              children: [
                ...List.generate(4, (index) {
                  return Padding(
                    padding: const EdgeInsets.only(
                        right: 16), // Add spacing between dots
                    child: IconButton(
                      iconSize: 15, // Slightly smaller dots
                      padding: EdgeInsets
                          .zero, // Remove internal padding of the IconButton
                      constraints:
                          BoxConstraints(), // Remove constraints to make the buttons tighter
                      icon: Icon(
                        Icons.circle,
                        color: index + 1 <= currentValue
                            ? Colors.green
                            : Colors.grey,
                      ),
                      onPressed: () => onChanged(index + 1),
                    ),
                  );
                }),
                SizedBox(width: 10), // Add space between the dots and the text
                Text(
                  "$currentValue/4", // Show the current value dynamically
                  style: TextStyle(color: Colors.white, fontSize: 11),
                ),
              ],
            ),
          ),
          SizedBox(height: 4), // Keeps a small gap below for other sections
        ],
      ),
    );
  }

  // Updated Option Section to Handle Different Categories
  Widget _buildOptionSection(String label, List<String> options,
      String? selectedValue, Function(String) onChanged) {
    return Container(
      padding:
          const EdgeInsets.all(10), // Add some padding inside the container
      decoration: BoxDecoration(
        color: Colors.grey[900], // Background color of the container
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(color: Colors.white, fontSize: 11),
          ),
          SizedBox(height: 10), // Space between the label and options
          Row(
            mainAxisAlignment:
                MainAxisAlignment.spaceBetween, // Ensure equal spacing
            children: [
              Expanded(
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: GestureDetector(
                    onTap: () {
                      onChanged(options[0]); // Handle selection
                    },
                    child: Text(
                      options[0],
                      style: TextStyle(
                        color: selectedValue == options[0]
                            ? Colors.white
                            : const Color.fromARGB(255, 120, 120, 120),
                        fontSize: 12,
                        fontWeight: selectedValue == options[0]
                            ? FontWeight.bold
                            : FontWeight.normal,
                      ),
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Align(
                  alignment: Alignment.center,
                  child: GestureDetector(
                    onTap: () {
                      onChanged(options[1]); // Handle selection
                    },
                    child: Text(
                      options[1],
                      style: TextStyle(
                        color: selectedValue == options[1]
                            ? Colors.white
                            : const Color.fromARGB(255, 120, 120, 120),
                        fontSize: 12,
                        fontWeight: selectedValue == options[1]
                            ? FontWeight.bold
                            : FontWeight.normal,
                      ),
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Align(
                  alignment: Alignment.centerRight,
                  child: GestureDetector(
                    onTap: () {
                      onChanged(options[2]); // Handle selection
                    },
                    child: Text(
                      options[2],
                      style: TextStyle(
                        color: selectedValue == options[2]
                            ? Colors.white
                            : const Color.fromARGB(255, 120, 120, 120),
                        fontSize: 12,
                        fontWeight: selectedValue == options[2]
                            ? FontWeight.bold
                            : FontWeight.normal,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDivider() {
    return SizedBox(
      width: double.infinity, // Make the divider span the full width
      child: Divider(
        color: Colors.white,
        thickness: 1, // Adjust thickness if needed
      ),
    );
  }
}
