let localhost = 'http://127.0.0.1:8000';
async function getUsers(){
    let res = await fetch(localhost + '/api/users');
    let data = await res.json();

    data.forEach((dataUser) => {
        document.querySelector('.user-list').innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h4 class="card-title">${dataUser.firstName} ${dataUser.lastName}</h4>
                <h5 class="card-title">Email: ${dataUser.email}</h5>
                <h5 class="card-title"> Number of projects: <button href="user.html" class="card-link" onclick="redirectTo(${dataUser.id})"> ${dataUser.numberOfProjects} </button></h5>
                <a href="#" class="card-link" onclick="deleteUser(${dataUser.id})"> <span class="text-danger">Delete</span> </a>
            </div>
        </div>
`
    })
}

getUsers();

function redirectTo(user_id){
    window.location.href = 'user.html?user_id=' + user_id;
}

async function deleteUser(id){
   let response = await fetch (localhost + '/api/user/delete/' + `${id}`, {
       method:'DELETE'
   })

    let data = await response.json();
    if(data.status === true){
        location.reload();
    }
}
