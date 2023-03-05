const color = "indigo";

const header = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="w3.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>Repositório Pessoas</title>
    </head>
    <style>
    .Site {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
      }
      
      .Site-content {
        flex: 1;
      }
    </style>
    <body class="Site w3-light-grey">
    <main class="Site-content">
    `;

const footer = `
        </main>
        <div id="footer" class="w3-container w3-${color} w3-center">
            <h5>Trabalho de Casa RCPW</h5>
        </div>`;

const dict = {
    "Party_abbr": "Abreviatura",
    "Party_name": "Nome",
}

const ignore = ["Id", "Descrição", "Foto"];

function capitalize(key) {
    return key.charAt(0).toUpperCase() + key.slice(1);
}



function createRow(key, value) {
    key = capitalize(String(key).trim());
    key = key.replace(/_/g, " ");
    if (typeof value == "object") {
        if (value instanceof Array) {
            value = new Set(value);
            let row = `<tr>
            <td style="vertical-align: middle;"  rowspan="${value.size}"><b>${key}</b></td>`
            let i = 0;
            for (let elem of value) {
                if (i > 0) row += "<tr>";
                row += `<td>${elem}</td>`;
                row += "</tr>";
                i++;
            }
            return row;
        }
        else {
            var size = Object.keys(value).length;
            let row = `<tr>
            <td style="vertical-align: middle;" rowspan="${size}"><b>${key}</b></td>`
            first = true;
            for (let attr in value) {
                if (!first) row += "</tr><tr>";
                first = false;
                let valor = String(value[attr]).trim();
                attr = capitalize(String(attr).trim());
                if (attr in dict) attr = dict[attr];
                attr = attr.replace(/Gosta_/g, "Gosta de ");
                attr = attr.replace(/_/g, " ");
                if (valor == "true") valor = `<i class="fa fa-check"  style='color: green'></i>`;
                else if (valor == "false") valor = `<i class="fa fa-times" style='color: red'></i>`;
                row += `<td><span class="w3-half"><b>${attr}</b></span> ${valor}</td>`
            }
            return row + "</tr>";
        }
    }
    else {
        if (ignore.includes(key)) return "";
        return `
        <tr>
            <td><b>${key}</b></td>
            <td>${value}</td>
        </tr>`;
    }
}



exports.pessoaPage = function (pessoa) {
    var page = `${header}
    <div class="w3-white w3-card w3-center w3-content w3-margin-top w3-margin-bottom">
        <header class="w3-container w3-${color} w3-center">
            <h1>Cartão Pessoal</h1>
        </header>
    <div class="w3-container w3-center w3-margin">
                <img class="w3-round-large w3-margin"src="${pessoa.foto}" alt="Avatar" style="width:30%">
            </div>
            <table class="w3-table-all w3-centered">`
    for (let attr in pessoa)
        page += createRow(attr, pessoa[attr]);
    page += `</table>
    </div>
    ${footer}
    </body>
    </html>`;
    return page;
}

exports.pessoasPage = function (pessoas) {
    var page = `
    ${header}
    <div class="w3-container w3-center w3-${color} w3-margin">
        <h2>Lista de Pessoas</h2>
    </div>
    <div class="w3-container w3-center w3-white w3-margin w3-border w3-border-${color}">
        <p>Esta lista contém ${pessoas.length} pessoas.</p>
    </div>
        <div class="w3-card w3-center">
            <div class="w3-container">
                <table class="w3-table-all w3-hoverable">
                <tr class ="w3-${color}">
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Cidade</th>
            </tr>
            `;
    for (let i = 0; i < pessoas.length; i++) {
        var p = pessoas[i];
        page += `
                <tr class="clickable"
                    onclick="window.location='/pessoa/${p.id}'">
                        <td>${p.id}</td>
                        <td>${p.nome}</td>
                        <td>${p.idade}</td>
                        <td>${p.sexo}</td>
                        <td>${p.morada.cidade}</td>
                    </tr>`;
    }
    page += `
            </table>
            </div>
    ${footer}
    </body>
    </html>
    `;
    return page;
}



function distribuicao_sexo(pessoas) {
    var map = {};
    for (let i = 0; i < pessoas.length; i++) {
        var p = pessoas[i];
        if (map[p.sexo] == undefined) {
            map[p.sexo] = 1;
        }
        else {
            map[p.sexo]++;
        }
    }
    // sort 
    var sorted = {};
    Object.keys(map).sort().forEach(function (key) {
        sorted[key] = map[key];
    });
    return sorted;
}


function distribuicao_desporto(pessoas, stats) {
    var map = {};
    for (let i = 0; i < pessoas.length; i++) {
        var p = pessoas[i];
        var desportos = p.desportos;
        stats.max = Math.max(stats.max, desportos.length);
        stats.min = stats.min ? Math.min(stats.min, desportos.length) : desportos.length;
        stats.total += desportos.length;
        let set = new Set(desportos);
        for (entry of set) {
            if (!(entry in map)) map[entry] = 1;
            else map[entry]++;
        }
    }
    // sort by key
    var sorted = {};
    Object.keys(map).sort(
        function (a, b) {
            return map[b] - map[a];
        }
    ).forEach(function (key) {
        sorted[key] = map[key];
    });
    return sorted;
}

function top_10_profissoes(pessoas, stats) {
    var map = {};
    for (let i = 0; i < pessoas.length; i++) {
        var p = pessoas[i]["profissao"];
        if (map[p] == undefined) {
            map[p] = 1;
        }
        else {
            map[p]++;
        }
    }
    stats.total = Object.keys(map).length;
    keysSorted = Object.keys(map).sort(function (a, b) { return map[b] - map[a] })
    let top_10 = {}
    for (let i = 0; i < 10; i++) {
        top_10[keysSorted[i]] = map[keysSorted[i]];
    }
    return top_10;
}


function createButtonMenu(text, onclick) {
    return `<button onClick=${onclick} class="w3-padding-large w3-block w3-white w3-border w3-border-${color} w3-margin" >${text}</button>`;
}


function createButtonList(text, value, link, index) {
    let attr = "";
    if (index != undefined)
        attr = `<span class="w3-tag w3-white w3-border w3-border-${color} w3-round w3-margin-left w3-left">${index}</span>`;
    return `<li class="w3-padding-small w3-content">
    <button onClick="window.location='${link}'" 
    class=" w3-padding-large  w3-block w3-white w3-border w3-border-${color} w3-center " >
    ${attr}
    ${text.toUpperCase()}<span class="w3-tag w3-${color} w3-round w3-margin-left w3-right">${value}</span></button> 
    </li>`;
}

exports.distSexoPage = function (pessoas) {
    let dist_sexo = distribuicao_sexo(pessoas);
    let size = Object.keys(dist_sexo).length;
    var page = `
    ${header}
        <div class="w3-container w3-center w3-${color} ">
            <h2>Distribuição Por Sexo</h2>
        </div>
        <div class="w3-container w3-center w3-content w3-border w3-white w3-border-${color} w3-margin-top w3-margin-bottom">
            <p>Existem ${size} géneros diferentes.</p>
            <p> A distribuicão percentual destes é a seguite:</p>
            `;
    for (let key in dist_sexo) {
        let percent = ((dist_sexo[key] / pessoas.length) * 100).toFixed(2);
        page += `<p><b>${key.toUpperCase()}</b> - ${percent}%</p>`;
    }
    page += `</div>
        <div class="w3-container w3-margin">
            <ul class="w3-ul">
            `;
    for (let key in dist_sexo) {
        page += createButtonList(key, dist_sexo[key], `/sexo/?sexo=${key}`);
    }
    page += `
    </ul>
    </div>
    ${footer}
    </body>
    </html>
    `;
    return page;
}


exports.distDesportoPage = function (pessoas) {
    let stats = { max: 0, total: 0 };
    let dist_desporto = distribuicao_desporto(pessoas, stats);
    let size = Object.keys(dist_desporto).length;
    let media = (stats.total / pessoas.length).toFixed(2);
    var page = `
    ${header}
    <div class="w3-container w3-center w3-${color} ">
        <h2>Distribuição Por Desporto</h2>
    </div>
    <div class="w3-container w3-center w3-margin w3-white w3-border w3-border-${color}">
        <p>Existem ${size} desportos distintos.</p>
        <p>A média de desportos que cada pessoa pratica é ${media}.</p>
        <p> A pessoa que pratica mais desportos pratica ${stats.max} desportos.</p> 
        <p> A pessoa que pratica menos desportos pratica ${stats.min} desporto(s).</p>
    </div>
    <div class="w3-card w3-center">
        <div class="w3-container">
            <ul class="w3-ul">
            `;
    for (let key in dist_desporto) {
        page += createButtonList(key, dist_desporto[key], `/desporto/?desporto=${key}`);
    }
    page += `
    </ul>
    </div>
    ${footer}
    </body>
    </html>`;
    return page;
}


exports.topProfissoesPage = function (pessoas) {
    let stats = { total: 0 };
    let top_10 = top_10_profissoes(pessoas, stats);
    var page = `
    ${header}
    <div class="w3-container w3-center w3-${color} ">
        <h2>Top 10 Profissões</h2>
    </div>
    <div class="w3-container w3-center w3-margin w3-white w3-border w3-border-${color}">
        <p>Existe um total de ${stats.total} profissões distintas.</p>
    </div>
    <div class="w3-container">
        <ul class="w3-ul">
            `;
    let index = 1;
    for (let key in top_10) {
        page += createButtonList(key, top_10[key], `/top_profissao/?profissao=${key}`, index);
        index++;
    }
    page += `
    </ul>
    </div>
    ${footer}
    </body>
    </html>`;
    return page;
}


exports.mainPage = function () {
    var page = `
    ${header}
        <header class="w3-${color} w3-container w3-center">
            <h1>Repositório Pessoas</h1>
        </header>
        <div class="w3-content">
        ${createButtonMenu("Lista Completa", "window.location='/pessoas'")}
        ${createButtonMenu("Distribuição Por Sexo", "window.location='/sexo'",)}
        ${createButtonMenu("Distribuição Por Desporto", "window.location='/desporto'")}
        ${createButtonMenu("Top 10 Profissões", "window.location='/top_profissao'")}
        </ul>
        </div>
        </div>
        ${footer}
        </body>
    </html>
    `;
    return page;
}