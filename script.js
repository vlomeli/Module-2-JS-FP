let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocks')
let currentTurnElement = document.getElementById('currentTurn');
let currentPlayerElement = document.getElementById('currentPlayer');

function updateScores() {
    document.getElementById('player1-score').textContent = player1Score;
    document.getElementById('player2-score').textContent = player2Score;
}

const O_TEXT = 'O'
const X_TEXT = 'X'
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let count_plays = 0
let player1Score = 0;
let player2Score = 0;

const startGame = () => {
    boxes.forEach(box => {
        box.addEventListener('click', boxClicked);
    });
    updateTurnText(); 
}

function updateTurnText() {
    if (count_plays === 0) {
        playerText.innerHTML = 'Tic Tac Toe';
    } else {
        playerText.innerHTML = `${currentPlayer === X_TEXT ? '<span style="color: red;">X</span>' : '<span style="color: red;">O</span>'}'s Turn`;
    }
}

function boxClicked(e) {
    const id = e.target.id
    
    if(!spaces[id] && count_plays < 9){        
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer         //puts X or O inside the box

        if(playerWins() !==false) {
            playerText.innerHTML = `${currentPlayer} is the VICTOR!`
            let winning_blocks = playerWins ()
            count_plays = 10
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            updateScores();

        } else {
        count_plays++
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT: X_TEXT
        updateTurnText();
        }
    }

    if(count_plays === 9) {
        playerText.innerHTML = 'U both SUCK!'
        boxes.forEach(box => box.style.color = drawIndicator)
        updateScores();
    }
}

const winningCombos = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerWins() {
    for (const condition of winningCombos) {
        let [a, b , c] = condition;

        if(spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            let winningPlayer = spaces[a];

            if (winningPlayer === X_TEXT) {
                player1Score++;
            } else if (winningPlayer === O_TEXT) {
                player2Score++;
            }

            updateScores();
            return [a,b,c];
        }
    }
    return false 
}

function resetScores() {
    player1Score = 0;
    player2Score = 0;
    updateScores();
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)         //wipes the table by making the boxes null
    count_plays = 0

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
        box.style.color = '#f1f1f1;'
    })

    playerText.innerHTML = 'Tic Tac Toe'
    currentPlayer = X_TEXT

} 

let clearScoresBtn = document.getElementById('resetScoresBtn');
clearScoresBtn.addEventListener('click', clearScores);

function clearScores() {
    player1Score = 0;
    player2Score = 0;
    updateScores();
}

startGame()