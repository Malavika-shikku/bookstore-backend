
const jwt = require('jsonwebtoken')


const jwtMiddleware = (req,res,next)=>{
    console.log('Inside JWT middleware');
    

    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token,'secretkey')
        console.log("decoded token payload : ",jwtResponse);
        req.payload = jwtResponse.usermail 
        next()
        
    }catch(err){
        res.status(401).json("invalid token")
    }

    


}

module.exports = jwtMiddleware