// Create Selector ///

window.addEventListener('DOMContentLoaded', () => {
    const boxs = Array.from(document.querySelectorAll('.box'));
    const PlayerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');


// describe ////
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;


    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


/// Condition of behind-game
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        
    ];

    /// Create Function to conditon
 
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++){
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if ( a === b &&  b === c ){
                roundWon = true;
                break;
            }

        }
        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
        if (!board.includes(''))
        announce(TIE);
    }

    /////  Show the Results 

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
                case TIE:
                    announcer.innerText = 'Tie';
        }
        announcer.classList.remove('.hide');
    };

    /// Create Validation Condition
    const isValidAction = (box) => {
        if (box.innerText === 'X' ||  box.innerText === 'O'){
            return false;
        }
        return true;
    };


    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        PlayerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        PlayerDisplay.innerText = currentPlayer;
        PlayerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (box, index) => {
        if(isValidAction(box) && isGameActive) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

  //// function to reset the game on click button
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if(currentPlayer === 'O'){
            changePlayer();
        }
        boxs.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('palyerO');
        });
    }
    boxs.forEach((box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
