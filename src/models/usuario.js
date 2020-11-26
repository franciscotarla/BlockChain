const mongoose = require("../database");
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  nome:{
    type: String,
    required: true,
  },
  cpf:{
    type:String,
    required: true,
    unique: true,
  },
  email:{
    type:String,
    required: true,
    unique:true,
    lowercase:true,
  },
  password:{
    type:String,
    required:true,
    select:false,
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },
});

UsuarioSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
