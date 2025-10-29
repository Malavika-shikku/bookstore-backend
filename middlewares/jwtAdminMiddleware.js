const jwt = require('jsonwebtoken');

const jwtAdminMiddleware = (req, res, next) => {
    console.log('Inside Admin JWT Middleware');

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        console.log("decoded token payload:", decoded);

        // Check if the user is admin
        
        if (decoded.usermail === 'adminbook@gmail.com') {
            // Store the full payload for downstream controllers
            req.payload = decoded;
            next();
        } else {
            return res.status(403).json({ error: 'Forbidden: Admins only' });
        }

    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = jwtAdminMiddleware;
