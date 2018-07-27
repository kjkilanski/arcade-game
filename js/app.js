
// Enemiy Objects & Methods

var Enemy = function(y) {

  this.y = y;
  this.speed = 0;
  if (this.y == 228) {
  this.x = 303;
  } else {
    this.x = 50 + Math.floor(Math.random() * 400);
  }
  this.sprite = 'images/enemy-bug.png';

}

// Update the enemy's position
Enemy.prototype.update = function(dt) {
  // Multiply any movement by the dt parameter to ensure
  // game runs at the same speed for all computers.

  this.x += this.speed * dt;

  if (this.x > 520) {
    this.x = 0;
  }

  // Check for collisions
  if ((player.x < this.x + 60 && player.x + 60 > this.x) && (player.y < this.y + 25 && 30 + player.y > this.y)) {
    player.x = 202;
    player.y = 384;
  }

  // Check for obstacles
  if (player.y > 0 && (this.y == (block.y + 10))) {
    if (this.x < block.x && this.x + 101 > block.x) {
      this.x = (block.x + 150);
    }
  }

  // Check for win
  if (player.y < 0) {
    this.gameWin();
  }

}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

// Reset enemy speed if win
Enemy.prototype.gameWin = function() {
this.speed = 0;

}

// Obstacle Objects & Methods

var Rock = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Rock.png';

}

//  Position the obstacles
Rock.prototype.update = function() {
  // Position obstacle randomly
  if (player.y < 0) {
    let minY = 52;
        this.x = 101 * this.getRandomInt(5, -1);
        this.y = minY + (83 * this.getRandomInt(4, 1));
  }

  // Prevent placing obstacle on top of enemy
  let bug;
  for(var mem in allEnemies) {
    if (allEnemies.hasOwnProperty(mem)) {
      bug = allEnemies[mem];
    }

    if (this.y == (bug.y - 10)) {
      if (this.x < bug.x && this.x + 101 > bug.x) {
        bug.x = this.x + 101;
      }
    }
    // Prevent obstacle from going off the stones
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > 505) {
    this.x = 505;
    }
    if (this.y > 301) {
      this.y = 301;
    }
    if (this.y < 52) {
      this.y = 52;
    }
  }

}

Rock.prototype.getRandomInt = function(max, min) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.floor(min)));
}
//  Draw obstacles on the screen
Rock.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}


// Player Objects & Methods

var Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.z = true;
  this.showModal = false;
  this.sprite = 'images/char-cat-girl.png';

}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

// The player position
Player.prototype.update = function() {

  // Check for player winning the game
  if (this.y < 0) {
    this.gameWin();
  }

  // Prevent player from going off the screen
  if (this.x < 0) {
    this.x = 0;
  }
  if (this.x > 505) {
  this.x = 505;
  }
  if (this.y > 384) {
    this.y = 384;
  }

}

// Handle keyboard input
Player.prototype.handleInput = function(keyInput) {
  pressedKey = keyInput;

  switch (pressedKey) {
    case 'left':
      if ((this.z == true) || ((this.x - 101 == block.x) && (this.y == block.y))) {
        this.x = this.x;
      } else if (this.z == false){
        this.x -= 101;
      }
        break;
    case 'right':
      if ((this.z == true) || ((this.x + 101 == block.x) && (this.y == block.y))) {
        this.x = this.x;
      } else if (this.z == false){
        this.x += 101;
      }
      break;
    case 'down':
      if ((this.z == true) || ((this.y + 83 == block.y) && (this.x == block.x)))   {
        this.y = this.y;
      } else if (this.z == false){
        this.y += 83;
      }
      break;
    case 'up':
      if ((this.z == true) || ((this.y - 83 == block.y) && (this.x == block.x))) {
        this.y = this.y;
      } else if (player.z == false){
        this.y -= 83;
      }
      break;
    case 'pause':
      if (this.showModal == false) {
        this.pauseGame();
      } else if (this.showModal == true) {

      }
      break;
  }

}

// Start or pause the game
Player.prototype.pauseGame = function() {
  let bug;
  for(var mem in allEnemies) {
    if (allEnemies.hasOwnProperty(mem)) {
      bug = allEnemies[mem];
    }
    // check enemy speed to determine start/paused conditions
    if (bug.speed == 0) {
      bug.speed = 50 + Math.floor(Math.random() * 150);
      this.z = false;
    }
    else if (bug.speed != 0) {
      this.z = true;
      bug.speed = 0;
    }
  }

}
// Show modal when game is won;
// Reset player position to starting position
Player.prototype.gameWin = function() {
  this.modal();

}

Player.prototype.modal = function() {

  const modal = document.querySelector('.modal');
  modal.style.display ='block';

  if (this.y < 0) {
    this.x = 202 ;
    this.y = 384;
    this.z = true;

  }
  if (modal.style.display = 'block;') {
    this.showModal = true;
  }

}

Player.prototype.setModal = function() {
this.showModal = false;

}

// Instantiate players, enemies, and obstacles
const allEnemies = [new Enemy(62), new Enemy(145), new Enemy(228), new Enemy(311)];
const block = new Rock(202, 218);
const player = new Player(202, 384);

// Listen for events
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    32: 'pause',
  };
    player.handleInput(allowedKeys[e.keyCode]);

})
Player.prototype.closeModal = function() {

}
document.querySelector('.reset-me').addEventListener('click', function() {
modal.style.display = 'none';
player.setModal();
})
