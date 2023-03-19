var axios = require('axios');


module.exports.list = () =>{
    return axios.get('http://localhost:3000/task'); 
}


module.exports.add = (task) =>{
    return axios.post('http://localhost:3000/task', task); 
}


module.exports.change = (task) =>{
    return axios.put('http://localhost:3000/task/' +task.id, task); 
}

module.exports.delete = (id) =>{
    return axios.delete('http://localhost:3000/task/' +id); 
}

