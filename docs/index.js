let scene1 = document.getElementById("first-scene");
let scene2 = document.getElementById("second-scene");
let scene3 = document.getElementById("third-scene");
let scenes = [scene1, scene2, scene3];
let gridItems = document.getElementsByClassName("grid-item");
let playerNames = document.getElementsByClassName("player-name");
let signs = document.getElementsByClassName("signs");
let winnerName; 
let ActivePlayer;
let ctr  = 0; 

let cells = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const displayController = (function () {
  const toggle = (currentState, states) => {
    if (currentState == states[0]) return states[1];
    else return states[0];
  };

  const changeScene = (scenes) => {
    for (let i = 0; i < scenes.length; i++) {
      if (scenes[i].style.display !== "none") {
        scenes[i].style.display = toggle(scenes[i].style.display, [
          "none",
          "flex",
        ]);
        scenes[(i + 1)%3].style.display = toggle(scenes[i].style.display, [
          "none",
          "flex",
        ]);
        break;
      }
    }
  };

  const resetGame = () => {
    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++)
        cells[i][j] = 0; 

    for(let i = 0; i < gridItems.length; i++) gridItems[i].innerHTML = "<span>" + "" + "</span>"; 
    ctr = 0; 
    document.getElementById('end-message').innerText = "CONGRATULATIONS!"; 
    document.getElementsByClassName('winner-screen')[0].style.backgroundColor = "#2A0C42";   
    changeScene(scenes); 
  }

  const placeSign = (sign, cell) => {
    cell.innerHTML = "<span>" + sign + "</span>";
  };

  const toggleName = () => {
    document.getElementById("name").innerText = ActivePlayer.getName();
  };

  return {
    toggle,
    changeScene,
    placeSign,
    toggleName,
    resetGame
  };
})();

const Player = (n, s) => {
  let name = n;
  let sign = s;

  const markCell = (i) => {
    ctr++; 
    displayController.placeSign(sign, gridItems[i]);
    let j = Math.floor(i/3); 
    if(sign == 'O') cells[j][i%3] = 1; 
    else cells[j][i%3] = 2;    
    if(gameLogic.checkForWinner() == true){
        displayController.changeScene(scenes); 
        document.getElementById('winner-player').innerText = winnerName;  
    }else{
        if(ctr == 9){
          document.getElementById('end-message').innerText = "DRAW"; 
          document.getElementById('winner-player').innerText = "";
          document.getElementsByClassName('winner-screen')[0].style.backgroundColor = "orange";   
          displayController.changeScene(scenes); 
        }
        else{
          gameLogic.changeActivePlayer();
          displayController.toggleName();
          console.log(cells); 
        }
    }
  };

  const setName = (n) => {
    name = n;
  };

  const setSign = (s) => {
    sign = s;
  };

  const getName = () => {
    return name;
  };

  return {
    name,
    sign,
    markCell,
    setName,
    setSign,
    getName,
  };
};

document
  .getElementsByClassName("button-start")[0]
  .addEventListener("click", function () {
    displayController.changeScene(scenes);
    Player1.setName(playerNames[0].value);
    Player2.setName(playerNames[1].value);
    Player1.setSign(signs[0].innerHTML);
    Player2.setSign(signs[1].innerHTML);
    ActivePlayer = Player1;
    displayController.toggleName();
  });


const Player1 = Player("", "");
const Player2 = Player("", "");

const gameLogic = (function () {
  const changeActivePlayer = () => {
    ActivePlayer = displayController.toggle(ActivePlayer, [Player1, Player2]);
  };

  const checkForWinner = () => {
        if((cells[0][0] == 1 && cells[0][1] == 1 && cells[0][2] == 1) || (cells[0][0] == 2 && cells[0][1] == 2 && cells[0][2] == 2) ){
            winnerName = ActivePlayer.getName(); 
            return true; 
        }
        else if((cells[1][0] == 1 && cells[1][1] == 1 && cells[1][2] == 1) || (cells[1][0] == 2 && cells[1][1] == 2 && cells[1][2] == 2)){
            winnerName = ActivePlayer.getName(); 
            return true; 
        }
        else if((cells[2][0] == 1 && cells[2][1] == 1 && cells[2][2] == 1 )|| (cells[2][0] == 2 && cells[2][1] == 2 && cells[2][2] == 2)){
            winnerName = ActivePlayer.getName(); 
            return true; 
        }
        else if((cells[0][0] == 1 && cells[1][0] == 1 && cells[2][0] == 1 )|| (cells[0][0] == 2 && cells[1][0] == 2 && cells[2][0] == 2)){
            winnerName = ActivePlayer.getName(); 
            return true; 
        }
        else if((cells[0][1] == 1 && cells[1][1] == 1 && cells[2][1] == 1 )|| (cells[0][1] == 2 && cells[1][1] == 2 && cells[2][1] == 2)){
            winnerName = ActivePlayer.getName(); 
            return true; 
        }
        else if((cells[0][2] == 1 && cells[1][2] == 1 && cells[2][2] == 1 )|| (cells[0][2] == 2 && cells[1][2] == 2 && cells[2][2] == 2)){
            winnerName = ActivePlayer.getName(); 
            return true; 
        }
        else if((cells[0][0] == 1 && cells[1][1] == 1 && cells[2][2] == 1) || (cells[0][0] == 2 && cells[1][1] == 2 && cells[2][2] == 2)){
            winnerName = ActivePlayer.getName(); 
            return true; 
        }
        else if((cells[0][2] == 1 && cells[1][1] == 1 && cells[2][0] == 1) || (cells[0][2] == 2 && cells[1][1] == 2 && cells[2][0] == 2)){
            winnerName = ActivePlayer.getName(); 
            return true; 
        }
        return false; 
  }

  return {
    changeActivePlayer,
    checkForWinner
  };
})();

const changeSign = () => {
  signButton1.innerHTML = displayController.toggle(signButton1.innerHTML, [
    "O",
    "X",
  ]);
  signButton2.innerHTML = displayController.toggle(signButton2.innerHTML, [
    "O",
    "X",
  ]);
};

let [signButton1, signButton2] = [
  document.getElementsByClassName("signs")[0],
  document.getElementsByClassName("signs")[1],
];
signButton1.addEventListener("click", changeSign);
signButton2.addEventListener("click", changeSign);


document.getElementById("replay").addEventListener('click', function(){
  displayController.resetGame(); 
})

for (let i = 0; i < gridItems.length; i++) {
  gridItems[i].addEventListener("click", function () {
    let j = Math.floor(i/3); 
    if(cells[j][i%3] == 0) ActivePlayer.markCell(i);
    else{
      alert("Please choose a free square"); 
    }
  });
}
