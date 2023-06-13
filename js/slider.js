const cards = document.getElementsByClassName("card");
// let currentCard = 0;
let fields = [[3, "prev-picture"], [0, "current"], [1, "next-picture"]]

const switchCards = (n) => {
  //remove Eventlistener
  document.getElementsByClassName("next-picture")[0].removeEventListener("click", switchForward);
  document.getElementsByClassName("prev-picture")[0].removeEventListener("click", switchBackward);
  
  //remove classes
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList = "card";
  }

  //set positions
  for (let i = 0; i < fields.length; i++) {
    let currentPosition = fields[i][0] + n;

    if (currentPosition >= cards.length) {
      currentPosition = currentPosition - cards.length
    } else if (currentPosition < 0) {
      currentPosition = cards.length + currentPosition
    };

    fields[i][0] = currentPosition;
    
    cards[fields[i][0]].classList.add(fields[i][1]);
  }

  // fill circles
  const circles = document.getElementById("card-position-range").children;

  for (let i = 0; i < circles.length; i++) {
    circles[i].classList = "";
  }

  for (let i = 0; i < fields[1][0] + 1; i++) {
    circles[i].classList.add("filled");
  }

  //add eventlisteners
  document.getElementsByClassName("next-picture")[0].addEventListener("click", switchForward);
  document.getElementsByClassName("prev-picture")[0].addEventListener("click", switchBackward);
}



//helper functions
const switchForward = () => switchCards(1);
const switchBackward = () => switchCards(-1);

const circleNav = (element) => {
  let childIndex = [...element.parentNode.children].indexOf(element);
  switchCards(childIndex - fields[1][0]);
}


//eventlisteners
document.getElementById("next").addEventListener("click", switchForward);
document.getElementsByClassName("next-picture")[0].addEventListener("click", switchForward);
document.getElementById("prev").addEventListener("click", switchBackward);
document.getElementsByClassName("prev-picture")[0].addEventListener("click", switchBackward);
document.getElementsByClassName("current")[0].addEventListener("click", evt => window.location.href = "./shop.html");


document.querySelectorAll("#card-position-range div").forEach((el) => el.addEventListener("click", evt => circleNav(el)))