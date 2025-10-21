const { verify } = require("jsonwebtoken");


const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken) {
        return res.status(401).json({ error: "Utilizador não logado." });
    }

    try {
        const validToken = verify(accessToken, "importantsecret");
        if (validToken)
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido." });
    }
};


const checkRole = (roles) => {
    return (req, res, next) => {
        const { role } = req.user;

        if (!roles.includes(role.trim())) {
            return res.status(403).json({ error: "Acesso negado." });
        }

        next();
    };
};

module.exports = { validateToken, checkRole };