//profile info appears here
const overview = document.querySelector(".overview");
const username = "preich-work";
const reposList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToGallery = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");



const getData = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
}

getData();

const displayUserInfo = function (data){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;

  overview.append(div);
  getRepos();
};

const getRepos = async function (){
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
const repoData = await fetchRepos.json();
displayRepos(repoData);
};



const displayRepos = function (repos){
    filterInput.classList.remove("hide");
    for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    reposList.append(repoItem);
}};

reposList.addEventListener("click", function (e){
    if (e.target.matches("h3"))
    {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName){
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
  
    
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        
         }
displayRepoInfo (repoInfo, languages);
         
        };

const displayRepoInfo = function (repoInfo, languages) {
    
    repoData.innerHTML= "";

repoData.classList.remove("hide");
repoSection.classList.add("hide");
backToGallery.classList.remove("hide");

const div = document.createElement("div");
div.innerHTML =
`<h3>Name: ${repoInfo.name}</h3>
<p>Description: ${repoInfo.description}</p>
<p>Default Branch: ${repoInfo.default_branch}</p>
<p>Languages: ${languages.join(", ")}</p>
<a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

repoData.append(div);
    };

    backToGallery.addEventListener("click", function (){
        backToGallery.classList.add("hide");
        repoData.classList.add("hide");
        repoSection.classList.add("show");

    });

    filterInput.addEventListener("input", function(e){
        const searchText = e.target.value;
        const repos = document.querySelectorAll(".repo");
        const searchLowerText = searchText.toLowerCase();
    
    
    for (const repo of repos){
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchText)) {
            repo.classList.remove("hide");         }
            else {
                repo.classList.add("hide");
            }
    }});
    