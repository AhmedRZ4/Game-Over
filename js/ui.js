const loaderLayer = (document.getElementsByClassName("loading"))[0];
// change section state
export function displaySection(name, flag) {
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
// loader effict
export function displayLoader(flag) {
    if (flag) { 
        document.body.style.overflowY="hidden";
        loaderLayer.classList.replace("d-none", "d-block"); }
    else {
        document.body.style.overflowY="auto";
        loaderLayer.classList.replace("d-block", "d-none");
    }
}
