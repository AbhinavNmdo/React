const jwt = require('jsonwebtoken');
const JWT_SECRET = 'this$is$the$sec$string';

const fetchuser = (req, res, next)=>{
    // Get the user from the jwt token 
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({err: "Please auth with valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(400).send({err: "Some internal error occured"});
    };
}

module.exports = fetchuser;