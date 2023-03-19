var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')


/* GET home page. */
router.get('/', function (req, res, next) {
    Task.list()
        .then(dados => {
            let tasks = dados.data
            tasks = tasks.sort((a, b) => a.deadline > b.deadline ? 1 : -1)
            let categories = new Set(tasks.map(t => t.category).sort());
            console.log(categories)
            let filter = req.query.filter;
            let edit = req.query.edit;
            let del = req.query.del ? req.query.del : false;
            console.log(req.query)
            res.render('index', { tasks: tasks, filter: filter, edit: edit, message: req.query.action, id: req.query.id, del: del})
        })
        .catch(erro => res.render('error', { error: erro }))

});


router.post('/', function (req, res, next) {
    let task = {
        responible : req.body.responsible,
        description : req.body.description,
        deadline : req.body.deadline,
        category : req.body.category,
        done : req.body.done
    }
    Task.add(task)
        .then(_ => res.redirect('/?action=add'))
        .catch(erro => res.render('error', { error: erro }))
});

router.post('/confirm_delete', function (req, res, next) {
    res.redirect('/?del=yes&id=' + req.body.id)

});

router.post('/change', function (req, res, next) {
    Task.change(req.body)
        .then(_ => res.redirect('/?action=change&id=' + req.body.id))
        .catch(erro => res.render('error', { error: erro }))
});

router.post('/delete', function (req, res, next) {
    Task.delete(req.body.id)
        .then(_ => res.redirect('/?action=deleted&id=' + req.body.id))
        .catch(erro => res.render('error', { error: erro }))
});

router.post('/filter', function (req, res, next) {
    let filter = req.body.categoria;
    res.redirect('/?filter=' + filter)
}); 

router.post('/clear', function (req, res, next) {
    res.redirect('/')
});


router.post('/edit', function (req, res, next) {
    let edit = req.body.id;
    res.redirect('/?edit=' + edit)
});



module.exports = router;
