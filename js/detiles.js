import {displayLoader,displaySection} from "./ui.js"
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
// show detiles
export default function showDetiles(source) {
    displayLoader(true);
    addDetiles(source);
    displaySection("card", false);
    displaySection("detiles", true);
    displayLoader(false);
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
