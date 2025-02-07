const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;  

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];   

    if (!token) return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;  
        next();
    });
};

module.exports = authenticateJWT;