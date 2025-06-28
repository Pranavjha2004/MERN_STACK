import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Not authorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.id) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

export default authMiddleware;