import data from "./data.json" assert { type: "json" };
var ptr = 0;
//creating the left column for the app
const left_cont = document.querySelector(".leftContainer");
data.forEach((item) => {
  const newdiv = document.createElement("div");
  newdiv.classList.add("innerDiv");
  newdiv.setAttribute("tabindex", -1);
  newdiv.setAttribute("id", ptr++);
  newdiv.innerHTML = `
  <img class="leftimg" alt="img" src="${item.previewImage}">
  <div class="imagelabel"><div>
  `;
  left_cont.append(newdiv);
});
export default left_cont;
