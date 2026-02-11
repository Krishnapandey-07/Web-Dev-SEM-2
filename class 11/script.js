
let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");

let score = 0;

box2.addEventListener("click", function () {

    score++;
    box1.firstChild.textContent = "Score: " + score;

    // Random position
    let randomX = Math.random() * (400 - 50); //300 is box1 width and 50 i is of box2
    let randomY = Math.random() * (600 - 50);

    // Move red box
    box2.style.left = randomX + "px";
    box2.style.top = randomY + "px";

});
