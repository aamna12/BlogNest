const jwt = require("jsonwebtoken");

const checkAuthenticationCookie=async(req, res, next)=>{
    console.log("🔐 Authentication middleware triggered");
    const token = req.cookies.token;
    if (!token){
        console.log('Token not found');
        req.user = null;
        return res.redirect('/login');
    }
    try{
        const userPayload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userPayload;
        next();    
    }catch(error){
        req.user = null;
    }
  
}

module.exports = { checkAuthenticationCookie }