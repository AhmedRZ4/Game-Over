import showDetiles from "./detiles.js"
import { displayLoader, displaySection } from "./ui.js";
// display By Category
export async function displayByCategory(Categories, conatinerCard, links) {
  Categories.forEach((item) => {
    item.addEventListener("click", async (e) => {
      // active effect      
      document.querySelector(".nav-item a.active").classList.remove("active");
      const category = e.target.getAttribute('data-Category');
      let { base, option } = getApi(links);
      base = `${base}category=${category}`;
      reomveOldPagination("pagination", "pagin");
      addData(await getData(base, option), conatinerCard);
      e.target.classList.add("active");
      return category;
    })
  })
}
function reomveOldPagination(childId, conatinerId) {
  const padination = document.getElementById(childId);
  if (padination) {
    padination.remove();
    const createNew = `
      <ul class="pagination ms-auto  align-items-center justify-content-center" id="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="First">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&lsaquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&rsaquo;</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Last">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    `
    document.getElementById(conatinerId).innerHTML = createNew;
  }
}
// fetch data by category
export async function getData(url, options) {
  try {
    displayLoader(true);
    const response = await fetch(url, options);
    if (response.status >= 500 && response.status < 599) {
      alert("We are updating our games list. Please try again later... :)");
      return [];
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    displayLoader(false);
  }
}
// card items
export function addData(source, displayElement) {
  // create pagination
  let values = null;
  if (source.length > 12) {
    displaySection("pagin", true);
    values = new Object(source.slice(0, 12));
    values = addCards(values);
    displayLauout(values, displayElement);
    //-----------------------------------------------------------
    const pagination = new Pagination(document.getElementById('pagination'), document.querySelector('[aria-label="First"]'),
      document.querySelector('[aria-label="Previous"]'), document.querySelector('[aria-label="Next"]'), document.querySelector('[aria-label="Last"]')
    );
    Pagination.creatPagination(source, displayElement, pagination, 12, pagination.parent);
    console.log("Number of object Pagination created: "+ Pagination.count());
    //-----------------------------------------------------------
  } else {
    displaySection("pagin", false);
    displayLauout(addCards(source), displayElement);
  }

}
// get game id
export async function getGameId(links) {
  const allGame = document.querySelectorAll("[data-Id]")
  allGame.forEach(child => {
    child.addEventListener("click", async (e) => {
      const id = e.currentTarget.getAttribute("data-Id");
      let { base, option } = getApi(links);
      base = base.replace("games?", "game?");
      base = `${base}id=${id}`;
      showDetiles(await getData(base, option));
    });
  });
}
// pass api values
export function getApi(links) {
  const apiValues = { base: `${links.base.toString()}`, option: links.options };
  return apiValues;
}
// pagination
class Pagination {
  static #count=0
  constructor(Parent, First, Previous, Next, Last) {
    this.parent = Parent;
    this.first = First;
    this.Previous = Previous;
    this.next = Next;
    this.last = Last;
    Pagination.#count++;
  }
  static count(){return Pagination.#count};
  static createChild(text, parentElement) {
    const child = document.createElement("li");
    child.classList.add("page-item");
    const aInner = document.createElement("a");
    aInner.classList.add("page-link");
    aInner.innerHTML = text;
    aInner.href = "#";
    child.appendChild(aInner);
    // child.addEventListener("click", _ => {
    //   console.log("child");
    // })
    parentElement.insertBefore(child, parentElement.children[parentElement.children.length - 2]);
    return aInner;
  }
  static addSlice(element, start, end, conatiner, source) {
    element.value = addCards(new Object(source.slice(start, end)));
    element.addEventListener("click", (e) => {
      document.querySelector("#pagination a.active").classList.remove("active");
      displayLauout(e.currentTarget.value, conatiner);
      e.target.classList.add("active");
    });
  }
  static creatPagination(source, displayElement, sliceElement, partionNum, parentElement) {
    partionNum = Number(partionNum);
    const pagesNum = Number(Math.floor(source.length / partionNum));
    const lastPage = Number(source.length - (pagesNum * partionNum));
    // first page
    Pagination.addSlice(sliceElement.first, 0, partionNum, displayElement, source);
    for (let i = 0; i < pagesNum; ++i) {
      const child = Pagination.createChild(i + 1, parentElement);
      if (i == 0)
        child.classList.add("active");
      Pagination.addSlice(child, (partionNum * i), ((partionNum * i) + (Number(partionNum))), displayElement, source);
    }
    // last page
    if (lastPage != 0) {
      // partion != slice number
      Pagination.addSlice(sliceElement.last, ((source.length) - (lastPage)), (source.length), displayElement, source);
      const child = Pagination.createChild(pagesNum + 1, parentElement);
      Pagination.addSlice(child, ((source.length) - (lastPage)), (source.length), displayElement, source);
    } else {
      // partion == slice number
      Pagination.addSlice(sliceElement.last, ((source.length) - (partionNum)), (source.length), displayElement, source);
    }
  }
}
// add cards
function addCards(source) {
  const values = source.map((item) => {
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
  return values;
}
// display
function displayLauout(source, displayElement) {
  displayElement.innerHTML = source;
}
////////////////////////////////////////note (on click child get number ,  new category clear last pagination)