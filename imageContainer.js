import data from "./data.json" assert { type: "json" };
//creating the right column for the app
const right_cont = document.querySelector(".rightContainer");

right_cont.innerHTML = `
<img src=${data[0].previewImage} class="rightimg" alt="img">
<textarea class="caption" >${data[0].title}</textarea>
`;

export default right_cont;
