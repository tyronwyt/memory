var colours = ["red", "lime", "blue", "yellow"];
var level = 5;
var speed = 600;
var colourOrder = [];
var count = 0;
var blocks;
var myApp = {};


function getColours() {
    for (var i = 0; i < level; i++) {
        var random =  Math.floor(Math.random() * (4 - 0)) + 0;
        colourOrder.push(random);
        console.log(i + " is " + colours[random]);
    }
}

function gameSetup() {
  getColours();
  var game_board = document.getElementById('game_board');
  var outputLevel = document.getElementById('level');
  outputLevel.textContent = "Level: " + level;
  for (var i = 0; i < colours.length; i++) {
    var block = document.createElement('div');
    var bgColour = "background: " + colours[i];
    block.classList.add('block');
    block.setAttribute("style", bgColour);
    block.setAttribute("data-id", i);
    game_board.appendChild(block);
  }
  var startButton = document.createElement('button');
  startButton.innerHTML = "Start Game";
  startButton.setAttribute("id", 'start_btn');
  game_board.appendChild(startButton);
  document.getElementById('start_btn').onclick = function() {
    startGame();
  };
}

function startGame() {
  var blocks = document.getElementsByClassName('block');

  delayLoop(level);
}

function delayLoop(to, at) {
  var blocks = document.getElementsByClassName('block');
  var at = at || 1;
      if (at <= to) {
        var selectedBlock = colourOrder[at-1];
        setTimeout(function() {
          blocks[selectedBlock].classList.add("blockOn");
          fadeOut(blocks[selectedBlock], to, at)
        }, 200);

      } else {
        for (var i = 0; i < blocks.length; i++) {
          blocks[i].onclick = function(){
          var blockId = this.getAttribute("data-id");
          console.log(blockId + " " + colourOrder[count]);
            if (blockId == colourOrder[count]) {
              console.log("correct");
              count ++;
            } else {
              console.log("wrong");
            }
          };
        }
      }
  }

  function fadeOut(block, to, at) {
    setTimeout(function() {
      block.classList.remove("blockOn");
      delayLoop(to, at + 1);
    }, 500);
  }

document.onload = gameSetup();
