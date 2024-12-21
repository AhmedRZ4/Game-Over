import showDetiles from "./detiles.js"
import { displayLoader } from "./ui.js";
// display By Category
export async function displayByCategory(Categories,conatinerCard,links){ Categories.forEach((item) => {
    item.addEventListener("click",async (e) => {
        // active effect      
        document.querySelector(".nav-item a.active").classList.remove("active");
        const category = e.target.getAttribute('data-Category');
        let{base,option}=getApi(links);
        base=`${base}category=${category}`;
        addData(await getData(base,option),conatinerCard);      
        e.target.classList.add("active");
        return category;
    })
})
}
// fetch data by category
export async function getData(url,options) {
    try {
      displayLoader(true);
        const response = await fetch(url, options);
        if(response.status>=500 && response.status<599){
          alert("We are updating our games list. Please try again later... :)")
          return [];
        }
        const result = await response.json(); 
        return result;
    } catch (error) {
        console.error(error);
    }finally{
      displayLoader(false);
    }
}
// card items
export function addData(source,displayElement) {      
    const values=source.map((item)=>{
      let len = String(item.short_description).length
        return `<div class="col-md-6 col-lg-4 col-xl-3  px-3" data-Id="${item.id}">
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
        `;  
    }).join("");
    displayElement.innerHTML = values;
}
// get game id
export async function getGameId(links) {
  const allGame = document.querySelectorAll("[data-Id]")
  allGame.forEach(child => {
      child.addEventListener("click",async (e) => {
          const id=e.currentTarget.getAttribute("data-Id");
          let{base,option}=getApi(links);
          base=base.replace("games?","game?");
          base=`${base}id=${id}`;
         showDetiles(await getData(base,option));
      });
  });
}

export function getApi(links){
  const apiValues={base:`${links[1].base.toString()}`,option:links[1].options}
    return apiValues;
}
