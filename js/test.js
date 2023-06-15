let count = 0;
const magic = (colors) => {
    document.getElementById("test-title").style.color = colors[Math.floor(Math.random()*colors.length)];
    count++;
    console.log(count);

    if (count == 5) {
        document.getElementById("test-title").removeEventListener("click", changeColor);
    }
}

function changeColor () {
    return magic(["red", "blue", "yellow", "green", "violet"]);
}

document.getElementById("test-title").addEventListener("click", changeColor);