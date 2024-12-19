"use strict"
class Card{
    constructor(){
        this.category=document.querySelectorAll("a.nav-link");
    }
}

////////////////////////////////////////////////////////////////////
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '223b8020afmsh17cb810f82d2033p1674a9jsndc8a3370c63d',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
    }
};
let data = []
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
const cat = document.querySelectorAll("a.nav-link");
// categories
cat.forEach((item) => {
    item.addEventListener("click",async (e) => {
        showLoad();
        // active effect      
        document.querySelector(".nav-item a.active").classList.remove("active");
        const category=e.target.getAttribute('data-Category');
        
        // const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
        // console.log(await getData(url));
        e.target.classList.add("active");
        hideLoad();

    })
})