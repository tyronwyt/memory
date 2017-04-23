var app = {

// Declare vars
  blockColours: ["red", "lime", "blue", "yellow"],
  level: 1,
  speed: 600,
  colourOrder: [],
  count: 0,
  blocks: {},

  init: function() {
    this.cacheDom();
    this.createBoard();
    // this.bindEvents();
  },

// Cache DOM elements that will be reused
  cacheDom: function() {
    var game_board = document.getElementById('game_board');
    var outputLevel = document.getElementById('level');
  },


  createBoard: function() {
    //Create coloured squares
    for (var i = 0; i < this.blockColours.length; i++) {
      var block = document.createElement('div');
      block.classList.add('block');
      block.setAttribute("style", "background: " + this.blockColours[i]);
      block.setAttribute("data-id", i);
      game_board.appendChild(block);
    }
    // Create start button
    var startButton = document.createElement('button');
    startButton.innerHTML = "Start Game";
    startButton.setAttribute("id", 'start_btn');
    game_board.appendChild(startButton);


    var startBtn = document.getElementById('start_btn');

    startBtn.onclick = function(){

      app.startGame();
      this.remove();
    };

  },


// create a random selection of colours based on level
  getColours: function() {
    this.colourOrder = [];
    app.count = 0;
    for (var i = 0; i < this.level; i++) {
        var random =  Math.floor(Math.random() * (4 - 0)) + 0;
        this.colourOrder.push(random);
        console.log(i + " is " + this.blockColours[random]);
    };
  },

// start the game
  startGame: function() {
    app.getColours();
    app.delayLoop(app.level);
  },

// Delay loop
  delayLoop: function(to, at) {
    var blocks = document.getElementsByClassName('block');
    var at = at || 1;
        if (at <= to) {
          var selectedBlock = this.colourOrder[at-1];
          setTimeout(function() {
            blocks[selectedBlock].classList.add("blockOn");
            app.fadeOut(blocks[selectedBlock], to, at);
          }, 200);

        } else {
          for (var i = 0; i < blocks.length; i++) {
            blocks[i].onclick = function(){
              var blockId = this.getAttribute("data-id");
                if (blockId == app.colourOrder[app.count]) {
                  app.count ++;
                  console.log(app.count);
                  if (app.count == app.level) {
                    app.addNextBtn();
                    //place new button to restart with new level
                  }
                } else {
                  console.log("wrong");
                  for (var i = 0; i < blocks.length; i++) {
                    blocks[i].setAttribute("style", "background: grey")
                  }
                  document.getElementById('response').innerHTML = "Wrong, try again";
                  app.addNewGameBtn();
                }
              };
          }
        }
  },

  fadeOut: function(block, to, at) {
    setTimeout(function() {
      block.classList.remove("blockOn");
      app.delayLoop(to, at + 1);
    }, 500);
  },

  addNextBtn: function(){
    var nextBtn = document.createElement('button');
    nextBtn.innerHTML = "Next Level";
    nextBtn.setAttribute("id", 'next_btn');
    game_board.appendChild(nextBtn);
    document.getElementById('next_btn').onclick = function() {
      app.level ++;
      app.startGame();
      this.remove();
    };
  },

  addNewGameBtn: function(){
    var newGameBtn = document.createElement('button');
    newGameBtn.innerHTML = "New Game";
    newGameBtn.setAttribute("id", 'new_game');
    game_board.appendChild(newGameBtn);
    document.getElementById('new_game').onclick = function() {
      var gameboard = document.getElementById('game_board');
      while (gameboard.hasChildNodes()) {
    gameboard.removeChild(gameboard.lastChild);
}
      app.level = 1;
      app.createBoard();
      this.remove();
    };
  },



};

document.onload = app.init();



//
//
// document.onload = gameSetup();
