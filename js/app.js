//Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const inputButton = document.getElementById("input-btn");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

// get items from localStorage
let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  // if (LIST.length === 0) {

  // }
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

// show items on screen
function loadList(array) {
  array.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//clear the localStorage
clear.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
})

//Show today's date
const today = new Date();
const options = { weekday: "long", month: "short", day: "numeric" };
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Add a to-do item in the content area
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                  <i class="far ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                  <i class="far fa-trash-alt de" job="delete" id="${id}"></i>
                </li>
               `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
  const ele = document.createElement("li");
}

inputButton.addEventListener("click", function (event) {
  event.preventDefault();
  const toDo = input.value;
  if (!toDo) {
    return;
  }
  addToDo(toDo, id, false, false);

  LIST.push({
    name: toDo,
    id: id,
    done: false,
    trash: false,
  });
  // Add items to localStorage (This code be added to where LIST is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
  id++;

  input.value = "";
});

//Complete to-do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remove to-do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

// Target the items created dynamically
list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;
  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") {
    removeToDo(element);
  }
  // Add items to localStorage (This code be added to where LIST is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
