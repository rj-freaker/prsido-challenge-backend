const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) => {

    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({message: "Token not found"});
    
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return req.status(401).json({
        error: "Unauthorized",
    })
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({
            message: err
        })
    }
}

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn:50000});
}

module.exports = {jwtAuthMiddleware, generateToken};