const BlockChain = require('./blockChain');
const express = require('express');
const bodyParser = require('body-parser');
/*const blockChain = new BlockChain();*/
/*blockChain.adicionarBloco("Block #01");
blockChain.adicionarBloco("Block #02");
blockChain.adicionarBloco("Block #03");

console.log(blockChain);

console.log(blockChain.validaBlockChain());*/

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/authController')(app);
require('./controllers/loggedController')(app);

app.listen(3000);