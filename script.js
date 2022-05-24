import data from "./data.json" assert { type: "json" };
import left_cont from "./left.js";
import right_cont from "./right.js";
var position = 0;
var size;
var threshold;

const limitlength = (item, element) => {
  //fontsize of the innerdiv
  var style = window
    .getComputedStyle(element, null)
    .getPropertyValue("font-size");
  size = parseFloat(style);
  //calculating the threshold string length
  const check = document.createElement("div");
  check.classList.add("check");
  check.style.fontSize = size + "px";
  check.style.whiteSpace = "nowrap";
  check.style.overflow = "hidden";
  check.style.width = "260px";
  document.querySelector("body").append(check);
  var str = "0";
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
  var newstr =
    item.slice(0, (threshold - 3) / 2) +
    "..." +
    item.slice(-(threshold - 3 - (threshold - 3) / 2));
  return newstr;
};

const listitems = left_cont.querySelectorAll(".innerDiv");
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
    right_cont
      .querySelector(".rightimg")
      .setAttribute("src", data[position].previewImage);
    right_cont.querySelector(".caption").value = data[position].title;
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
  right_cont
    .querySelector(".rightimg")
    .setAttribute("src", data[position].previewImage);
  right_cont.querySelector(".caption").value = data[position].title;
});
//changing the caption in the right column and reflecting in the left section too
const caption = right_cont.querySelector(".caption");
caption.addEventListener("input", (e) => {
  listitems[position].querySelector(".imagelabel").innerText = limitlength(
    e.target.value,
    listitems[position]
  );
  data[position].title = e.target.value;
});
//to update the web after changing the font size
document.addEventListener("mouseover", (e) => {
  listitems.forEach((item) => {
    item.querySelector(".imagelabel").innerText = limitlength(
      data[item.id].title,
      item
    );
  });
});
