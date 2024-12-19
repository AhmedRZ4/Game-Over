const loaderLayer=(document.getElementsByClassName("loading"))[0];
export function showLoad(){
    loaderLayer.classList.replace("d-none","d-block");
}

export function hideLoad(){
    loaderLayer.classList.replace("d-block","d-none");
}


export class data{
    displayData() {
        
    }
    displayDetiles(){

    }
}