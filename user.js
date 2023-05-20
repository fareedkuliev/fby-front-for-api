let localhost = 'http://127.0.0.1:8000' // Change here. Write your actual port

const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get('user_id');
async function getUsersProject(id){
    let projectsRes = await fetch(localhost + '/api/projects?user_id=' + id);
    let userRes = await fetch(localhost + '/api/users/' + id);

    let dataUser = await userRes.json();
    let data = await projectsRes.json();

    data.forEach((userProject)  => {
            document.querySelector('.project-list').innerHTML += `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h4 class="card-title"> ${dataUser.firstName} ${dataUser.lastName} </h4>
                <h5 class="card-title">  ${userProject.title} </h5>
                <h6 class="card-title">  ${userProject.description} </h6>
                <a href="#" class="card-link" onclick="deleteProject(${userProject.id})"> <span class="text-danger">Delete</span> </a>
                <a href="#" class="card-link" onclick="getProjectMilestones(${userProject.id})"> Project's milestones </span> </a>
            </div>
        </div>
`
    })
}

getUsersProject(user_id);

async function deleteProject(user_id){
    let projectsRes = await fetch(localhost + '/api/project/delete/' + `${user_id}`,{
        method: "DELETE"
    });

    let project = await projectsRes.json()

    if(project.status === true){
        location.reload();
    }
}

async function getProjectMilestones(project_id) {
    let projectMilestones = await fetch(localhost + `/api/milestones/${project_id}`, {
        method: 'GET'
    });


    let milestones = await projectMilestones.json();

    // console.log(milestones[0].project);


    let htmlCode = `<h4 class="row card-title"> Milestones </h4>
                            <div class="form-group">
                                <label for="inputTitle"></label>
                                <input type="text" class="form-control" id="inputTitle" placeholder="Title">
                            </div>
                            <div class="form-group">
                                <label for="inputDescription"></label>
                                <input type="text" class="form-control" id="inputDescription" placeholder="Description">
                             </div>
                             <div class="form-group">
                                <label for="inputDate"></label>
                                <input type="text" class="form-control" id="inputDate" placeholder="Deadline (YYYY-MM-DD 00:00:00)">
                             </div>
                             <button class="btn btn-block" onclick="addMilestone('${milestones[0].project}')"> Add </button>`
    milestones.forEach((mile) => {
        htmlCode += `
            <div class="row">
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"> ${mile.title} </h5>
                <h6 class="card-title"> ${mile.description} </h6>
                <a href="#" class="card-link" onclick="deleteMilestone(${mile.id})"> <span class="text-danger">Delete</span> </a>
                </div>
                </div>
                </div>
  `
    })
    document.querySelector('.project-milestone').innerHTML = htmlCode;
}

async function deleteMilestone(id){

    let projectMilestones = await fetch(localhost + '/api/milestone/delete/' + `${id}`, {
        method: 'DELETE'
    });

    let data = await projectMilestones.json()

    if(data.status === true){
        location.reload();
    }
}

async function addMilestone(project_id){

    const project = project_id;
    const title = document.getElementById('inputTitle').value;
    const description = document.getElementById('inputDescription').value;
    const date = document.getElementById('inputDate').value;

    let dataToPost = {
        "project_id" : `${project}`,
        "title": `${title}`,
        "description": `${description}`,
        "deadline": `${date}`
    }

    let postMilestone = await fetch(localhost + '/api/milestone', {
        method: "POST",
        body: JSON.stringify(dataToPost)
    });

    let data = await postMilestone.json();

    if(data.status === true) {
        location.reload();
    }
}