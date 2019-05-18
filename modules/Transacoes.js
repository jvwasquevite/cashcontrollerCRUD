const db = require('./db.js');

const Transacoes = db.sequelize.define('transacoes', {
  nome: {
    type: db.Sequelize.STRING
  },
  valor: {
    type: db.Sequelize.INTEGER
  },
  data: {
    type: db.Sequelize.STRING
  },
  compra: {
    type: db.Sequelize.STRING
  }
});

//Transacoes.sync({force:true});

module.exports = Transacoes
