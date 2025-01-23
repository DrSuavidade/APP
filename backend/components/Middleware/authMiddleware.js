const jwt = require('jsonwebtoken');

const autenticarJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Token no cabeçalho Authorization
    
    console.log("Token Recebido:", token); // LOG: Mostrar o token recebido

    if (!token) {
        console.log("Erro: Token ausente.");
        return res.status(401).json({ message: "Token de autenticação ausente ou inválido." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar o token
        console.log("Token Decodificado:", decoded); // LOG: Mostrar conteúdo decodificado
        req.user = decoded; // Adiciona o token decodificado no `req.user`
        next();
    } catch (error) {
        console.log("Erro ao verificar token:", error.message); // LOG: Mostrar erro ao verificar o token
        return res.status(403).json({ message: "Token inválido ou expirado.", error });
    }
};

module.exports = autenticarJWT;