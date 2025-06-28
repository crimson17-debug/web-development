//1.deposit some money
//2.determine no of lines to bet
//3. collect a bet amount
//4.spin the slot machine
//5. check if the user won or lost
//6.give the user the winnings
//7.play again

// function deposit() {

// }
const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A":5,
    "B":4,
    "C":3,  
    "D":2
}



const deposit = () => {
    while(true){
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <=0){
        console.log("Invalid deposit amount, try again. ");
    }

    else{
        return numberDepositAmount;
    }

    }


}

const getNumberofLines = () => {
while(true){
    const noOfLines = prompt("Enter the number of lines to bet: ");
    const numberLines = parseFloat(noOfLines);

    if(isNaN(numberLines) || numberLines <=0 || numberLines >3){
        console.log("invalidl number of lines, try again. ");
    }
    else{
        return numberLines;
    }
}
}

const getBet = (balance, lines) => {
while(true){
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if(isNaN(numberBet) || numberBet <=0 || numberBet > (balance /lines)){
        console.log("invalidl number of lines, try again. ");
    }
    else{
        return numberBet;
    }
}
}


const spin = () => {
    const symbols = [];
    for(const[symbol , count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i = 0; i<count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0 ; i<COLS ; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0 ; j<ROWS ; j++){
            const randomIndex =Math.floor(Math.random()  * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }

    return reels;
}

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i< ROWS; i++){
        rows.push([]);
        for(let j =0 ; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}


const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length -1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}


const getWinnings = (rows , bet , lines) => {
    let winnings = 0;

    for(let row = 0; row<lines ; row++){
        const symbols = rows[row];
        let allSame = true;

            for(const symbol of symbols){
                if(symbol != symbols[0]) {
                    allSame = false;
                    break;
                }
            }

            if(allSame){
                winnings += bet * SYMBOL_VALUES[symbols[0]];
            }
    }

    return winnings;
}

const game = () => {
    let balance = deposit();

    while(true){
    console.log(`Your balance is ${balance}`);
    const numberOfLines = getNumberofLines();
    const bet = getBet(balance , numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows , bet , numberOfLines);
    balance += winnings;
    console.log(`You won ${winnings}`);

    if(balance <=0){
        console.log("You have no balance left. Game over!");
        break;
    }

    const playAgain = prompt("Do you want to play again? (y/n): ");
    if((playAgain !== "y") && (playAgain !== "Y")) {
        console.log("Thanks for playing!");
        break;
    }
}

}

game();







