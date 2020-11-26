const sha256 = require('crypto-js/sha256');

class Block {
  constructor(index = 0, hashAnterior = null, dados = "Genesis Block", dificuldade = 4){
    this.index = index;
    this.hashAnterior = hashAnterior;
    this.dados = dados;
    this.dataCriacao = new Date();
    this.dificuldade = dificuldade;
    this.tentativas = 0;

    this.mine();
  }

  generateHash(){
    return sha256(this.index + this.hashAnterior + JSON.stringify(this.dados) + this.dataCriacao + this.tentativas).toString();
  }

  mine(){
    this.hash = this.generateHash();

    while(!(/^0*$/.test(this.hash.substring(0, this.dificuldade)))){
      this.tentativas++;
      this.hash = this.generateHash();
    }

  }
}

module.exports = Block;