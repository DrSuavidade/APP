import 'package:flutter/material.dart';
import '../api/api_service.dart';

class RelatorioScreen extends StatefulWidget {
  const RelatorioScreen({super.key});

  @override
  RelatorioPageState createState() => RelatorioPageState();
}

class RelatorioPageState extends State<RelatorioScreen> {
  final ApiService api = ApiService(baseUrl: 'http://10.0.2.2:3000/api');
  int? tecnica, velocidade, atitudeCompetitiva, inteligencia;
  String? altura, morfologia, comentario;
  late int idRelatorio, idJogador, idUser;
  late TextEditingController _comentarioController;

  Map<String, dynamic>? playerInfo;

  @override
  void initState() {
    super.initState();
    _comentarioController = TextEditingController(text: comentario);
  }

  @override
  void dispose() {
    _comentarioController.dispose();
    super.dispose();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final args =
        ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    idRelatorio = args['id_relatorio'];
    idJogador = args['id_jogador'];
    idUser = args['id_user'];
    _fetchPlayerInfo();
  }

  Future<void> _fetchPlayerInfo() async {
    try {
      final playerResponse = await api.getJogadorById(idJogador);
      setState(() {
        playerInfo = playerResponse;
      });
    } catch (e) {
      _showErrorDialog('Erro', 'Falha ao carregar as informações do jogador');
    }
  }

  Future<void> _saveRelatorio() async {
  if (tecnica == null || velocidade == null || atitudeCompetitiva == null || inteligencia == null ||
      altura == null || morfologia == null) {
    _showErrorDialog('Erro', 'Todos os campos devem ser preenchidos, exceto Comentário.');
    return;
  }

  try {
    await api.put('relatorio/edit/$idRelatorio', {
      'TECNICA': tecnica,
      'VELOCIDADE': velocidade,
      'COMPETITIVA': atitudeCompetitiva,
      'INTELIGENCIA': inteligencia,
      'ALTURA': altura,
      'MORFOLOGIA': morfologia,
      'COMENTARIO': comentario ?? '', // Only comentario can be empty
      'DATA': DateTime.now().toIso8601String(),
      'STATUS': 'Avaliado',
    });

    if (!mounted) return;

    Navigator.pushNamedAndRemoveUntil(
      context,
      '/home',
      (route) => false,
      arguments: {
        'userId': idUser, // Pass userId to Home
      },
    );
  } catch (e) {
    _showErrorDialog('Erro', 'Falha ao salvar o relatório');
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

  void _showConfirmationDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmar Alterações'),
        content: const Text('Tem certeza que deseja aplicar as alterações no relatório?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _saveRelatorio();
            },
            child: const Text('Confirmar'),
          ),
        ],
      ),
    );
  }

  Widget _buildPlayerInfo() {
    if (playerInfo == null) {
      return const Center(child: CircularProgressIndicator());
    }

    final nome = playerInfo!['NOME'];
    final dataNasc = playerInfo!['DATA_NASC'];
    final notaAdm = playerInfo!['NOTA_ADM'];

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.grey[900],
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: Colors.grey[700],
            radius: 40,
            child: const Icon(Icons.person, color: Colors.white, size: 40),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'NOME: $nome',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.w300,
                  ),
                ),
                Text(
                  'IDADE: ${DateTime.now().year - DateTime.parse(dataNasc).year}',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.w300,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'NOTA: $notaAdm',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ],
            ),
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
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: const Text(
          "RELATÓRIO DO JOGADOR",
          style: TextStyle(
            color: Colors.white,
            fontSize: 12,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Stack(
        children: [
          Container(
            width: double.infinity,
            height: double.infinity,
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Padrao.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: ListView(
              children: [
                _buildPlayerInfo(),
                const SizedBox(height: 20),
                _buildRatingSection("TÉCNICA", tecnica ?? 0,
                    (value) => setState(() => tecnica = value)),
                _buildRatingSection("VELOCIDADE", velocidade ?? 0,
                    (value) => setState(() => velocidade = value)),
                _buildRatingSection(
                  "ATITUDE COMPETITIVA",
                  atitudeCompetitiva ?? 0,
                  (value) => setState(() => atitudeCompetitiva = value),
                ),
                _buildRatingSection("INTELIGÊNCIA", inteligencia ?? 0,
                    (value) => setState(() => inteligencia = value)),
                _buildOptionSection("ALTURA", ["Baixo", "Médio", "Alto"],
                    altura, (value) => setState(() => altura = value)),
                const SizedBox(height: 5),
                _buildOptionSection(
                  "MORFOLOGIA",
                  ["Hectomorfo", "Mesomorfo", "Endomorfo"],
                  morfologia,
                  (value) => setState(() => morfologia = value),
                ),
                const SizedBox(height: 10),
                Stack(
                  children: [
                    Container(
                      height: 100,
                      decoration: BoxDecoration(
                        color: Colors.grey[900],
                      ),
                      padding: const EdgeInsets.only(top: 20, left: 10, right: 10),
                      child: TextField(
                        controller: _comentarioController,
                        onChanged: (value) => comentario = value,
                        maxLines: null,
                        expands: true,
                        textAlignVertical: TextAlignVertical.bottom,
                        style: const TextStyle(color: Colors.white, fontSize: 11),
                        decoration: const InputDecoration(
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.zero,
                        ),
                      ),
                    ),
                    const Positioned(
                      top: 5,
                      left: 10,
                      child: Text(
                        "COMENTÁRIO",
                        style: TextStyle(color: Colors.white, fontSize: 11),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                ElevatedButton(
                  onPressed: _showConfirmationDialog,
                  child: const Text("CONFIRMAR"),
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRatingSection(
    String label, int currentValue, Function(int) onChanged) {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 0), // Adds uniform side padding
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.center, // Center text label
      children: [
        // Centered Label
        Align(
          alignment: Alignment.center,
          child: Text(
            label,
            style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold),
          ),
        ),
        const SizedBox(height: 6),

        // Rating Row
        SizedBox(
          width: double.infinity, // Ensures full width
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center, // Center the row
            children: [
              ...List.generate(4, (index) {
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8), // Space between circles
                  child: IconButton(
                    iconSize: 18, // Increased size
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                    icon: Icon(
                      Icons.circle,
                      color: index + 1 <= currentValue ? Colors.green : Colors.grey,
                    ),
                    onPressed: () => onChanged(index + 1),
                  ),
                );
              }),

              // Rating Value (Right-aligned)
              const SizedBox(width: 12),
              Text(
                "$currentValue/4",
                style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
        const SizedBox(height: 6), // Extra spacing between sections
      ],
    ),
  );
}


  Widget _buildOptionSection(String label, List<String> options,
      String? selectedValue, Function(String) onChanged) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(color: Colors.grey[900]),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(color: Colors.white, fontSize: 11)),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: options.map((option) {
              return Expanded(
                child: GestureDetector(
                  onTap: () => onChanged(option),
                  child: Text(
                    option,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: selectedValue == option
                          ? Colors.white
                          : Colors.grey,
                      fontSize: 12,
                      fontWeight: selectedValue == option
                          ? FontWeight.bold
                          : FontWeight.normal,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
