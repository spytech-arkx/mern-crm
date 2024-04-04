const { verifyToken } = require("../helpers/jwt")

exports.avoidAuth=(req, res, next)=>{
   try{
      const token = req.cookies.tokenAuth || null
      if(!token){
         next()
      }
      const verify = verifyToken(token)
      if(!verify){
         next()
      }
      return res.status(200).json({
        message: 'you are already Logged in',
      });
   }catch(err){
      
   }
}