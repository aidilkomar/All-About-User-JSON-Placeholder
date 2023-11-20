(function(){
    let id = sessionStorage.getItem('id');
    getAllPosts(id);
    document.querySelector('.button-user').addEventListener('click', function(event){
        sessionStorage.removeItem('id');
    });
}())


function showPosts(response){
    for(let post of response){
        console.log(post);
        let tableBodyUser = document.querySelector('.table-body-user');
        let elementPost = document.createElement("tr");
        elementPost.innerHTML = `
            <td>${post.title}</td>
            <td>${post.body}</td>
        `;
        tableBodyUser.append(elementPost);
    }
}

function getAllPosts(id){
    let request = new XMLHttpRequest();
    request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    request.send();
    request.onload = function(){
        let data = JSON.parse(request.response);
        let requestDataUser = new XMLHttpRequest();
            requestDataUser.open("GET", `https://jsonplaceholder.typicode.com/users/${id}`);
            requestDataUser.send();
            requestDataUser.onload = function(){
                let dataUser = JSON.parse(requestDataUser.response);
                document.querySelector(".user-name").textContent = `${dataUser.name} Posts`;
            }
        showPosts(data);
    }
}