const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', '']; // وضعیت فعلی صفحه بازی

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

const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // اگر خانه قبلاً پر شده یا بازی فعال نیست، کاری انجام نده
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // علامت بازیکن فعلی را در gameState و روی صفحه قرار بده
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); // برای استایل‌دهی

    // بررسی وضعیت برد یا تساوی
    checkResult();

    // اگر بازی هنوز فعال است، نوبت بازیکن بعدی را تغییر بده
    if (gameActive) {
        changePlayer();
    }
};

const checkResult = () => {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        // اگر هر سه خانه در یک شرط برد خالی نباشند و همگی برابر باشند
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `بازیکن ${currentPlayer} برنده شد!`;
        gameActive = false;
        return;
    }

    // بررسی تساوی (اگر هیچ خانه‌ای خالی نباشد)
    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.textContent = `بازی مساوی شد!`;
        gameActive = false;
        return;
    }
};

const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `نوبت بازیکن ${currentPlayer}`;
};

const handleRestartGame = () => {
    gameState = ['', '', '', '', '', '', '', '', '']; // ریست کردن وضعیت بازی
    currentPlayer = 'X'; // شروع با بازیکن X
    statusDisplay.textContent = `نوبت بازیکن X`;
    cells.forEach(cell => {
        cell.textContent = ''; // خالی کردن متن خانه‌ها
        cell.classList.remove('x', 'o'); // حذف کلاس‌های x و o
    });
    gameActive = true; // فعال کردن دوباره بازی
};

// اضافه کردن Event Listener به هر خانه
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
// اضافه کردن Event Listener به دکمه شروع مجدد
restartButton.addEventListener('click', handleRestartGame);