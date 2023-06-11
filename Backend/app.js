const express = require('express');
const universitiesRoute = require("./src/universities/universities.controller");
const authRoute = require("./src/auth/auth.controller");
const authService =  require("./src/auth/auth.service");
const userRoute = require('./src/user/user.controller');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req,res,next)=>{
    try{
        if(req.path ==="/auth")
        next()
        else if(req.headers.authorization){
          if(!authService.validateToken(req.headers.authorization)){
            throw {message:'Token invalido', status:403}
          }}
        else
          throw {message:'Header Authorization não presente', status:401}
        next()
      }catch(err){
        res.status(500).send(err) 
      }
})


app.use('/universities', universitiesRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);

// app.get('/',(req,res)=>{
//     res.status(200);
//     res.send("I am alive");
// })

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
