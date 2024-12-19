const cat = document.querySelectorAll("a.nav-link");
const loaderLayer = (document.getElementsByClassName("loading"))[0];
const conatinerCard = document.getElementById("container");
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '223b8020afmsh17cb810f82d2033p1674a9jsndc8a3370c63d',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
};
let data = [];
(async function(){
    displayLoader(true);
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg`;
    data = await getData(url);
    addData(data);
    displayLoader(false);
})();
    

// fetch data by category
async function getData(url) {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}
// 
cat.forEach((item) => {
    item.addEventListener("click", async (e) => {
        displayLoader(true);
        // active effect      
        document.querySelector(".nav-item a.active").classList.remove("active");
        const category = e.target.getAttribute('data-Category');
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
        data = await getData(url);
        addData(data);
        getGameId();
        e.target.classList.add("active");
        displayLoader(false);

    })
})
// loader effict
function displayLoader(flag) {
    if (flag) { loaderLayer.classList.replace("d-none", "d-block"); }
    else {
        loaderLayer.classList.replace("d-block", "d-none");
    }
}
// card items
function addData(source) {
    let cartoona = ""
    source.forEach(item => {
        let len = String(item.short_description).length
        cartoona += `<div class="col-sm-6 col-md-4 col-lg-3 px-3" data-Id="${item.id}">
          <div class="card px-2 bg-transparent ">
            <figure class="pt-3 px-2 mb-0">
              <img src="${item.thumbnail}" class="card-img-top " alt="${item.title}">
            </figure>
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center ">
                <h3 class="fs-6">${item.title}</h3>
                <span class="badge text-bg-primary p-2">Free</span>
              </div>
              <p class="card-text small text-center text-white-50 ">${String(item.short_description).slice(0, len >= 80 ? 80 : len)}</p>
            </div>
            <div class="card-footer d-flex justify-content-between text-center">
              <span class="text-white rounded-2 text-bg-secondary p-2 fa-2xs">${item.genre}</span>
              <span class="text-white rounded-2 text-bg-secondary p-2 fa-2xs">${item.platform}</span>
            </div>
          </div>
        </div>   
        `
    })
    conatinerCard.innerHTML = cartoona;
}
// get game id
function getGameId() {
    const allGame = document.querySelectorAll("[data-Id]")
    let id = "";
    allGame.forEach(child => {
        child.addEventListener("click", (e) => {
            showDetiles(child.getAttribute("data-Id"));
        });
    });
}
// show detiles
async function showDetiles(id) {
    displayLoader(true);
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const gamedDetiles = await getData(url);
    addDetiles(gamedDetiles);
    displaySection("card", false);
    displaySection("detiles", true);
    displayLoader(false);
}
// detiles class
class SectionDetiles {
    constructor() {
        this.exit = document.querySelector("#detiles button");
        this.image = document.querySelector("#detiles img");
        this.title = document.querySelector("#detiles h3 span");
        this.category = document.querySelector("#detiles #description p:nth-child(1) span");
        this.Platform = document.querySelector("#detiles #description p:nth-child(2) span");
        this.Status = document.querySelector("#detiles #description p:nth-child(3) span");
        this.detiles = document.querySelector("#detiles #description p:nth-child(4)");
        this.link = document.querySelector("#detiles a");
        this.exit.addEventListener("click", () => {
            displaySection("card", true);
            displaySection("detiles", false);
        });
    }

}
// change section state
function displaySection(name, flag) {
    if (flag) {
        document.getElementById(name).classList.remove("d-none");
        document.getElementById(name).classList.add("d-block");
    }
    else {
        document.getElementById(name);
        document.getElementById(name).classList.add("d-none");
        document.getElementById(name).classList.remove("d-block");
    }
}
// add detiles
function addDetiles(gameData) {
    const game = new SectionDetiles();
    game.title.innerHTML = gameData.title;
    game.image.src = gameData.thumbnail;
    game.Platform.innerHTML = gameData.platform;
    game.Status.innerHTML = gameData.status;
    game.category.innerHTML = gameData.genre;
    game.detiles.innerHTML = gameData.description;
    game.link.href = gameData.game_url;
}

