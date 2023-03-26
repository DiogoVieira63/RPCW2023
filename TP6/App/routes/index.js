var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.size().then(size => {
    let num_page = req.query.num_page || size;
    let page = req.query.page || 0;
    let max_page = Math.floor(size / num_page);
    Pessoa.list(num_page,page)
      .then(alunos => {
        res.render('index', { slist: alunos, d: data , page: page, num_page: num_page, max_page: max_page})
      })
      .catch(erro => {
        res.render('error', { error: erro })
      })
  }).catch(erro => {
    res.render('error', { error: erro })
  });
});

router.post('/', function (req, res, next) {
  res.redirect('/' + '?num_page=' + req.body.num_page + '&page=' + req.body.page); 
});


/* GET Add Form Student page. */
router.get('/pessoas/registo', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addForm', { d: data })
});

/* GET Student page. */
router.get('/pessoas/:idAluno', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idAluno)
    .then(aluno => {
      res.render('pessoa', { a: aluno, d: data , edit : req.query.edit})
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

/* GET Student Update page. */
router.get('/pessoas/edit/:idAluno', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idAluno)
    .then(aluno => {
      res.render('editForm', { a: aluno, d: data})
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
});

/* GET Student Update page. */
router.get('/pessoas/delete/:idAluno', function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  if (req.query.confirm == 'true') {
    Pessoa.getPessoa(req.params.idAluno)
      .then(aluno => {
        res.render('pessoa', { a: aluno, d: data , del: true})
      })
      .catch(erro => {
        res.render('error', { error: erro })
      })
  }
  else {
    Pessoa.deletePessoa(req.params.idAluno)
      .then(aluno => {
        res.redirect('/')
      })
      .catch(erro => {
        res.render('error', { error: erro })
      })
  }
    
});


function treatBody(req) {
  for (var key in req.body) {
    if (key.includes('.')) {
      let array = key.split('.')
      if (req.body[array[0]] == undefined) req.body[array[0]] = {}
      req.body[array[0]][array[1]] = req.body[key]
      delete req.body[key]
    }
    //if type of value is array remove first element
    if (Array.isArray(req.body[key]) && req.body[key].length > 0) {
      req.body[key] = req.body[key].slice(1)
    }
  }
  return req.body
}



/* POST Add Student Form Data */
router.post('/pessoas/registo', function (req, res) {
  let body = treatBody(req)
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.addPessoa(body)
    .then(aluno => {
      res.render('pessoa', { a: aluno, d: data, add : true })
    })
    .catch(erro => {
      res.render('error', { error: erro })
    })
})

router.post('/pessoas/edit/:idAluno', function (req, res) {
  var data = new Date().toISOString().substring(0, 16);
  let body = treatBody(req);
  body._id = req.params.idAluno;
  Pessoa.editPessoa(body)
    .then(aluno => {
      res.render('pessoa', { a: aluno, d: data , edit : true})
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})


module.exports = router;
