(function(){
    getAllUserData();
}())

function showUserData(response){
    for(let user of response){
        let tableBody = document.querySelector(`.table-body`);
        let element = document.createElement('tr');
        element.innerHTML = `
            <td>
            <button type="button" class="button button-contact${user.id}">Contact</button>
            <a href="user.html">
                <button type="button" class="button button-posts${user.id}">Posts</button>
            </a>
            <button type="button" class="button button-todo${user.id}">To-Do</button>
            </td>
            <td class="name">${user.name}</td>
            <td class="username">${user.username}</td>
            <td class="email">${user.email}</td>
            <td class="company">${user.company.name}</td>
        `;
        tableBody.append(element);

        let contactButton = document.querySelector(`.button-contact${user.id}`);
        contactButton.addEventListener('click', function(event){
            let contactDetail = document.querySelector(".pop-up");
            showContactDetail(user);
            contactDetail.style.display = "block";
            document.querySelector(".x-mark").addEventListener('click', function(){
                contactDetail.style.display = "none";
            });
        });

        let postButton = document.querySelector(`.button-posts${user.id}`);
        postButton.addEventListener('click', function(event){
            sessionStorage.setItem("id",user.id);
        });

        let todoButton = document.querySelector(`.button-todo${user.id}`);
        todoButton.addEventListener('click', function(event){
            getToDoList(user.id);
        });
    }
}

function showContactDetail(user){
    let popUp = document.querySelector(".popup-body");
    popUp.innerHTML = `
        <tr>
            <th rowspan="4">Address</th>
            <td class="popup-td">Street</td>
            <td>${user.address.street}</td>
        </tr>
        <tr>
            <td class="popup-td">Suite</td>
            <td>${user.address.suite}</td>
        </tr>
        <tr>
            <td class="popup-td">City</td>
            <td>${user.address.city}</td>
        </tr>
        <tr>
            <td class="popup-td">Zip Code</td>
            <td>${user.address.zipcode}</td>
        </tr>
        <tr>
            <th>Phone</th>
            <td colspan="2">${user.phone}</td>
        </tr>
        <tr>
            <th>Webiste</th>
            <td colspan="2">${user.website}</td>
        </tr>
    `;
}


function showTodoList(response){
    let todoBody = document.querySelector('.todo-body');
    if(todoBody.querySelector("div") !== null){
        todoBody.textContent = "";
    }
    for(let user of response){
        let elementTodo = document.createElement("div");
        if(user.completed == true){
            elementTodo.innerHTML = `
                <span>${user.title}</span>
                <i class="fa fa-check"></i>
            `;
            todoBody.append(elementTodo);
        } else {
            elementTodo.innerHTML = `
                <span>${user.title}</span>
            `;
            todoBody.append(elementTodo);
        }
    }
}

function getAllUserData(){
    let request = new XMLHttpRequest();
    request.open("GET", `https://jsonplaceholder.typicode.com/users`);
    request.send();
    request.onload = function(){
        let data = JSON.parse(request.response);
        showUserData(data);
    }
}

function getToDoList(id){
    let request = new XMLHttpRequest();
    request.open("GET", `https://jsonplaceholder.typicode.com/todos?userId=${id}`);
    request.send();
    request.onload = function(){
        let data = JSON.parse(request.response);
        showTodoList(data);
    }
}