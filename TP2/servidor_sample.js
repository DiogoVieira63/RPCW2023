var http = require('http');
var url = require('url');
var fs = require('fs');


var server = http.createServer(function (req, res) {
    q = url.parse(req.url, true).pathname;
    if (q == '/') {
        fs.readFile("index.html", function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            if (err) {
                res.write('Erro: ' + err);
            }
            else
                res.write(data);
            res.end();
        }); 
    }
    else {
        var num = q.substring(1, q.length);
        var file = 'arq_html/arq' + num + '.html';
        fs.readFile(file, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            if (err) {
                res.write('Erro: ' + err);
            }
            else
                res.write(data);
            res.end();
        });
    }
});


server.listen(7777);

console.log('Servidor à escuta em http://localhost:7777/');

