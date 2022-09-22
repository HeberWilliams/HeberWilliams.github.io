const p1 = {
    score: 0,
    button: document.querySelector('#p1'),
    display: document.querySelector('.p1Display'),
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2'),
    display: document.querySelector('.p2Display'),
}


//const p1Display = document.querySelector('.p1Display');
//const p2Display = document.querySelector('.p2Display');
//const p1PointBtn = document.querySelector('#p1');
//const p2PointBtn = document.querySelector('#p2');
const resetBtn = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
let winScore = 5;
//let p1Score = 0;
//let p2Score = 0;
let gameOver = false;

function updateScores(player, opponent){
    if(!gameOver){
        player.score ++;
        if(player.score === winScore){
            gameOver = true;
            player.display.classList.add('winner');
            opponent.display.classList.add('loser');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.innerText = player.score;
    }
}

p1.button.addEventListener('click', function(){
   updateScores(p1, p2);
});

p2.button.addEventListener('click', function(){
    updateScores(p2, p1);
});

resetBtn.addEventListener('click', reset);
    

function reset(){
    gameOver = false;
    p1.score = 0;
    p2.score = 0;
    p1.display.innerText = p1.score;
    p2.display.innerText = p2.score;
    p1.display.classList.remove('winner', 'loser');
    p2.display.classList.remove('winner', 'loser');
    p1.button.disabled = false;
    p2.button.disabled = false;
}

winningScoreSelect.addEventListener('change', function(){
    winScore = parseInt(this.value);
    reset();
})
