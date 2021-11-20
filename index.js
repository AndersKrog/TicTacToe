class Game {
    constructor(){
        this.CrossesTurn = true;
    }
    turn(){
        this.CrossesTurn = !this.CrossesTurn;

        if (this.CrossesTurn){
            console.log("crosses turn");

        }else {
            console.log("Noughts turn")
        }
    } 
}
class Player
{
    constructor(isWhite){
        this.IsWhite = isWhite;
        this.Name;
    }

}


/*
generelle noter:
Har forsøgt at smide det hele ind i klasser, men eventListener lader til at begrænse det.
*/

// globale variabler
let game = new Game;

let player1 = new Player(true);
let player2 = new Player(false);

let Board = [   
    [" "," "," "],
    [" "," "," "],
    [" "," "," "]
];


////////////////////////////////////////////////////////////
//EVENTS
////////////////////////////////////////////////////////////
function mouseLeave(cell){
        cell.className = cell.title;
}

function mouseEnter(cell){
    let destinationX = cell.id%3;
    let destinationY = Math.floor(cell.id/3);            

	if(Board[destinationX][destinationY] == " "){
		cell.className = "legal";
	}else{
		cell.className = "illegal";             
	}
}

function onClick(cell){
    //console.log("you clicked " + cell.id)

    let destinationX = cell.id%3;
    let destinationY = Math.floor(cell.id/3);            

    if (Board[destinationX][destinationY] == " "){
		
        cell.className ="selected";

        if (game.CrossesTurn == true){
            Board[destinationX][destinationY] = "X";
        }else {
            Board[destinationX][destinationY] = "O";
        }
        
        drawBoard();
        checkBoard();
        game.turn();
    }
}

function checkBoard(){
    for (let y = 0; y < 3;y++){
        for (let x = 0; x < 3;x++){
            if (Board[x][y] != " "){
                if(y == 0){
                    // tjek ned
                    if (Board[x][y] == Board[x][y+1] && Board[x][y] == Board[x][y+2]){
                        won();
                    }
                }
                if(x == 0){
                    // tjek vandret
                    if(Board[x][y] == Board[x+1][y] && Board[x][y] == Board[x+2][y]){
                        won();
                    }
    
                }
                if (x == 0 && y == 0){  
                    //tjek diagonalt
                    if (Board[x][y] == Board[x+1][y+1] && Board[x][y] == Board[x+2][y+2]){
                        won();                    }
                }
                if (x == 2 && y == 0){  
                    //tjek diagonalt
                    if (Board[x][y] == Board[x-1][y+1] && Board[x][y] == Board[x-2][y+2]){
                        won();
                    }
                }
            }
        } 
    }
}

function won(){
    console.log("won");
}

function drawBoard(){
    
    // ved ikke om denne metode er god til at slette indholdet:
    // der sker et ryk første gang en brik fjernes. det har måske noget med størrelserne på cellerne at gøre 
    document.getElementsByTagName('BODY')[0].innerHTML = '';

    let body = document.getElementsByTagName("body")[0]
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");

    tbl.style.height = "600px";
    tbl.style.width = "600px";

    for (let y = 0; y < 3;y++){
        let row = document.createElement("tr");
        for (let x = 0; x < 3;x++){
            
            let cell = document.createElement("td");
            
            cell.innerHTML = Board[x][y];
 
            //byttet om i forhold til før pga. array
            cell.id = y*3+x;

            cell.addEventListener("click", function(){onClick(this)});
            cell.addEventListener("mouseenter", function(){mouseEnter(this)} );
            cell.addEventListener("mouseleave", function(){mouseLeave(this)} );

            if ((x+y)%2 == 0){
                cell.className = "grey";
                cell.title = "grey";
            }else{
                cell.className = "white";
                cell.title = "white";
            }

            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
}

function start(){
    drawBoard();
}

game.turn();
start();


