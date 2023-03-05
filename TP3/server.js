var http = require('http');
var url = require('url');
var fs = require('fs');
var axios = require('axios');

var mypages = require('./mypages.js');

var server = http.createServer(function (req, res) {

    console.log(req.method + " " + req.url);

    q = url.parse(req.url, true);
    let path = decodeURIComponent(q.pathname);
    if (path == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(mypages.mainPage());
    }

    else if (path.includes('/w3.css')) {
        fs.readFile('w3.css', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            if (err) {
                res.write("ERRO: Ficheiro não encontrado " + err)
                console.log(err);
            }
            else {
                res.write(data);
            }
            res.end();
        });
    }
    else if (path.startsWith('/top_profissao')) {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
    
        let profissao = q.query.profissao;
        console.log("Pedido para profissão " + profissao);
        let query = "";
        if (profissao != undefined) query = `?profissao=${profissao}`;
        axios.get("http://localhost:3000/pessoas/" + query)
            .then(function (response) {
                var pessoas = response.data;
                if (profissao == undefined) res.end(mypages.topProfissoesPage(pessoas));
                else res.end(mypages.pessoasPage(pessoas));
            })
            .catch(erro => {
                res.end("Erro: " + erro);
                console.log("Erro: " + erro);
            })
    }
    else if (path.startsWith('/pessoa/')) {
        res.writeHead(200, { 'Content-Type': 'text/html', charset: 'utf-8' });
        let id = path.split('/')[2];
        let number = Number(id.slice(1));
        if (number < 1 || number > 16000) {
            erro = "Indíce de pessoa errado";
            res.end(`<p>Erro: ${erro} </p>`);
            console.log("Erro: " + erro);
        }
        else {
            axios.get("http://localhost:3000/pessoas/" + id)
                .then(function (response) {
                    var pessoa = response.data;
                    res.end(mypages.pessoaPage(pessoa));
                }
                )
                .catch(erro => {
                    res.end("Erro: " + erro);
                    console.log("Erro: " + erro);
                })
        }
    }
    else if (path == '/pessoas') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        axios.get("http://localhost:3000/pessoas/")
            .then(function (response) {
                var pessoas = response.data;
                res.end(mypages.pessoasPage(pessoas));
            })
            .catch(erro => {
                res.end("Erro: " + erro);
                console.log("Erro: " + erro);
            })
    }
    else if (path.startsWith('/sexo')) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let sexo = q.query.sexo;
        let query = "";
        if (sexo != undefined) query = `?sexo=${sexo}`;
        console.log("Pedido para sexo " + sexo);
        axios.get("http://localhost:3000/pessoas/" + query)
            .then(function (response) {
                var pessoas = response.data;
                if (sexo == undefined) res.end(mypages.distSexoPage(pessoas));
                else res.end(mypages.pessoasPage(pessoas));
            }
            )
            .catch(erro => {
                res.end("Erro: " + erro);
                console.log("Erro: " + erro);
            })
    }
    else if (path.startsWith('/desporto')) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let desporto = q.query.desporto;
        console.log("Pedido para desporto " + desporto);
        axios.get("http://localhost:3000/pessoas/")
            .then(function (response) {
                var pessoas = response.data;
                if (desporto == undefined) res.end(mypages.distDesportoPage(pessoas));
                else {
                    var pessoasDesporto = [];
                    desporto = desporto.toLowerCase();
                    for (let i = 0; i < pessoas.length; i++) {
                        var p = pessoas[i];
                        var desportos = p.desportos;
                        for (let j = 0; j < desportos.length; j++) {
                            desportos[j] = desportos[j].toLowerCase();
                        }
                        if (desportos.includes(desporto)) pessoasDesporto.push(p);
                    }
                    console.log("Pessoas com desporto " + desporto + ": " + pessoasDesporto.length);
                    res.end(mypages.pessoasPage(pessoasDesporto));
                }
            }
            )
            .catch(erro => {
                res.end("Erro: " + erro);
                console.log("Erro: " + erro);
            })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("ERRO: Operação não suportada");
    }
});


server.listen(7777);

console.log('Servidor à escuta em http://localhost:7777/');

