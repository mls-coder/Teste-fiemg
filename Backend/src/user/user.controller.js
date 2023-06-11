const express = require('express');
const md5 = require('md5');
const router = express.Router();

const userService = require('./user.service')

router.post('/login',async function(req,res){
  try {
    const { email, password } = req.body;
    res.status(201).json({ email });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/register', async function(req, res){
  try {
    const { email, password } = req.body;
    const cryptoPassword = md5(password);
    const { id } = await userService.createUser( email, cryptoPassword);
    res.status(201).json({ email, id });
  } catch (error) {
    return res.status(500).send(error);
  }
})

router.put('/password', async function(req,res){
    try {
        const {new_password,email} = req.body
        const cryptoPassword = md5(new_password);
        const update = await userService.changePassword(email,new_password)
        res.status(201).json(update);
      } catch (error) {
        return res.status(500).send(error);
      }
})


module.exports = router;