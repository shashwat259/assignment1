import data from "./data.json" assert { type: "json" };

var position = 0;
var size;
var threshold;

const limitlength = (item) => {
  if (item.length < threshold) {
    return item;
  }
  var newstr =
    item.slice(0, (threshold - 3) / 2) +
    "..." +
    item.slice(-(threshold - 3 - (threshold - 3) / 2));
  return newstr;
};

//creating the left column for the app
const left_cont = document.querySelector(".leftContainer");
data.forEach((item) => {
  const newdiv = document.createElement("div");
  newdiv.classList.add("innerDiv");
  newdiv.setAttribute("tabindex", -1);
  newdiv.setAttribute("id", position++);
  newdiv.innerHTML = `
  <img class="leftimg" alt="img" src="${item.previewImage}">
  <div class="imagelabel"><div>
  `;
  left_cont.append(newdiv);
  var style = window
    .getComputedStyle(newdiv, null)
    .getPropertyValue("font-size");
  size = parseFloat(style);
});

//calculating the threshold string length
const check = document.createElement("div");
check.classList.add("check");
check.style.fontSize = size + "px";
check.style.whiteSpace = "nowrap";
check.style.overflow = "hidden";
check.style.width = "260px";
document.querySelector("body").append(check);
var str = "0";
for (threshold = 1; threshold < 100; threshold++) {
  check.innerText = str;
  if (check.scrollWidth > check.clientWidth) {
    break;
  }
  str += "0";
}
check.remove();

position = 0;
//creating the right column for the app
const right_cont = document.querySelector(".rightContainer");

right_cont.innerHTML = `
<img src=${data[position].previewImage} class="rightimg" alt="img">
<textarea class="caption" >${data[position].title}</textarea>
`;

const listitems = left_cont.querySelectorAll(".innerDiv");
listitems[0].focus();

//adding click functionality
listitems.forEach((item) => {
  item.querySelector(".imagelabel").innerText = limitlength(
    data[item.id].title
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

const caption = right_cont.querySelector(".caption");
caption.addEventListener("input", (e) => {
  listitems[position].querySelector(".imagelabel").innerText = limitlength(
    e.target.value
  );
  data[position].title = e.target.value;
});
