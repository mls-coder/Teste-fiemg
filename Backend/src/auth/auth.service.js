const jwt = require('jsonwebtoken')

const login = async (body)=>{
        if(body.key===process.env.JWT_SECRET && body.username===process.env.JWT_USERNAME)
            return {token:await jwt.sign(body,`${process.env.JWT_SECRET}`,{ expiresIn: '1h' })}
        else 
            throw {message:'Usuario não encontrado', status:404}
    }

const validateToken = (token)=>{
        jwt.verify(token,`${process.env.JWT_SECRET}`,(err,decoded)=>{
            if(!decoded)
                throw {message:'Token expirado ou invalido', status:403}
        })
        return true
    }

module.exports = { login, validateToken }