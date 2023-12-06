
const jwtDecode = require('jwt-decode');
const permited=(data)=>
{
    return (req,res,next)=>{ 

    const tok=req.headers.authorization
    if(!tok){
        res.status(400).json({msg:"Token Not Found"})
    }
    const role=jwtDecode(tok)
    if(data.includes(role.role)){
        next()
    }
    else{
        res.status(403).json({msg:"You are not allowed to access!"})
    }
}
}
module.exports.permited=permited;