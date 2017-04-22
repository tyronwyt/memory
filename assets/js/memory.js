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
  var container = document.getElementById('container');
  var outputLevel = document.getElementById('level');
  outputLevel.textContent = "Level: " + level;
  for (var i = 0; i < colours.length; i++) {
    var block = document.createElement('div');
    var bgColour = "background: " + colours[i];
    block.classList.add('block');
    block.setAttribute("style", bgColour);
    container.appendChild(block);
  }
}

function startGame() {
  var blocks = document.getElementsByClassName('block');
  // blocks.onclick = function () {
  //   console.log("clicked");
  // };
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

      }
  }

  function fadeOut(block, to, at) {
    setTimeout(function() {
      block.classList.remove("blockOn");
      delayLoop(to, at + 1);
    }, 500);
  }

document.onload = gameSetup();
