var axios = require('axios')
var Pessoa = require('../models/alunos')

module.exports.list = (nrForPage,page) => {
    return Pessoa.find().sort({nome:1}).skip(nrForPage * page).limit(nrForPage).then(data => {
        return data;
    })
    .catch(function(error) {
        console.log(error)
    })
}

module.exports.getPessoa = id => {
    return Pessoa.findOne({_id: id}).then(data => {
        return data;
    }).catch(function(error) {
        console.log(error)
    });
}

module.exports.addPessoa = a => {
    return Pessoa.create(a).then(data => {
        return data;
    }).catch(function(error) {
        console.log(error)
    })
}

module.exports.editPessoa = a => {
    return Pessoa.findOneAndUpdate({_id: a._id}, a, {returnDocument: "after"}).then(data => {
        return data;
    }).catch(function(error) {
        console.log(error)
    });
}

module.exports.deletePessoa = id => {
    return Pessoa.deleteOne({_id: id}).then(data => {
        console.log(data)
        return data;
    }
    ).catch(function(error) {
        console.log(error)
    });
}

module.exports.size = () => {
    return Pessoa.countDocuments().then(data => {
        return data;
    }).catch(function(error) {
        console.log(error)
    });
}   