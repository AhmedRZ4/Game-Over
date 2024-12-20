import {displayLoader,displaySection} from "./ui.js"
import {displayByCategory,getData,addData,getGameId} from "./cardsData.js"
const conatinerCard = document.getElementById("container");
const cat = document.querySelectorAll("a.nav-link");
// display category by default
(async function (){
    displayLoader(true);
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg`;
    await addData(await getData(url),conatinerCard);
    getGameId();
    displayLoader(false);
})();
// display specific category 
(async function(){
    displayLoader(true);
    displayByCategory(cat,conatinerCard);
    displayLoader(false);
})();

