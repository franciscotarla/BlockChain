const Block = require('./block');

class BlockChain{
  constructor(dificuldade = 4){
    this.blocks = [new Block()];
    this.index = 1;
    this.dificuldade = dificuldade;
  }

  getBlocoAnterior(){
    return this.blocks[this.blocks.length - 1];
  }

  adicionarBloco(dados){
    const index = this.index;
    const dificuldade = this.dificuldade;
    const hashAnterior = this.getBlocoAnterior().hash;
    const block = new Block(index, hashAnterior, dados, dificuldade);

    this.index++;
    this.blocks.push(block);
  }

  validaBlockChain(){
    for (let i = 1; i < this.blocks.length; i++) {
      const blocoAtual = this.blocks[i];
      const blocoAnterior = this.blocks[i-1];

      if(blocoAtual.hash !== blocoAtual.generateHash())
        return false;
      
      if(blocoAtual.index !== blocoAnterior.index + 1)
        return false;

      if(blocoAtual.hashAnterior !== blocoAnterior.hash)
        return false;

    }
    return true;
  }
}
module.exports = BlockChain;