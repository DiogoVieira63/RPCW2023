const main = "indigo";
const sec = "amber";



exports.mainPage = function (d,tasks) {
    let todo = tasks.filter(t => t.done == false)
    let done = tasks.filter(t => t.done == true)
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
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
            <h1>Todo List</h1>
        </header>

        <div class="w3-card-4 w3-center w3-margin-top w3-round-xxlarge w3-auto" style="max-width:1000px">
            <div class="w3-${main} w3-container w3-round-xxlarge">
                <h2>Task</h2>
            </div>
            <div class="w3-container">
                <form method="POST">
                    <p><input required class="w3-input w3-border w3-round-xxlarge" type="date" name="deadline" placeholder="Deadline"></p>
                    <p><input required class="w3-input w3-border w3-round-xxlarge" type="text" name="description" placeholder="Description"></p>
                    <p><input required class="w3-input w3-border w3-round-xxlarge" type="text" name="responsible" placeholder="Responsible"></p>
                    <p><input class="w3-button w3-${sec} w3-round-xxlarge" type="submit" value="Add Task"></p>
                </form>
            </div>                    

        </div>

        <div class="w3-row w3-container w3-margin">
            <div class="w3-col m12 l6 w3-border w3-round-xxlarge w3-center w3-card-2 w3-margin-top">
                <div class="w3-container w3-${main} w3-round-xxlarge">
                    <h2>To Do</h2>
                </div>
                <div class="w3-container w3-round-xxlarge">
                    <table class="w3-table-all w3-margin-top w3-margin-bottom">
                        <tr>
                            <th>Deadline</th>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Done</th>
                        </tr>`;
        for (var i = 0; i < todo.length; i++) {

            pagHTML += `
                        <tr>
                            <td>${todo[i].deadline}</td>
                            <td>${todo[i].description}</td>
                            <td>${todo[i].responsible}</td>
                            <td>
                                <form action="change" method="post">
                                    <input type="hidden" name="id" value="${todo[i].id}">
                                    <input type="hidden" name="deadline" value="${todo[i].deadline}">
                                    <input type="hidden" name="description" value="${todo[i].description}">
                                    <input type="hidden" name="responsible" value="${todo[i].responsible}">
                                    <input type="hidden" name="done" value="true">
                                    <input onChange="this.form.submit()" class="w3-check w3-white w3-border w3-border-${sec} w3-round-xxlarge" type="checkbox" value="Done">
                                </form>
                            </td>
                        </tr>`;
        }
        pagHTML += `
                    </table>
                </div>
            </div>
            <div class="w3-col m12 l6 w3-border w3-round-xxlarge w3-center w3-card-2 w3-margin-top">
                <div class="w3-container w3-${main} w3-round-xxlarge">
                    <h2>Done</h2>
                </div>
                <div class="w3-container w3-round-xxlarge">
                    <table class="w3-table-all w3-margin-top w3-margin-bottom">
                        <tr>
                            <th>Deadline</th>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Undo</th>
                        </tr>`
        for (var i = 0; i < done.length; i++) {
            pagHTML += `
                        <tr>
                            <td>${done[i].deadline}</td>
                            <td>${done[i].description}</td>
                            <td>${done[i].responsible}</td>
                            <td>
                            <form action="change" method="post">
                                <input type="hidden" name="id" value="${done[i].id}">
                                <input type="hidden" name="deadline" value="${done[i].deadline}">
                                <input type="hidden" name="description" value="${done[i].description}">
                                <input type="hidden" name="responsible" value="${done[i].responsible}">
                                <input type="hidden" name="done" value="">
                                <input onChange="this.form.submit()" class="w3-check w3-white w3-border w3-border-${sec} w3-round-xxlarge" type="checkbox" value="Undo">
                            </form>
                        </td>
                        </tr>`;
        }
            pagHTML += `
                    </table>
                </div>
            </div>
        </div>
        </div>
                
        <footer class="w3-container w3-${main} w3-center">
            <h5>Generated by RPCW2023 in ${d}</h5>
        </footer>
        </body>
    </html>
    `
    return pagHTML;
}