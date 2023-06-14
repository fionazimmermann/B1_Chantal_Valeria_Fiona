let fields = {
    firstPlayer: document.getElementById('firstPlayer'),
    firstPlayerNickname: this.firstPlayer.children[0],
    firstPlayerScore: document.getElementById('firstPlayer-score'),
    secondPlayer: document.getElementById('secondPlayer'),
    secondPlayerNickname: this.secondPlayer.children[0],
    secondPlayerScore: document.getElementById('secondPlayer-score'),
    ticTacToeContainer: document.querySelector('.tictactoe-container'),
    winCard: document.getElementById('win'),
    winner: document.querySelector('#win h3'),
    restartButton: document.getElementById("restart-button"),
    drawCard: document.getElementById('draw'),
    endCard: document.getElementById('competition')
}


// function for show and hide elements
const setPlaygroundVisible = () => {
    fields.firstPlayer.style.display = "block";
    fields.secondPlayer.style.display = "block";
    fields.ticTacToeContainer.style.display = "grid";
}

const setPlaygroundInvisible = () => {
    fields.firstPlayer.style.display = "none";
    fields.secondPlayer.style.display = "none";
    fields.ticTacToeContainer.style.display = "none";
}


//store playerdata in object
let players = {
    spielerA: {
        nickname: "",
        symbol: "x",
        scoreFiled: fields.firstPlayerScore,
        score: 0,
        setSpielerName: () => {
            this.nickname = fields.firstPlayerNickname.innerHTML;
        }
    },
    spielerB: {
        nickname: "Computer",
        symbol: "o",
        scoreFiled: fields.secondPlayerScore,
        score: 0
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


const handleGameResult = () => {
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

        currentPlayer.score++;
        currentPlayer.scoreFiled.innerHTML = currentPlayer.score;

        // check game win
        if (currentPlayer.score == 3) {
            fields.endCard.style.display = "block";
        } else {
            fields.winCard.style.display = "block";
            fields.winner.innerHTML = currentPlayer.nickname;    
        }

        fields.restartButton.style.display = "block";

        game.gameActive = false;
        game.gameEnd = true;

        return;
    }

    //action for draw
    let roundDraw = !game.gameState.includes("");
    if (roundDraw) {
        fields.drawCard.style.display = "block";
        fields.restartButton.style.display = "block";

        setPlaygroundInvisible();
        game.gameActive = false;
        game.gameEnd = true;
        return;
    }

    //continue game
    handlePlayerChange();
}


//change currentplayer after every click
const handlePlayerChange = () => {
    currentPlayer = currentPlayer === players.spielerA ? players.spielerB : players.spielerA;
}

const handleCellClick = clickedCellEvent => {
    if (players.spielerA.nickname == "") players.spielerA.setSpielerName();

    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (game.gameState[clickedCellIndex] !== "" || !game.gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleGameResult();

    if (currentPlayer == players.spielerB) computersTurn();
}


// add class x and o
const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    game.gameState[clickedCellIndex] = currentPlayer.symbol;
    clickedCell.classList.add(currentPlayer.symbol);

    game.playedCellCount += 1;

    fields.firstPlayerNickname.classList.toggle("active-player");
    fields.secondPlayerNickname.classList.toggle("active-player");
}


// computer logic
const computersTurn = () => {

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
        

    setTimeout(() => {
        handleCellPlayed(document.querySelector(`[data-cell-index="${String(computersChoice)}"]`), computersChoice);
        handleGameResult();
    }, 700)
}


//set game to loading-state
const handleRestart = () => {
    game.gameCount += 1;

    game.gameActive = true;
    if ((game.gameCount%2) == 0) {
        currentPlayer = players.spielerA;
    }

    else {
        currentPlayer = players.spielerB;
    }

    if (game.playedCellCount%2 == 0) {
        fields.firstPlayerNickname.classList.toggle("active-player");
        fields.secondPlayerNickname.classList.toggle("active-player");
    }
    game.playedCellCount = 0;

    for (let i = 0; i < 9; i++) {
        let classList = document.getElementsByClassName("field")[i].classList;
        if (classList.contains("x")) classList.remove("x");
        if (classList.contains("o")) classList.remove("o");
    }

    game.gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.field').forEach(cell => cell.innerHTML = "");
    fields.winCard.style.display = "none";
    fields.drawCard.style.display = "none";
    fields.restartButton.style.display = "none";
    setPlaygroundVisible();

    if (currentPlayer == players.spielerB) computersTurn();
}


//add Eventlistener to all cells an restart-button
document.querySelectorAll('.field').forEach(cell => cell.addEventListener('click', handleCellClick));
fields.restartButton.addEventListener('click', handleRestart);