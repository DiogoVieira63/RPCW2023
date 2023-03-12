const main = "indigo";
const sec = "amber";



function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function taskCard(tasks,done,title,button,filter) {
    let pagHTML = `
        <div class="w3-col m12 l6 w3-border w3-round-xxlarge w3-card-2 w3-margin-top">
        <div class="w3-container w3-center w3-${main} w3-round-xxlarge" >
            <h2>${title}</h2>
        </div>
        <div class="w3-container w3-round-xxlarge" style="max-height:500px;overflow-y:auto">`;
    for (var i = 0; i < tasks.length; i++) {
        if (filter && tasks[i].category != filter) continue;
        pagHTML += `
            <ul class="w3-ul w3-margin">`
        for (var key in tasks[i]) {
            if (key == "done" || key == "id") continue;
            pagHTML += `<li><b>${capitalize(key)}:</b> ${tasks[i][key]}</li>`
        }
        pagHTML += `</ul><form class="w3-center" method="post">`
        for (var key in tasks[i]) {
            value = tasks[i][key]
            if (key == "done" ) value = done;
            pagHTML += `<input type="hidden" name="${key}" value="${value}">`
        }
        pagHTML += `
                <button formaction="edit" class="w3-button w3-circle w3-${sec}" type="submit" >
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button formaction="change" class="w3-button w3-circle w3-${sec}" type="submit" >
                    <i class="fa ${button}" aria-hidden="true"></i>
                 </button>
                <button formaction="delete" class="w3-button w3-circle w3-${sec}" type="submit" >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </form>
            <hr>`;
    }
    return pagHTML + `</div></div>`;
}

exports.mainPage = function (d, tasks, edit,filter) {
    tasks = tasks.sort((a, b) => a.deadline > b.deadline ? 1 : -1)

    let todo = tasks.filter(t => t.done == "false")
    let done = tasks.filter(t => t.done == "true")

    let task;
    if (edit) {
        task = tasks.find(t => t.id == edit)
    }

    let categories = new Set(tasks.map(t => t.category).sort());

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <title>To-Do</title>
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
        </head>
        <body class="w3-light-gray Site">
        <div class="Site-content">
        <header class="w3-container w3-${main} w3-center">
            <h1>To Do List</h1>
        </header>

        <div class="w3-card-4 w3-center w3-margin-top w3-round-xxlarge w3-auto" style="max-width:1000px">
            <div class="w3-${main} w3-container w3-round-xxlarge">
                <h2>Task</h2>
            </div>
            <div class="w3-container">`
    let action = edit ? `action="change"` : ``
    pagHTML += `<form ${action} method="POST">`
    let value = edit ? `value="${task.deadline}"` : ""
    pagHTML += `<p><input id="date" ${value} required class="w3-input w3-border w3-round-xxlarge" type="date" name="deadline"  placeholder="Deadline"></p>`;
    value = edit ? `value="${task.description}"` : ""
    pagHTML += `<p><input ${value} required class="w3-input w3-border w3-round-xxlarge" type="text" name="description" placeholder="Description"></p>`;
    value = edit ? `value="${task.responsible}"` : ""
    pagHTML += `<p><input ${value} required class="w3-input w3-border w3-round-xxlarge" type="text" name="responsible" placeholder="Responsible "></p>`;

    value = edit ? `value="${task.category}"` : ""
    pagHTML += `<input ${value} required type="text"  name="category" list="categories" class="w3-input w3-border w3-round-xxlarge" placeholder="Category"/>`
    pagHTML += `<datalist id="categories">`
    for (var i = 0; i < categories.length; i++) {
        pagHTML += `<option>${categories[i]}</option>`
    }
    pagHTML += `</datalist>`
    let done_str = edit ? task.done : "false"
    if (edit)  pagHTML += `<input type="hidden" name="id" value="${task.id}">`;
    pagHTML += `<input type="hidden" name="done" value="${done_str}">`
    value = edit ? `Edit` : "Add"
    pagHTML += `<input class="w3-button w3-${sec} w3-round-xxlarge w3-margin" type="submit" value="${value} Task">`;
    pagHTML += `
            </form> 
            </div>
        </div>`
    //select category
    pagHTML+=`
    <div class="w3-card-4 w3-center w3-margin-top w3-round-xxlarge w3-auto" style="max-width:1000px">
    <form action="filter" method="POST">
    <select class="w3-select w3-center w3-round-xxlarge" name="categoria">
        <option value="" selected>Selecionar Categoria</option>`
    for (let elem of categories){
        let selected = filter == elem ? "selected" : ""
        pagHTML+=`<option ${selected} value="${elem}">${elem}</option>`
    }
    pagHTML+= `</select><button class="w3-button w3-${sec} w3-round-xxlarge w3-margin" type="submit" value="Filter">Filter</button>
    </form></div>`;
    pagHTML+= `<div class="w3-row w3-container w3-margin">`;
    pagHTML += taskCard(todo,"true","To Do","fa-check",filter);
    pagHTML += taskCard(done,"false","Completed","fa-times",filter);
    pagHTML += `
        </div>
        </div>
                
        <footer class="w3-container w3-${main} w3-center">
            <h5>Generated by RPCW2023 in ${d}</h5>
        </footer>
        </body>
        <script>
            var today = new Date().toISOString().split('T')[0];
            date.min = today;
        </script>

    </html>
    `
    return pagHTML;
}