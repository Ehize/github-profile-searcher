//https://api.github.com/users/user_name/repos

//spinner
let spinnerWrapper = document.querySelector('.spinner-wrapper');

window.addEventListener('load', function () {
    //  spinnerWrapper.style.display = "none";
    spinnerWrapper.parentElement.removeChild(spinnerWrapper);
});

const user_img = document.querySelector('.user_img');
const userName = document.querySelector('.user_name h1');
const followers_ = document.querySelector('.followers_ span');
const follow_ = document.querySelector('.follow_ span');
const repo_details = document.querySelector('.repo_details');
const btn_submit = document.querySelector('.btn_submit');

let user_name = "";

//controls what user input in the text box
function inputFunction(){
    let input_user = document.querySelector(".input_user").value.trim();
    //the trim method will replace the before and after white space of the given value

    if (input_user.length <= 0) {
        alert("Please enter github user name");
        document.querySelector(".input_user").value = "";
        document.querySelector(".input_user").focus();
        return false;
    }else{
        user_name = input_user.split("").join("");
        //if everything is ok run fetchUser function
        fetchUser();

        //clear the input box and make it focus for next action
        document.querySelector(".input_user").value = "";
        document.querySelector(".input_user").focus();
    }
};

btn_submit.addEventListener("click", function () {
    inputFunction()
});

//enter button should work if user decides use it
document.querySelector(".input_user").addEventListener("keyup", function(e) {
    if(e.keyCode === 13) {
        // alert("enter");
        inputFunction()
    }
})

//fetch user from github API
function fetchUser(){
fetch(`https://api.github.com/users/${user_name}`)
.then(response => response.json())
.then(function(data) {
    console.log(data); 
    if(data.message === "Not Found"){
        alert("user not found");
        return false;
    }else{
        user_img.innerHTML = `<img src="${data.avatar_url}">`;
        userName.innerHTML = `<a href="${data.html_url}">${data.login}</a>`;
        followers_.innerHTML = data.followers;
        follow_.innerHTML = data.following;
    }
})

//fetching repo
    fetch(`https://api.github.com/users/${user_name}/repos`)
    .then(response => response.json())
    .then(function(repo_data) {
        console.log(repo_data);
        //if user type a random name without a repository
        if(repo_data.length<=0){
            repo_details.innerHTML = `
            <div class="item_">
            <div class="repo_name">No Repo Found</div>
            </div>
           `
        }else{
            //when you type random user with no user and repo found
            if(repo_data.message === "Not Found") {
                repo_details.innerHTML=`
                <div class="item_">
                            <div class="repo_name">repo_name1</div>
                            <div class="repo_details_">
                                <div class="info_ star">
                                  <i class="fa fa-star-o"></i>10
                                </div>
                                <div class="info_ fork">
                                    <p><i class="fas fa-code-branch"></i>30</p>
                                </div>
                                <div class="info_ size">
                                    <p><i class="fa fa-file"></i>3000kb</p>
                                </div>
                            </div>
                        </div>
                `
            user_img.innerHTML = `<img src="images/github.png">`;
            userName.innerHTML = `_____`;
            followers_.innerHTML = "0";
            follow_.innerHTML = "0";
    }else {
       let repo_Data = repo_data.map(item => {
           console.log(item);
           return (
           ` 
           <div class="item_">
                            <div class="repo_name">${item.name}</div>
                            <div class="repo_details_">
                                <div class="info_ star">
                                  <i class="fa fa-star-o"></i>
                                  ${item.watchers}
                                </div>
                                <div class="info_ fork">
                                    <p><i class="fas fa-code-branch"></i>
                                    ${item.forks}</p>
                                </div>
                                <div class="info_ size">
                                    <p><i class="fa fa-file"></i>
                                    ${item.size}kb</p>
                                </div>
                            </div>
                        </div>
                        `
           );

       })
       repo_details.innerHTML = repo_Data.slice(0, 6).join("");  
    } 

  }

  });
}
