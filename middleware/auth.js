const jwt = require("jsonwebtoken");

const config = process.env;

const User = require("./../model/user");


const verifyToken = async(req, res, next) => {
  let token 
  
  if(req.headers.authorization){
    token=req.headers.authorization.split(" ")[1];
  }
    // req.body.token || req.query.token || req.headers["x-access-token"] || req.header("Authorization").replace("Bearer", '');

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = await jwt.verify(token, config.TOKEN_KEY);
    // req.user = decoded;
    const  freshUser= await  User.findOne({ email:decoded.email})

    if(!freshUser){
      return res.status(401).send({message:"User no longer Exist!"});
    }
  
  } catch (err) {
    console.log({err})
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
