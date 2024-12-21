import {displayLoader,displaySection} from "./ui.js"
// detiles class
class SectionDetiles {
    static #count=0;
    constructor() {
    
        this.exit = document.querySelector("#detiles button");
        this.image = document.querySelector("#detiles img");
        this.title = document.querySelector("#detiles h3 span");
        this.category = document.querySelector("#detiles #description p:nth-child(1) span");
        this.Platform = document.querySelector("#detiles #description p:nth-child(2) span");
        this.Status = document.querySelector("#detiles #description p:nth-child(3) span");
        this.detiles = document.querySelector("#detiles #description p:nth-child(4)");
        SectionDetiles.#count++;
        this.link = document.querySelector("#detiles a");
        this.exit.addEventListener("click", () => {
            displaySection("card", true);
            displaySection("detiles", false);
        });
    }
    static get count(){
        return SectionDetiles.#count;
    }
}
// show detiles
export default function showDetiles(source) {
    displayLoader(true);
    addDetiles(source);
    displaySection("card", false);
    displaySection("detiles", true);
    displayLoader(false);
}
// add detiles
const game = new SectionDetiles();
function addDetiles(gameData) {  
    console.log("Number of object created: "+SectionDetiles.count);
    game.title.innerHTML = gameData.title;
    game.image.src = gameData.thumbnail;
    game.Platform.innerHTML = gameData.platform;
    game.Status.innerHTML = gameData.status;
    game.category.innerHTML = gameData.genre;
    game.detiles.innerHTML = gameData.description;
    game.link.href = gameData.game_url;
}
