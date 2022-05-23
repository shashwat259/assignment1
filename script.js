import data from "./data.json" assert { type: "json" };

const article = document.querySelector("article");
var position = 0;

//this function handles the string which is too long
const limitLength = (item) => {
  if (item.length <= 32) return item;
  const newString = item.slice(0, 16) + "..." + item.slice(-16);
  return newString;
};
//creating a div element for every image item
data.forEach((item) => {
  const newItem = document.createElement("div");
  newItem.classList.add("innerDiv");
  newItem.innerHTML = `
 <img src=${item.previewImage} alt="img" class="itemIMG">
  <div>${limitLength(item.title)}</div>
    `;
  newItem.setAttribute("id", position);
  position++;
  article.append(newItem);
});

const main = document.querySelector("main");
position = 0;
const figure = document.createElement("figure");
figure.innerHTML = `
<img src=${data[0].previewImage} alt="img" >`;
main.append(figure);

const nameFigure = document.createElement("textarea");
nameFigure.value = data[0].title;
figure.append(nameFigure);

const listitems = document.querySelectorAll("article .innerDiv");
listitems[0].classList.add("selected");

//adding click event to all the image items
listitems.forEach((item) => {
  item.addEventListener("click", (e) => {
    position = item.id;
    listitems.forEach((item2) => {
      item2.classList.remove("selected");
    });
    item.classList.add("selected");
    figure
      .querySelector("img")
      .setAttribute("src", item.querySelector("img").src);
    nameFigure.value = data[position].title;
  });
});

//handling the press upArrow event
document.addEventListener("keydown", (e) => {
  if (e.code == "ArrowUp") {
    if (position > 0) {
      position--;
      listitems.forEach((item) => {
        item.classList.remove("selected");
      });
      listitems[position].classList.add("selected");
      figure
        .querySelector("img")
        .setAttribute("src", listitems[position].querySelector("img").src);
      nameFigure.value = data[position].title;
    }
  }
});

//handling the press downArrow event
document.addEventListener("keydown", (e) => {
  if (e.code == "ArrowDown") {
    if (position < listitems.length - 1) {
      position++;
      listitems.forEach((item) => {
        item.classList.remove("selected");
      });
      listitems[position].classList.add("selected");
      figure
        .querySelector("img")
        .setAttribute("src", listitems[position].querySelector("img").src);
      nameFigure.value = data[position].title;
    }
  }
});

nameFigure.addEventListener("input", (e) => {
  //handling the case when some change is made in the image name
  listitems[position].querySelector("div").innerHTML = `${limitLength(
    e.target.value
  )}`;
  data[position].title = e.target.value;
});
