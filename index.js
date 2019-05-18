const express = require("express");
const app = express();

const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const Transacoes = require("./modules/Transacoes.js")
//Configuracoes
  //Handlebars
  app.engine('handlebars', handlebars({defaultLayout: 'main.handlebars'}));
  app.set('view-engine', 'handlebars');

  //bodyParser
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

//Rotas
  app.use(express.static(__dirname + '/public'));

  //Read (home.handlebars)
  app.get('/', function(req,res){
    Transacoes.findAll({order: [['id', 'DESC']]}).then(function(transacoes){
    res.render(__dirname+'/views/layouts/home.handlebars', {transacoes: transacoes})
  })
  });
  //Create (cadastro.handlebars)
  app.get("/cadastro", function(req,res){
    res.render(__dirname+'/views/layouts/cadastro.handlebars')
  });

  app.post('/added', function(req,res){
    Transacoes.create({
        nome: req.body.nome,
        valor: req.body.valor,
        data: req.body.data,
        compra: req.body.compra
    }).then(function(){
    res.redirect('/')
    }).catch(function(erro) {
    res.send("Houve um erro: "+ erro);
    })
  });
  //Update ()
  app.get('/editar/:id', function(req, res){
    Transacoes.findByPk(req.params.id)
        .then(post => {
            res.render(__dirname+'/views/layouts/update.handlebars', {
                id: req.params.id,
                nome: post.nome,
                valor: req.body.valor,
                data: post.data,
                compra: post.compra
            });
        })
        .catch(err => {
            res.send('Post não encontrado!');
        })
    });

  app.post('/editado/:id', function(req, res){
      Transacoes.update({
          nome: req.body.nome,
          valor: req.body.valor,
          data: req.body.data,
          compra: req.body.compra
      },{ where: { id: req.params.id }})
      .then(function(){
          res.redirect('/')
      })
      .catch(function(error){
      console.log(error);
      })
  });
  //Delete (delete.handlebars)
  app.get('/deletar/:id', function(req, res){
    Transacoes.destroy({where: {'id': req.params.id}}).then(function(){
        res.render(__dirname+'/views/layouts/delete.handlebars')
    }).catch(function(erro){
        res.send("Post não existe")
    })
  });

app.listen(8081, function(){
  console.log("Servidor rodando com sucesso.");
});
