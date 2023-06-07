// TO-DO

/* - klick on circle
   - klick on prev/next
*/


const cards = document.getElementsByClassName("card");
let currentCard = 0;
let fields = [[3, "prev-picture"], [0, "current"], [1, "next-picture"]]

const switchCards = (n) => {
  //remove classes
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList = "card";
  }

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
}