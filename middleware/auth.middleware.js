import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

async function verifyJWT(req, res, next) {
    try {
        const token = req?.header('Authorization')?.split(' ')[1] || req?.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    
        const user = await User.findByPk(decodedToken.id);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user=user;
    
        next();
        
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.', error: error.message });
    }
}



export {
    verifyJWT
}