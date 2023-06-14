// Alle Slide-Elemente (mit der Klasse card) werden als Array in der Variabel slides speichern
const slides = document.getElementsByClassName("card");

// z.B. im linken Feld (fields[0]) ist mommentan die 4. Karte (start der Nummerierung bei 0)
// das linke Feld zeigt die Karte mit der Klass "prev-picture"
let fields = [[3, "prev-picture"], [0, "current"], [1, "next-picture"]]

// Funktion zum wechseln der Slides
// der Parameter n bestimmt um wie viel die Slids verschieben (positiv: vorwärts, negativ: rückwärts)
const switchSlides = (n) => {

  // Entfernt die Eventlistener auf den Vorschaubild, da diese Klassen weiter unten neu vergeben werden
  document.getElementsByClassName("next-picture")[0].removeEventListener("click", switchForward);
  document.getElementsByClassName("prev-picture")[0].removeEventListener("click", switchBackward);
  
  // Klassen auf allen Slides werden enfernt
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList = "card";
  }

  // Die Positionen der Slides werden aktualisiert und die entsprechenden Klassen hinzugefügt
  for (let i = 0; i < fields.length; i++) {
    let currentPosition = fields[i][0] + n;

    if (currentPosition >= slides.length) {
      currentPosition = currentPosition - slides.length
    } else if (currentPosition < 0) {
      currentPosition = slides.length + currentPosition
    };

    fields[i][0] = currentPosition;
    
    slides[fields[i][0]].classList.add(fields[i][1]);
  }

  // Klassen auf allen Navigations-Kreisen werden enfernt
  const circles = document.getElementById("card-position-range").children;
  for (let i = 0; i < circles.length; i++) {
    circles[i].classList = "";
  }

  // Die Kreise bis zur aktuellen Slideposition werden gefüllt
  for (let i = 0; i < fields[1][0] + 1; i++) {
    circles[i].classList.add("filled");
  }

  // Die Eventlistener auf den neuen Vorschaubildern werden hinzugefügt
  document.getElementsByClassName("next-picture")[0].addEventListener("click", switchForward);
  document.getElementsByClassName("prev-picture")[0].addEventListener("click", switchBackward);
}



// Hilfsfunktionen
const switchForward = () => switchSlides(1);
const switchBackward = () => switchSlides(-1);

const circleNav = (element) => {
  let childIndex = [...element.parentNode.children].indexOf(element);
  switchSlides(childIndex - fields[1][0]);
}


// EventListener werden hinzugefügt
document.getElementById("next").addEventListener("click", switchForward);
document.getElementsByClassName("next-picture")[0].addEventListener("click", switchForward);
document.getElementById("prev").addEventListener("click", switchBackward);
document.getElementsByClassName("prev-picture")[0].addEventListener("click", switchBackward);
document.getElementsByClassName("current")[0].addEventListener("click", evt => window.location.href = "./shop.html");

document.querySelectorAll("#card-position-range div").forEach((el) => el.addEventListener("click", evt => circleNav(el)))