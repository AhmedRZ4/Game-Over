import showDetiles from "./detiles.js"
// display By Category
export async function displayByCategory(Categories,options,conatinerCard){ Categories.forEach((item) => {
    item.addEventListener("click",async (e) => {
        // active effect      
        document.querySelector(".nav-item a.active").classList.remove("active");
        const category = e.target.getAttribute('data-Category');
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
        const conatinerCard = document.getElementById("container");
        addData(await getData(url),conatinerCard);
        getGameId();
        e.target.classList.add("active");
        return category;
    })
})
}
// fetch data by category
export async function getData(url) {
    try {
      const options = {
          method: 'GET',
          headers: {
              'x-rapidapi-key': '223b8020afmsh17cb810f82d2033p1674a9jsndc8a3370c63d',
              'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
          }
      };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}
// card items
export function addData(source,displayElement) {
    let cartoona = ""
    source.forEach(item => {
        let len = String(item.short_description).length
        cartoona += `<div class="col-md-6 col-lg-4 col-xl-3  px-3" data-Id="${item.id}">
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
    displayElement.innerHTML = cartoona;
}
// get game id
export async function getGameId() {
  const allGame = document.querySelectorAll("[data-Id]")
  // let id = "";
  allGame.forEach(child => {
      child.addEventListener("click",async (e) => {
          const id=e.currentTarget.getAttribute("data-Id")
          const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;  
         showDetiles(await getData(url));
      });
  });
}