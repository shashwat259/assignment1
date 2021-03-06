import data from "./data.json" assert { type: "json" };
import listContainer from "./listContainer.js";
import imageContainer from "./imageContainer.js";
let position = 0;

const limitlength = (item, element) => {
  //fontsize of the innerdiv
  const style = window
    .getComputedStyle(element, null)
    .getPropertyValue("font-size");
  const size = parseFloat(style);
  //calculating the threshold string length
  const check = document.createElement("div");
  check.style.fontSize = size + "px";
  check.style.whiteSpace = "nowrap";
  check.style.overflow = "hidden";
  check.style.width = "260px";
  document.querySelector("body").append(check);
  let str = "0";
  let threshold;
  for (threshold = 1; ; threshold++) {
    check.innerText = str;
    if (check.scrollWidth > check.clientWidth) {
      break;
    }
    str += "0";
  }
  check.remove();
  if (item.length < threshold) {
    return item;
  }
  const newstr =
    item.slice(0, (threshold - 3) / 2) +
    "..." +
    item.slice(-(threshold - 3 - (threshold - 3) / 2));
  return newstr;
};

const listitems = listContainer.querySelectorAll(".innerDiv");
//selecting the first item by default
listitems[0].focus();

position = 0;

//adding click functionality
listitems.forEach((item) => {
  item.querySelector(".imagelabel").innerText = limitlength(
    data[item.id].title,
    item
  );
  item.addEventListener("click", (e) => {
    position = item.id;
    imageContainer
      .querySelector(".rightimg")
      .setAttribute("src", data[position].previewImage);
    imageContainer.querySelector(".caption").value = data[position].title;
  });
});

//adding up and down functionality
document.addEventListener("keydown", (e) => {
  if (e.code == "ArrowDown") {
    position++;
    if (position == data.length) position = 0;
  } else if (e.code == "ArrowUp") {
    position--;
    if (position < 0) position = data.length - 1;
  } else return;
  listitems[position].focus();
  imageContainer
    .querySelector(".rightimg")
    .setAttribute("src", data[position].previewImage);
  imageContainer.querySelector(".caption").value = data[position].title;
});
//changing the caption in the right column and reflecting in the left section too
const caption = imageContainer.querySelector(".caption");
caption.addEventListener("input", (e) => {
  listitems[position].querySelector(".imagelabel").innerText = limitlength(
    e.target.value,
    listitems[position]
  );
  data[position].title = e.target.value;
});
//to update the web after changing the font size
document.addEventListener("mouseenter", (e) => {
  listitems.forEach((item) => {
    item.querySelector(".imagelabel").innerText = limitlength(
      data[item.id].title,
      item
    );
  });
});
