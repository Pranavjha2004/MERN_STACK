import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error: "Not authorized"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch(err){
        res.status(401).json({error: "Invalid token"});
    }
};

export default authMiddleware;