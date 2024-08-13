const baseUrl = "https://66780c740bd45250561d5340.mockapi.io/api/v1/tasks"

const updateTask = (taskId, taskData) => fetch(baseUrl + "/" + taskId, {method: "PUT", headers: {"Content-Type": "application/json;charset=utf-8"}, body: JSON.stringify(taskData)})

const createTask = taskData => fetch(baseUrl, {method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(taskData)})

const deleteTask = taskId => fetch(baseUrl + "/" + taskId, {method: 'DELETE'})

const mapTasks = tasks => tasks.map(({_id, ...rest}) => ({id: _id, ...rest}))

const getTasksList = () => fetch(baseUrl).then(responce => responce.json()).then(mapTasks)

window.onload = () => {
    pass = localStorage.getItem("pass")
    if (login(pass)) {
        openProfile(login(pass))
        document.getElementById("worker_pass").setAttribute("hidden", "hidden")
        document.getElementById("content").removeAttribute("hidden")
    } else {
        document.getElementById("invalid_worker_pass").removeAttribute("hidden")
        setTimeout(() => {
            document.getElementById("invalid_worker_pass").setAttribute("hidden", "hidden")
        }, 2000)
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const p = urlParams.get('p')
    if (p == "p") {
        document.getElementById("parser").removeAttribute("hidden")
        document.getElementById("content").setAttribute("hidden", "hidden")
    }
}

function pars(res, regex){
        let results = res.matchAll(regex);
        res2 = res
        ress = []
        for (result of results) {
            res2 = res2.substring(0, result["index"]) + "__________" + res2.substring(result["index"], result["index"] + regex.length) + "___________" + res2.substring(result["index"] + regex.length)
            ress.push()
        }

        return ress
    })

}

function startParse(){
    fetch(document.getElementById("p_s_u").value, {
      withCredentials: true,
      crossorigin: true,
      mode: 'cors'}).then(res => {
        return res.text()
    }).then(res => {
        pars(res).forEach((result) => {
            
        })
    })
}

function returnHome(){
    document.getElementById("header").removeAttribute("hidden")
    document.getElementById("tasks_list_div").removeAttribute("hidden")
    document.getElementById("see_workers_tasks").removeAttribute("hidden")
    document.getElementById("workers_tasks_list_div").setAttribute("hidden", "hidden")
    document.getElementById("workers_tasks_list_div").innerHTML = '<div id="createTask"><select id="createTaskWorkerSelect"></select><input type="date" id="createTaskMaxTime"><input placeholder="TaskName" id="createTaskName"><input placeholder="TaskText" id="createTaskText"><button onclick="createNewTask()">create</button></div><h2>Workers tasks list:</h2><button onclick="returnHome()">Return home</button>'
    if (login(document.getElementById("worker_pass_input").value)){
        ids = login(document.getElementById("worker_pass_input").value)["Workers"]
    } else {
        ids = login(localStorage.getItem("pass"))["Workers"]
    }
    ids.forEach((id) => {
        document.getElementById("createTaskWorkerSelect").innerHTML += "<option>" + id + "</option>"
    })
}

//console.log(localStorage.getItem("pass"))

function removeAutoLogin(){
    localStorage.setItem("pass", "")
}

function seeTheWorkersTasks(){
    getTasksList().then((responce) => seeWorkersTasks(responce))
}



function seeWorkersTasks(tasks){
    document.getElementById("see_workers_tasks").setAttribute("hidden", "hidden")
    if (login(document.getElementById("worker_pass_input").value)){
        ids = login(document.getElementById("worker_pass_input").value)["Workers"]
        myId = login(document.getElementById("worker_pass_input").value)["Id"]
    } else {
        ids = login(localStorage.getItem("pass"))["Workers"]
        myId = login(localStorage.getItem("pass"))["Id"]
    }
    theTasks = []
    ids.forEach((id) => {tasks.forEach((task) => {
        if (task["workerId"] == id && task["creatorId"] == myId) {
            theTasks.push(task)
        }
    })})
    document.getElementById("header").setAttribute("hidden", "hidden")
    document.getElementById("tasks_list_div").setAttribute("hidden", "hidden")
    document.getElementById("workers_tasks_list_div").removeAttribute("hidden")
    theTasks.forEach((task) => {
        document.getElementById("workers_tasks_list_div").innerHTML += '<div style="background: rgb(240, 240, 240);"><div style="display: flex;" class="task_div"><h6>' + "task id:" + task["id"] + "</h6><h6>" + "created at: " + task["createdAt"] + "</h6><h6>" + "max time: " + task["maxTime"] + "</h6><h6>" + "worker id: " + task["workerId"] + "</div><h3>" + task["name"] + "</h3><h5>" + task["taskText"] + '</h5><button onclick="deleteTask(' + task['id'] + ')">Delete</button></div>'
    })
}

function setTasksList(tasksList){
    if (login(document.getElementById("worker_pass_input").value)){
        id = login(document.getElementById("worker_pass_input").value)["Id"]
    } else {
        id = login(localStorage.getItem("pass"))["Id"]
    }
    myTasks = []
    tasksList.forEach((task) => {
        if (task["workerId"] == id) {
            myTasks.push(task)
        }
    })
    document.getElementById("tasks_list").innerHTML = ""
    myTasks.forEach((task) => {
        document.getElementById("tasks_list").innerHTML += '<div style="background: rgb(240, 240, 240);"><div style="display: flex;" class="task_div"><h6>' + "task id:" +task["id"] + "</h6><h6>" + "created at: " + task["createdAt"] + "</h6><h6>" + "max time: " + task["maxTime"] + "</h6></div><h3>" + task["name"] + "</h3><h5>" + task["taskText"] + "</h5></div>"
    })
    //console.log(tasksList)
}

function createNewTask(){
    var date = new Date()
    createTask({"creatorId": document.getElementById("profile_id").innerHTML, "workerId": document.getElementById("createTaskWorkerSelect").options[document.getElementById("createTaskWorkerSelect").selectedIndex].value, "sended": false, "completed": false, "taskText": document.getElementById("createTaskText").value, "name": document.getElementById("createTaskName").value, "createdAt": date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString(), "maxTime": document.getElementById("createTaskMaxTime").value})
}

function deleteThisTask(){
    if (login(document.getElementById("worker_pass_input").value)["Workers"])
    deleteTask(document.getElementById("deleteTaskId").value)
}

function login(pass) {
    //Kostya - XhpL, Matvei - XGeF, Tim - PmCv
    workers = {"XhpL": {"Name": "Kostya", "Job": "Creator, general head", "Id": 1, "Workers": [1, 2, 3, 4]}, "XGeF": {"Name": "Matvei", "Job": "Co-Creator, head", "Id": 2, "Workers": [3, 4]}, "PmCv": {"Name": "Tim", "Job": "Designer", "Id": 3, "Workers": []}}
    if (document.getElementById("save_pass_input").checked == true) {
        localStorage.setItem("pass", pass)
    }
    return workers[pass]
}

function openProfile(data) {
    document.getElementById("profile_name").innerHTML = data["Name"]
    document.getElementById("profile_job").innerHTML = data["Job"]
    document.getElementById("profile_id").innerHTML = data["Id"]
    data["Workers"].forEach((id) => {
        document.getElementById("createTaskWorkerSelect").innerHTML += "<option>" + id + "</option>"
    })
    getTasksList().then((responce) => setTasksList(responce))
}

function workerPassSubmit(){
    pass = document.getElementById("worker_pass_input").value
    if (login(pass)) {
        openProfile(login(pass))
        document.getElementById("worker_pass").setAttribute("hidden", "hidden")
        document.getElementById("content").removeAttribute("hidden")
    } else {
        document.getElementById("invalid_worker_pass").removeAttribute("hidden")
        setTimeout(() => {
            document.getElementById("invalid_worker_pass").setAttribute("hidden", "hidden")
        }, 2000)
    }
}