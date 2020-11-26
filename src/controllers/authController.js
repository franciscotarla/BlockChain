const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const router = express.Router();
const authConfig = require('../config/auth.json');

function generateToken(param = {}){
  return jwt.sign(param, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async(req, res) =>{
  const {cpf, email} = req.body;

  try{
    if (await Usuario.findOne({cpf}))
      return res.status(400).send({error: 'CPF já cadastrado.'});

    if (await Usuario.findOne({email}))
      return res.status(400).send({error: 'Email já cadastrado.'});
  
    const usuario = await Usuario.create(req.body);

    usuario.password = undefined;

    return res.send({
      usuario,
      token: generateToken({ id: usuario.cpf }),
    });
  } catch(err){
    return res.status(400).send({err : 'Registro falho. Erro: ' + err})
  }
});

router.post('/login', async(req, res) =>{
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({email}).select('+password');

  if(!usuario)
    return res.status(400).send({ds_mensagem: 'Usuario não encontrado'});

  if (!await bcrypt.compare(password, usuario.password))
    return res.status(400).send({ds_mensagem: 'Senha incorreta!'});

  usuario.password = undefined;

  const token = jwt.sign({ id: usuario.cpf }, authConfig.secret, {
    expiresIn: 86400,
  });

  res.send({ 
    usuario, 
    token: generateToken({ id: usuario.cpf }),
    ic_sucesso: true
  });
});

module.exports = app => app.use('/auth', router);