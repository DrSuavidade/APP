const jwt = require('jsonwebtoken');

const autenticarJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: "Token de autenticação ausente ou inválido." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Definição de permissões
        req.permissoes = {
            isViewer: decoded.ID_TIPO === 1,
            isAdmin: decoded.ID_TIPO === 2,
            isScouter: decoded.ID_TIPO === 3,
        };

        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
};

// Middleware para verificar se é Admin
const verificarAdmin = (req, res, next) => {
    if (!req.permissoes.isAdmin) {
        return res.status(403).json({ message: "Acesso negado. Apenas administradores podem realizar esta ação." });
    }
    next();
};

module.exports = {
    autenticarJWT,
    verificarAdmin
};
