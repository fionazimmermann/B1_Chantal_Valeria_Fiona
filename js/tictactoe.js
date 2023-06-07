// function for visible and hidden elements
function setPlaygroundVisible() {
    document.querySelector(".title").style.display = "block";
    document.getElementById('firstPlayer').style.display = "block";
    document.getElementById('secondPlayer').style.display = "block";
    document.querySelector('.tictactoe-container').style.display = "grid";
}

function setPlaygroundInvisible() {
    document.querySelector(".title").style.display = "none";
    document.getElementById('firstPlayer').style.display = "none";
    document.getElementById('secondPlayer').style.display = "none";
    document.querySelector('.tictactoe-container').style.display = "none";
}

//store playerdata in object
let players = {
    spielerA: {
        nickname: "",
        symbol: "x",
        setSpielerName: function () {
            this.nickname = document.getElementById('firstPlayer-nickname').innerHTML;
        }         

    },
    spielerB: {
        nickname: "Computer",
        symbol: "o",
    }
};

let currentPlayer = players.spielerA;

//store gamedata in object
let game = {
    playedCellCount: 0,
    gameEnd: false,
    winningConditions: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    gameCount: 0,
    gameActive: true,
    gameState: ["", "", "", "", "", "", "", "", ""] //array to store X and O
};


function handleGameResult() {
    let roundWon = false;
    //check winningConditions
    for (let i = 0; i <= 7; i++) {
        const winCondition = game.winningConditions[i];
        let a = game.gameState[winCondition[0]];
        let b = game.gameState[winCondition[1]];
        let c = game.gameState[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    //action for win
    if (roundWon) {

        setPlaygroundInvisible();
        document.getElementById('win').style.display = "block";
        document.querySelector('#win h3').innerHTML = currentPlayer.nickname;
        document.getElementById("restart-button").style.display = "block";

        game.gameActive = false;
        game.gameEnd = true;

        return;
    }

    //action for draw
    let roundDraw = !game.gameState.includes("");
    if (roundDraw) {
        document.getElementById('draw').style.display = "block";
        document.getElementById("restart-button").style.display = "block";

        setPlaygroundInvisible();
        game.gameActive = false;
        game.gameEnd = true;
        return;
    }

    //neither win nor draw continue
    handlePlayerChange();
}

//change currentplayer after every click
function handlePlayerChange() {
    currentPlayer = currentPlayer === players.spielerA ? players.spielerB : players.spielerA;
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (game.gameState[clickedCellIndex] !== "" || !game.gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleGameResult();

    if (currentPlayer == players.spielerB) computersTurn();
}

//fill the symbol into the cell
function handleCellPlayed(clickedCell, clickedCellIndex) {
    game.gameState[clickedCellIndex] = currentPlayer.symbol;
    clickedCell.classList.add(currentPlayer.symbol);

    game.playedCellCount += 1;

    document.getElementById('firstPlayer-nickname').classList.toggle("active-player");
    document.getElementById('secondPlayer-nickname').classList.toggle("active-player");
    document.getElementById('firstPlayer-symbol').classList.toggle('redSymbol');
    document.getElementById('secondPlayer-symbol').classList.toggle('redSymbol');
}

// logic for 
function computersTurn() {

    let computersChoice;

    for (let i = 0; i <= 7; i++) {
        const winCondition = game.winningConditions[i];

        let currentRow = [game.gameState[winCondition[0]], game.gameState[winCondition[1]], game.gameState[winCondition[2]]];
        let currentRowContent = [...new Set(currentRow)];

        const instances = {};
        currentRow.forEach(element => {
            instances[element] = (instances[element] || 0) + 1;
        });


        if (currentRowContent.length == 2 && currentRowContent.includes("") && (instances.x == 2 || instances.o == 2)) {
            computersChoice = winCondition[currentRow.indexOf("")];
            break;
        }
    }


    if (!computersChoice) {

        let freeCells = [];
        for (let i = 0; i < game.gameState.length; i++) {
            if (game.gameState[i] == "") {
                freeCells.push(i);
            }
        }
    
        computersChoice = freeCells[Math.floor(Math.random() * freeCells.length)];
    }
        

    setTimeout(function() {
        handleCellPlayed(document.querySelector(`[data-cell-index="${String(computersChoice)}"]`), computersChoice);
        handleGameResult();
    }, 700)
}

//set game to loading-state
function handleRestart() {
    game.gameCount += 1;

    game.gameActive = true;
    if ((game.gameCount%2) == 0) {
        currentPlayer = players.spielerA;
    }

    else {
        currentPlayer = players.spielerB;
    }

    if (game.playedCellCount%2 == 0) {
        document.getElementById('firstPlayer-nickname').classList.toggle("active-player");
        document.getElementById('secondPlayer-nickname').classList.toggle("active-player");
        document.getElementById('firstPlayer-symbol').classList.toggle('redSymbol');
        document.getElementById('secondPlayer-symbol').classList.toggle('redSymbol');
    }

    game.playedCellCount = 0;

    for (let i = 0; i < 9; i++) {
        let classList = document.getElementsByClassName("field")[i].classList;
        if (classList.contains("x")) classList.remove("x");
        if (classList.contains("o")) classList.remove("o");
    }

    game.gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.field').forEach(cell => cell.innerHTML = "");
    document.getElementById('win').style.display = "none";
    document.getElementById('draw').style.display = "none";
    document.getElementById('restart-button').style.display = "none";
    setPlaygroundVisible();

    if (currentPlayer == players.spielerB) computersTurn();
}


//add Eventlistener to all cells an restart-button
players.spielerA.setSpielerName();
document.querySelectorAll('.field').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('restart-button').addEventListener('click', handleRestart);