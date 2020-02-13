let baseContainer;
let buttonAdd;
let addForm;
let navBtnDelete;

let addFilmTitle;
let addFilmYear;
let addFilmRate;
let addFilmPicture;
let addButton;

const MOVIES_url =
  "https://us-central1-itfighters-movies.cloudfunctions.net/api/movie";
let moviesArray = [];
window.onload = () => {
  getDOM();
  connectToSever();

  addForm.onsubmit = elem => {
    elem.preventDefault();
  };
  buttonAdd.addEventListener("click", () => {
    addfilm(
      addFilmTitle.value,
      addFilmYear.value,
      addFilmRate.value,
      addFilmPicture.value
    );
    
    //creatingFilmList();
  });
  let deleteChecked =false;
  navBtnDelete.addEventListener("click",()=>{
    let visibilityVal;
    let deleteBtns = document.getElementsByClassName("button-delete");
    if (deleteChecked) 
    {
      deleteChecked = false;
      visibilityVal=  "hidden";
    }
    else
    {
      deleteChecked = true;
      visibilityVal= "visible";
    }
    
    //console.log(deleteBtns)
    for(let i =0; i<deleteBtns.length;i++)
    {
      deleteBtns[i].style.visibility =visibilityVal;
    }
   
  })
};

function connectToSever() {
  fetch(MOVIES_url)
    .then(resp => {
      return resp.json();
    })
    .then(jsresp => {
      moviesArray = jsresp;
      console.log(moviesArray);
      moviesArray.sort((a, b) => (a.title > b.title ? 1 : -1));
      moviesArray.forEach(element => {
        createDivList(
          element.imgSrc,
          element.title,
          element.year,
          element.rate,
          element.id
        );
        //checkIMGURL(element.imgSrc);
        console.log("na zewnatrz", element.imgSrc);
        //console.log(element.imgSrc)
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
  divPic.setAttribute("class", "div-picture red");
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
      console.log(
        "tutaj jestes poza wszystkim https://applian.com/img/oops.png"
      );
    });

  // divPic.style.backgroundImage = `url(${imgUrl})`;
  //create div for film info
  let divFilmInfo = document.createElement("div");
  divFilmInfo.setAttribute("class", "film-info");
  let filmTitle = document.createElement("div");
  filmTitle.setAttribute("class", "film-title");
  filmTitle.innerText = title;
  let filmRate = document.createElement("div");
  filmRate.setAttribute("class", "film-rate");
  filmRate.innerText = rate;
  let filmYear = document.createElement("div");
  filmYear.setAttribute("class", "film-year");
  filmYear.innerText = year;
  //let deleteButton = createDeleteButton(id);
  let deletebutton = document.createElement("button");
  deletebutton.innerText="Delete Item ";
  deletebutton.setAttribute("class","button-delete")
    deletebutton.addEventListener("click",()=>{
  fetch(MOVIES_url + "/" + id, {
    method: "DELETE",
    })
    .then(() => {
        alert("Deleted");
        refreshDiv();
    })
    .catch(err=>{
      console.log("Nie dziala")
    })
  })

  divFilmInfo.appendChild(filmTitle);
  divFilmInfo.appendChild(filmYear);
  divFilmInfo.appendChild(filmRate);
  divFilmInfo.appendChild(deletebutton);
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
  .then(resp=>{
    refreshDiv();
  }).catch(err => {
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

function refreshDiv(){
  baseContainer.innerText = "";
  connectToSever();
}
// const MOVIES_url =
//   "https://us-central1-itfighters-movies.cloudfunctions.net/api/movie";
// let mainFrame;
// let searchButton;
// let searchInput;
// var containerDiv;
// let moviesArray = [];
// let form;
// let titleInput;
// let yearInput;
// let imgInput;
// let addButton
// let inputRate;
// let deleteID;
// window.onload = async () => {
//     let deleteID;
//   await getDOM();
//   await createFilmList();
//   console.log("OK?");
//   //genereteRows();

//   form.onsubmit = elem => {
//     elem.preventDefault();
//   };

//   addButton.addEventListener("click",()=>
//   {
//     addfilm(titleInput.value,yearInput.value,rateInput.value,imgInput.value);
//   })
//   addButton.addEventListener("mouseover",()=>
//   {
//     alert("Myszka jest nad tym LOL")
//   })
// };

// function createFilmList() {
//   return searchMovies()
//     .then(resp1 => {
//       console.log(resp1);
//       moviesArray = resp1;

//       return moviesArray;
//     })
//     .catch(err => {
//       alert("Blad z polaczeniem: ", err.id);
//     });
// }

// function searchMovies() {
//   return fetch(MOVIES_url).then(res => {
//     let wyszukane = res.json();
//     console.log(wyszukane);
//     return wyszukane;
//   });
// }
// function getDOM() {
//   containerDiv = document.getElementById("container");
//   form = document.getElementById("searchForm");
//   titleInput = document.getElementById("titleInput");
//   yearInput = document.getElementById("yearInput");
//   imgInput = document.getElementById("imgInput");
//   addButton = document.getElementById("addButton");
//   rateInput = document.getElementById("rateInput");
// }

// function genereteRows() {
//   console.log(containerDiv);
//   let divAll = document.createElement("div");
//   moviesArray.forEach(element => {
//     let rowDiv = document.createElement("div");
//     rowDiv.setAttribute("class", "tableRows");
//     rowDiv.setAttribute("id", element.id);
//     rowDiv.setAttribute("class", "box, green");
//     let picDiv= document.createElement("div");
//     let imgPlac = document.createElement("img");
//     imgPlac.setAttribute("src", element.imgSrc);
//     imgPlac.setAttribute("alt", "cos");
//     imgPlac.setAttribute("class", "imgPlac");
//     picDiv.appendChild(imgPlac);
//     let infoDiv= document.createElement("div");
//     let pTitle = document.createElement("p");
//     pTitle.setAttribute("class", "pTitle");
//     pTitle.innerText = element.title;
//     let pYear = document.createElement("p");
//     pYear.setAttribute("class", "pYear");
//     pYear.innerText = element.year;
//     let pRate = document.createElement("p");
//     pRate.setAttribute("class", "pRate");
//     pRate.innerText = element.rate;
//     infoDiv.appendChild(pTitle);
//     infoDiv.appendChild(pYear);
//     infoDiv.appendChild(pRate);

//     rowDiv.appendChild(picDiv);
//     rowDiv.appendChild(infoDiv);
//     console.log(rowDiv);
//     divAll.appendChild(rowDiv);
//   });
//   containerDiv.appendChild(divAll);
// }

// function addfilm(titleIn, yearIn,rateIn, pictureIn) {
//   fetch(MOVIES_url, {
//     method: "post",
//     headers: { "Content-type": "application/json; charset=UTF-8" },
//     body: JSON.stringify({ title: titleIn, year: yearIn,rate:rateIn,imgSrc:pictureIn })
//   })
//   .catch(err=>{
//       alert("Nie udalo sie :(")
//   });
// }
