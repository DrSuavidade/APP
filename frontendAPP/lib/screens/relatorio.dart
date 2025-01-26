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
  late int idRelatorio, idUser;
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
    idUser = args['id_user'];
    _fetchPlayerInfo();
  }

  Future<void> _fetchPlayerInfo() async {
    try {
      final playerResponse = await api.getJogadorById(idRelatorio);
      setState(() {
        playerInfo = playerResponse;
      });
    } catch (e) {
      _showErrorDialog('Erro', 'Falha ao carregar as informações do jogador');
    }
  }

  Future<void> _saveRelatorio() async {
    try {
      await api.put('relatorio/edit/$idRelatorio', {
        'TECNICA': tecnica ?? 0,
        'VELOCIDADE': velocidade ?? 0,
        'COMPETITIVA': atitudeCompetitiva ?? 0,
        'INTELIGENCIA': inteligencia ?? 0,
        'ALTURA': altura ?? '',
        'MORFOLOGIA': morfologia ?? '',
        'COMENTARIO': comentario ?? '',
        'DATA': DateTime.now().toIso8601String(),
        'STATUS': 'Avaliado',
      });
      Navigator.pop(context);
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
        title: Text('Confirmar Alterações'),
        content: Text('Tem certeza que deseja aplicar as alterações no relatório?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _saveRelatorio();
            },
            child: Text('Confirmar'),
          ),
        ],
      ),
    );
  }

  Widget _buildPlayerInfo() {
    if (playerInfo == null) {
      return Center(child: CircularProgressIndicator());
    }

    final nome = playerInfo!['NOME'];
    final dataNasc = playerInfo!['DATA_NASC'];
    final notaAdm = playerInfo!['NOTA_ADM'];

    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.grey[900],
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: Colors.grey[700],
            radius: 40,
            child: Icon(Icons.person, color: Colors.white, size: 40),
          ),
          SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'NOME: $nome',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.w300,
                  ),
                ),
                Text(
                  'IDADE: ${DateTime.now().year - DateTime.parse(dataNasc).year}',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.w300,
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  'NOTA: $notaAdm',
                  style: TextStyle(
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
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text(
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
            decoration: BoxDecoration(
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
                SizedBox(height: 20),
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
                SizedBox(height: 5),
                _buildOptionSection(
                  "MORFOLOGIA",
                  ["Hectomorfo", "Mesomorfo", "Endomorfo"],
                  morfologia,
                  (value) => setState(() => morfologia = value),
                ),
                SizedBox(height: 10),
                Stack(
                  children: [
                    Container(
                      height: 100,
                      decoration: BoxDecoration(
                        color: Colors.grey[900],
                      ),
                      padding: EdgeInsets.only(top: 20, left: 10, right: 10),
                      child: TextField(
                        controller: _comentarioController,
                        onChanged: (value) => comentario = value,
                        maxLines: null,
                        expands: true,
                        textAlignVertical: TextAlignVertical.bottom,
                        style: TextStyle(color: Colors.white, fontSize: 11),
                        decoration: InputDecoration(
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.zero,
                        ),
                      ),
                    ),
                    Positioned(
                      top: 5,
                      left: 10,
                      child: Text(
                        "COMENTÁRIO",
                        style: TextStyle(color: Colors.white, fontSize: 11),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 10),
                ElevatedButton(
                  onPressed: _showConfirmationDialog,
                  child: const Text("CONFIRMAR"),
                ),
                SizedBox(height: 20),
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
      padding: const EdgeInsets.only(left: 7),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: TextStyle(color: Colors.white, fontSize: 11)),
          Transform.translate(
            offset: Offset(-12, -5),
            child: Row(
              children: [
                ...List.generate(4, (index) {
                  return Padding(
                    padding: const EdgeInsets.only(right: 16),
                    child: IconButton(
                      iconSize: 15,
                      padding: EdgeInsets.zero,
                      constraints: BoxConstraints(),
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
                SizedBox(width: 10),
                Text(
                  "$currentValue/4",
                  style: TextStyle(color: Colors.white, fontSize: 11),
                ),
              ],
            ),
          ),
          SizedBox(height: 4),
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
          Text(label, style: TextStyle(color: Colors.white, fontSize: 11)),
          SizedBox(height: 10),
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
