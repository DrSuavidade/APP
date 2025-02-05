// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class PrivacidadeScreen extends StatelessWidget {
  const PrivacidadeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true, // Overlay app bar on background
      appBar: AppBar(
        backgroundColor: Colors.transparent, // Transparent top bar
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text("Política de Privacidade", style: TextStyle(color: Colors.white)),
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
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 60.0),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  // Title
                  Text(
                    "Política de Privacidade",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 10),

                  // Privacy Policy Content
                  Text(
                    """
A sua privacidade é importante para nós. É política do AV Scouts respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site AV Scouts, e outros sites que possuímos e operamos.

🔹 **Dados Pessoais Recolhidos**
- Nome e apelido
- Endereço de email
- Número de telemóvel
- Informações de pagamento (caso aplicável)
- Dados de autenticação (para criação de conta e login na aplicação)

🔹 **Informações Recolhidas Automaticamente**
- Dados de navegação, incluindo endereço IP, dispositivo utilizado, sistema operativo, e tipo de navegador.
- Informações sobre as preferências do utilizador na Aplicação (por exemplo, sessões assistidas, páginas visitadas).
- Dados de localização (caso o utilizador tenha autorizado o acesso).

🔹 **Finalidade do Tratamento dos Dados**
Utilizamos os dados pessoais dos utilizadores para as seguintes finalidades:
- Fornecimento e gestão de serviços da Aplicação, incluindo funcionalidades personalizadas.
- Comunicação de informações relevantes, como atualizações, eventos ou promoções.
- Processamento de transações e gestão de pagamentos, caso aplicável.
- Melhoria contínua da experiência de utilizador, ajustando funcionalidades e conteúdos de acordo com o feedback e preferências.
- Cumprimento de obrigações legais, se aplicável, e proteção dos direitos da aplicação e dos utilizadores.

🔹 **Partilha de Dados com Terceiros**
Podemos partilhar dados com terceiros nas seguintes situações:
- Prestadores de serviços e parceiros tecnológicos que apoiam o funcionamento da Aplicação.
- Entidades públicas ou privadas, quando exigido por lei, regulamento ou por ordem judicial.
- Outras empresas pertencentes ao mesmo grupo da Aplicação, desde que respeitem esta Política de Privacidade.

🔹 **Direitos dos Utilizadores**
Os utilizadores têm o direito de:
✔ Aceder aos dados pessoais armazenados e pedir uma cópia.
✔ Corrigir, atualizar ou eliminar os dados pessoais (exceto quando o armazenamento é necessário por lei).
✔ Opor-se ao tratamento dos dados para finalidades de marketing.
✔ Limitar o tratamento dos dados em certas situações, conforme previsto por lei.
✔ Solicitar a portabilidade dos dados.

Para exercer qualquer destes direitos, o utilizador deve contactar-nos através do endereço de email **[inserir email de contacto]**.

🔹 **Retenção de Dados**
Armazenamos os dados pessoais pelo período necessário para cumprir as finalidades para as quais foram recolhidos. Quando os dados deixarem de ser necessários, serão eliminados ou anonimizados de forma segura.

🔹 **Alterações a esta Política de Privacidade**
A Aplicação reserva-se o direito de atualizar esta Política de Privacidade a qualquer momento. As alterações serão publicadas na aplicação e os utilizadores serão notificados de quaisquer mudanças significativas.

🔹 **Contacto**
Em caso de dúvidas, preocupações ou para exercer os seus direitos, entre em contacto conosco através de:
📧 Email: viseuscouts@gmail.com  
📍 Endereço: Viseu

📅 **Data da última atualização:** 1/2/2025
                    """,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      height: 1.5,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
