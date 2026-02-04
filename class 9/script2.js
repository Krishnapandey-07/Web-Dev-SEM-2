const grandparent = document.querySelector("#grandparent")
const parent = document.querySelector("#parent")
const btn1 = document.querySelector("#btn")
const btn2 = document.querySelector("#btn2")
const list = document.querySelector("#list")

grandparent.addEventListener("click", () => {
    li = document.createElement("li")
    li.innerText = "Grandparent in bubbling phase"
    list.appendChild(li)
}, false)

grandparent.addEventListener("click", () => {
    li = document.createElement("li")
    li.innerText = "Grandparent in capturing phase"
    list.appendChild(li)
}, true)

parent.addEventListener("click", () => {
    li = document.createElement("li")
    li.innerText = "Parent in bubbling phase"
    list.appendChild(li)
}, false)


parent.addEventListener("click", () => {
    li = document.createElement("li")
    li.innerText = "Parent in capturing phase"
    list.appendChild(li)
}, true)

btn1.addEventListener("click", () => {
    li = document.createElement("li")
    li.innerText = "btn1 in bubbling phase"
    list.appendChild(li)
}, false)


btn1.addEventListener("click", () => {
    li = document.createElement("li")
    li.innerText = "btn1 in bubbling phase"
    list.appendChild(li)
}, true)


btn2.addEventListener("click", () => {
    list.innerHTML = "";
});
