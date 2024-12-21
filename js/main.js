import { displayLoader, displaySection } from "./ui.js"
import { displayByCategory, getData, addData, getGameId, getApi } from "./cardsData.js"
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
},
    {
        name: "mmoGames",
        base: "https://mmo-games.p.rapidapi.com/games?",
        options: {
            method: 'GET', headers: {
                'x-rapidapi-key': '223b8020afmsh17cb810f82d2033p1674a9jsndc8a3370c63d',
                'x-rapidapi-host': 'mmo-games.p.rapidapi.com'
            }
        }
    }
]
// check apis availabilities,return live api
async function checkConnection(links, timeout) {
    displayLoader(true);
    for (const item of links) {
        let link = null;
        // set time out
        const controller = new AbortController();
        const signal = controller.signal;
        // Set a timeout to abort the request
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, timeout);
        // take copy of main object , add timeout to options 
        link = JSON.stringify(item);
        link = JSON.parse(link);
        Object.defineProperty(link.options, "signal", { value: signal });
        // request
        try {
            console.log(`Trying to connect to the server ${link.name}....`)
            const request = await fetch(link.base, link.options);
            clearTimeout(timeoutId);
            if (request.ok) {
                console.log(`Connecting to server ${link.name} successfully.`);
                return item;
            }
        } catch (error) {
            console.log(`No response from the server ${link.name}.`);
        }
    }
    console.error("All APIs failed to connect.");
    alert("We are updating our games list. Please try again later... :)");
    return null;
}
const activeApi = await checkConnection(baseUrl, 5000);
//display category by default
async function display() {
    if (activeApi) {
        displaySection("card", false);
        let { base, option } = await getApi(activeApi);
        base = `${base}category=mmorpg`;
        await addData(await getData(base, option), conatinerCard);
        displaySection("card", true);
    }
    displayLoader(false);
}
display(activeApi);
// display specific category
async function displayCAtegory(origin) {
    displayByCategory(cat, conatinerCard, origin);
}
displayCAtegory(activeApi);
//#region detect new child added
// detect new child added
const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            getGameId(activeApi);
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

