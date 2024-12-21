import { displayLoader, displaySection } from "./ui.js"
import { displayByCategory, getData, addData, getGameId,getApi } from "./cardsData.js"
const conatinerCard = document.getElementById("container");
const cat = document.querySelectorAll("a.nav-link");
// api
const baseUrl = [{
    name: "freeToPlay",
    base: "https://free-to-play-games-database.p.rapidapi.com/api/games?",
    options: {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '223b8020afmsh17cb810f82d2033p1674a9jsndc8a3370c63d',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        }
    }
}, {
    name: "mmoGames",
    base: "https://mmo-games.p.rapidapi.com/games?",
    options: {
        method: 'GET', headers: {
            'x-rapidapi-key': '223b8020afmsh17cb810f82d2033p1674a9jsndc8a3370c63d',
            'x-rapidapi-host': 'mmo-games.p.rapidapi.com'
        }
    }
}]
//display category by default
async function display() {
    let { base, option } = getApi(baseUrl);
    base = `${base}category=mmorpg`;
    await addData(await getData(base, option), conatinerCard);
}
display(baseUrl);
// display specific category
async function displayCAtegory(origin) {
    displayByCategory(cat, conatinerCard, origin);
}
displayCAtegory(baseUrl);
//#region detect new child added
// detect new child added
const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            getGameId(baseUrl);
        }
    });
});
// Define the observer options
const observerOptions = {
    childList: true, // Listen for changes to the list of children
    subtree: false,  // Do not observe changes in descendant nodes
};

// Start observing the target div
observer.observe(conatinerCard, observerOptions);
//#endregion
