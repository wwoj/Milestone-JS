let baseContainer;
let buttonAdd;
let addForm;
let upForm;
let navBtnDelete;
let navBtnUpdate;

let addFilmTitle;
let addFilmYear;
let addFilmRate;
let addFilmPicture;
let addButton;

let upFilmTitle;
let upFilmYear;
let upFilmRate;
let upFilmPicture;
let upButton;

let sectionDetails;
let filmPoster;
let hTitle;
let hYear;
let hRate;
let cast;
let description;

let updDiv;
let addDiv;
let navBtnAdd;

let searchFilm;
let navBtnFind;
let searchInputDiv;
let navBtnSort;

let closePopUp;

let rateUP;
let rateDown;
let yearUP;
let yearDown;

const MOVIES_url =
  "https://us-central1-itfighters-movies.cloudfunctions.net/api/movie";
let UPD_URL;
let moviesArray = [];
window.onload = () => {
  getDOM();
  connectToSever();
  addEventSortBtn();
  addForm.onsubmit = elem => {
    elem.preventDefault();
  };
  upForm.onsubmit = elem => {
    elem.preventDefault();
  };
  buttonAdd.addEventListener("click", () => {
    addfilm(
      addFilmTitle.value,
      addFilmYear.value,
      addFilmRate.value,
      addFilmPicture.value
    );
    updDiv.style.visibility = "hidden";
  });
  upButton.addEventListener("click", () => {
    upDateFilm(
      upFilmTitle.value,
      upFilmYear.value,
      upFilmRate.value,
      upFilmPicture.value
    );
  });
  let addChecked = false;
  navBtnAdd.addEventListener("click", () => {
    if (addChecked) {
      addChecked = false;
      addDiv.style.visibility = "hidden";
    } else {
      addChecked = true;
      addDiv.style.visibility = "visible";
    }
    findChecked = false;
    searchInputDiv.style.visibility = "hidden";
    updateChecked = false;
    updDiv.style.visibility = "hidden";
  });
  let deleteChecked = false;
  navBtnDelete.addEventListener("click", () => {
    let visibilityVal;
    let deleteBtns = document.getElementsByClassName("button-delete");
    let updateBtns = document.getElementsByClassName("button-update");
    if (deleteChecked) {
      deleteChecked = false;
      visibilityVal = "hidden";
    } else {
      deleteChecked = true;
      visibilityVal = "visible";
    }

    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].style.visibility = visibilityVal;
      updateBtns[i].style.visibility = "hidden";
    }
    updateChecked = false;
  });
  /////
  let findChecked = false;
  navBtnFind.addEventListener("click", () => {
    let deleteBtns = document.getElementsByClassName("button-delete");
    let updateBtns = document.getElementsByClassName("button-update");
    if (findChecked) {
      findChecked = false;
      searchInputDiv.style.visibility = "hidden";
    } else {
      findChecked = true;
      searchInputDiv.style.visibility = "visible";
    }

    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].style.visibility = "hidden";
      updateBtns[i].style.visibility = "hidden";
    }
    updateChecked = false;
    updDiv.style.visibility = "hidden";

    addDiv.style.visibility = "hidden";
  });

  closePopUp.addEventListener("click", () => {
    sectionDetails.style.visibility = "hidden";
  });
  //////
  let updateChecked = false;
  navBtnUpdate.addEventListener("click", () => {
    console.log(updateChecked);
    let visibilityVal;
    let deleteBtns = document.getElementsByClassName("button-delete");
    let updateBtns = document.getElementsByClassName("button-update");
    if (updateChecked) {
      updateChecked = false;
      updDiv.style.visibility = "hidden";
      visibilityVal = "hidden";
    } else {
      updateChecked = true;

      visibilityVal = "visible";
    }

    for (let i = 0; i < updateBtns.length; i++) {
      updateBtns[i].style.visibility = visibilityVal;
      deleteBtns[i].style.visibility = "hidden";
    }
    deleteChecked = false;
    findChecked = false;
    searchInputDiv.style.visibility = "hidden";
  });
  searchFilm.addEventListener("input", () => {
    searchFilms(searchFilm.value);
  });
  navBtnSort.addEventListener("click", () => {
    //alert("cosik")
    //sortByRate();
  });
};

function connectToSever() {
  fetch(MOVIES_url)
    .then(resp => {
      return resp.json();
    })
    .then(jsresp => {
      moviesArray = jsresp;

      moviesArray.sort((a, b) => (a.title > b.title ? 1 : -1));
      moviesArray.forEach(element => {
        createDivList(
          element.imgSrc,
          element.title,
          element.year,
          element.rate,
          element.id
        );
      });
    })
    .catch(error => {
      alert(error.status);
    });
}

function createDivList(imgUrl, title, year, rate, id) {
  let divFilmPreview = document.createElement("div");
  divFilmPreview.setAttribute("id", id);
  divFilmPreview.setAttribute("class", "film-preview blue");
  //Create div for picture
  let divPic = document.createElement("div");
  divPic.setAttribute("class", "div-picture black");
  //console.log(imgUrl);
  let tempIMG;
  fetch(imgUrl)
    .then(res => {
      if (res.ok) {
        tempIMG = imgUrl;

        divPic.style.backgroundImage = `url(${tempIMG})`;
      } else {
        tempIMG = "https://applian.com/img/oops.png";
        divPic.style.backgroundImage = `url(${tempIMG})`;
      }
    })
    .catch(err => {
      console.log("error fetch");
    });

  //create div for film info
  let divFilmInfo = document.createElement("div");
  divFilmInfo.setAttribute("class", "film-info");
  let filmTitle = document.createElement("div");
  filmTitle.setAttribute("class", "film-title");
  filmTitle.innerText = title;
  filmTitle.addEventListener("click", function(e) {
    let objID = e.target.parentNode.parentNode.id;
    UPD_URL = MOVIES_url + "/" + objID;
    alert("Film info");
    sectionDetails.style.visibility = "visible";
    searchDetails();
  });
  let filmRate = document.createElement("div");
  filmRate.setAttribute("class", "film-rate");
  filmRate.innerText = rate;
  let filmYear = document.createElement("div");
  filmYear.setAttribute("class", "film-year");
  filmYear.innerText = year;
  //let deleteButton = createDeleteButton(id);
  let deletebutton = document.createElement("button");
  deletebutton.innerText = "Delete Item ";
  deletebutton.setAttribute("class", "button-delete btn btn-dark");
  deletebutton.addEventListener("click", () => {
    fetch(MOVIES_url + "/" + id, {
      method: "DELETE"
    })
      .then(() => {
        alert("Deleted");
        refreshDiv();
      })
      .catch(err => {
        alert("Item not deleted, fetch error.");
      });
  });
  let updateButton = document.createElement("button");
  updateButton.innerText = "Update Item ";
  updateButton.setAttribute("class", "button-update btn btn-dark");
  updateButton.onclick = function(e) {
    let objID = e.target.parentNode.parentNode.id;
    UPD_URL = MOVIES_url + "/" + objID;
    alert(UPD_URL);
    copyUpData();
    updDiv.style.visibility = "visible";
    findChecked = false;
    searchInputDiv.style.visibility = "hidden";
  };
  divFilmInfo.appendChild(filmTitle);
  divFilmInfo.appendChild(filmYear);
  divFilmInfo.appendChild(filmRate);
  divFilmInfo.appendChild(deletebutton);
  divFilmInfo.appendChild(updateButton);

  divFilmPreview.appendChild(divPic);
  divFilmPreview.appendChild(divFilmInfo);
  baseContainer.appendChild(divFilmPreview);
}
// Get objects from dom
function getDOM() {
  buttonAdd = document.getElementById("addButton");
  baseContainer = document.getElementById("baseContainer");
  addForm = document.getElementById("addForm");
  addFilmTitle = document.getElementById("addFilmTitle");
  addFilmYear = document.getElementById("addFilmYear");
  addFilmRate = document.getElementById("addFilmRate");
  addFilmPicture = document.getElementById("addFilmPicture");
  addButton = document.getElementById("addButton");
  navBtnDelete = document.getElementById("navBtnDelete");
  navBtnUpdate = document.getElementById("navBtnUpdate");

  upForm = document.getElementById("upForm");
  upFilmTitle = document.getElementById("upFilmTitle");
  upFilmYear = document.getElementById("upFilmYear");
  upFilmRate = document.getElementById("upFilmRate");
  upFilmPicture = document.getElementById("upFilmPicture");
  upButton = document.getElementById("upButton");

  sectionDetails = document.getElementById("sectionDetails");
  filmPoster = document.getElementById("filmPoster");
  hTitle = document.getElementById("hTitle");
  hYear = document.getElementById("hYear");
  hRate = document.getElementById("hRate");
  cast = document.getElementById("cast");
  description = document.getElementById("description");

  updDiv = document.getElementById("updDiv");
  addDiv = document.getElementById("addDiv");
  navBtnAdd = document.getElementById("navBtnAdd");

  searchFilm = document.getElementById("searchFilm");
  navBtnFind = document.getElementById("navBtnFind");
  searchInputDiv = document.getElementById("searchInputDiv");
  closePopUp = document.getElementById("closePopUp");
  navBtnSort = document.getElementById("navBtnSort");

  // sorting

  rateUP = document.getElementById("rateUP")
  rateDown = document.getElementById("rateDown");
  yearUP = document.getElementById("yearUP");
  yearDown = document.getElementById("yearDown");
}

function addfilm(titleIn, yearIn, rateIn, pictureIn) {
  fetch(MOVIES_url, {
    method: "post",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      title: titleIn,
      year: yearIn,
      rate: rateIn,
      imgSrc: pictureIn
    })
  })
    .then(resp => {
      refreshDiv();
    })
    .catch(err => {
      alert("Nie udalo sie :(");
    });
}
function createDeleteButton(id) {
  let deletebutton = document.createElement("button");
  deletebutton.innerText("usun");
  deletebutton.addEventListener("click", () => {
    fetch(MOVIES_url + "/" + id, {
      method: "DELETE"
    }).then(() => {
      alert("Usunalem ziomus");
    });
  });
  return deletebutton;
}

function refreshDiv() {
  baseContainer.innerText = "";
  connectToSever();
}

function upDateFilm(titleN, yearN, rateN, imgSrcN) {
  fetch(UPD_URL, {
    method: "put",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      title: titleN,
      year: yearN,
      rate: rateN,
      imgSrc: imgSrcN
    })
  })
    .then(() => {
      alert("Data is updated");
      refreshDiv();
    })
    .catch(err => {
      alert("Something goes wrong");
    });
}
function copyUpData() {
  fetch(UPD_URL)
    .then(element => {
      return element.json();
    })
    .then(elem => {
      upFilmTitle.value = elem.title;
      upFilmYear.value = elem.year;
      upFilmRate.value = elem.rate;
      upFilmPicture.value = elem.imgSrc;
    });
}

function searchDetails() {
  fetch(UPD_URL)
    .then(element => {
      return element.json();
    })
    .then(elem => {
      let tempIMG;
      fetch(elem.imgSrc)
        .then(res => {
          if (res.ok) {
            filmPoster.style.backgroundImage = `url("${elem.imgSrc}")`;
          } else {
            tempIMG = "https://applian.com/img/oops.png";
            alert(res.ok);
            filmPoster.style.backgroundImage = `url("${tempIMG}")`;
          }
        })
        .catch(err => {
          console.log("error fetch");
        });
      hTitle.innerText = elem.title;
      hYear.innerText = elem.year;
      hRate.innerText = elem.rate;
      cast.innerText = elem.cast;
      description.innerText = elem.description;
    });
}

function searchFilms(text) {
  let searchedTitles = moviesArray.filter(elem => {
    let tempSearchTitle = text.toLowerCase();
    let arayCurrentTitle = elem.title.toLowerCase();
    if (arayCurrentTitle.includes(tempSearchTitle)) {
      return elem;
    }
  });
  baseContainer.innerHTML = "";
  searchedTitles.forEach(element => {
    createDivList(
      element.imgSrc,
      element.title,
      element.year,
      element.rate,
      element.id
    );
  });
}

function sortByRate() {
  console.log(":adsa");
  let newArray = moviesArray.sort((a, b) => (a.rate < b.rate ? 1 : -1));
  console.log(newArray);
}

function addEventSortBtn()
{
  rateUP.addEventListener("click",sortRateUP);
  yearUP.addEventListener("click",sortYearUP);
  rateDown.addEventListener("click",sortRateDown);
  yearDown.addEventListener("click",sortYearDown);

}

function sortRateUP()
{
  baseContainer.innerHTML = "";
  let filmsRateUP = moviesArray.sort((a, b) => (a.rate < b.rate ? 1 : -1));
  filmsRateUP.forEach(element => {
    createDivList(
      element.imgSrc,
      element.title,
      element.year,
      element.rate,
      element.id
    );
  });
}
function sortRateDown()
{
  baseContainer.innerHTML = "";
  let filmsRateUP = moviesArray.sort((a, b) => (a.rate > b.rate ? 1 : -1));
  filmsRateUP.forEach(element => {
    createDivList(
      element.imgSrc,
      element.title,
      element.year,
      element.rate,
      element.id
    );
  });
}
function sortYearUP()
{
  baseContainer.innerHTML = "";
  let filmsRateUP = moviesArray.sort((a, b) => (a.year < b.year ? 1 : -1));
  filmsRateUP.forEach(element => {
    createDivList(
      element.imgSrc,
      element.title,
      element.year,
      element.rate,
      element.id
    );
  });
}
function sortYearDown()
{
  baseContainer.innerHTML = "";
  let filmsRateUP = moviesArray.sort((a, b) => (a.year > b.year ? 1 : -1));
  filmsRateUP.forEach(element => {
    createDivList(
      element.imgSrc,
      element.title,
      element.year,
      element.rate,
      element.id
    );
  });
}

