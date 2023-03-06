// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
var { parse } = require('querystring');



// Server creation

function collectRequestBodyData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


function postTask(task,post) {
    task['done'] = false
    // check if task is valid
    post(task)
}




var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if (static.staticResource(req)) {
        static.serveStaticResource(req, res)
    }
    else {
        switch (req.method) {
            case "GET":
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                axios.get('http://localhost:3000/task')
                .then(function (response) {
                    var tasks = response.data
                    res.end(templates.mainPage(d,tasks))
                })
                .catch(function (error) {
                    console.log(error)
                    res.end('<p>Erro: ' + error + '</p>')
                })
                break
            case "POST":
                if (req.url == '/') {
                    collectRequestBodyData(req, result => {
                        postTask(result, function (aluno) {
                            axios.post('http://localhost:3000/task', aluno)
                                .then(function (response) {
                                    res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.end(`<body onload=window.location='http://localhost:7777/'></body>`)
                                })
                                .catch(function (error) {
                                    console.log(error)
                                    res.writeHead(401, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.end('<p>Erro: ' + error + '</p>')
                                })
                        })
                    })
                }
                else if (req.url == '/change') {
                    collectRequestBodyData(req, result => {
                        if (result.id){
                            let task = {
                                done: Boolean(result.done),
                                id: result.id,
                                description: result.description,
                                responsible: result.responsible,
                                deadline: result.deadline,
                            }
                            axios.put('http://localhost:3000/task/' + result.id, task)
                            .then(function (response) {
                                res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.end(`<body onload=window.location='http://localhost:7777/'></body>`)
                            })
                            .catch(function (error) {
                                res.writeHead(401, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.end('<p>Erro: ' + error + '</p>')
                            })
                        }
                        else{
                            res.writeHead(401, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.end('<p>Erro: ' + error + '</p>')
                            console.log('Error: ' + result)
                        }
                    })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default:
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }

})

alunosServer.listen(7777, () => {
    console.log("Servidor à escuta na porta 7777...")
})



