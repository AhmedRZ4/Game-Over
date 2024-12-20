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
    if (flag) { loaderLayer.classList.replace("d-none", "d-block"); }
    else {
        loaderLayer.classList.replace("d-block", "d-none");
    }
}
