// Enemies our player must avoid
//class Enemy
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances 
    this.x = x;
    this.y = y;
    
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //multiply any movement by the dt parameter
    // to ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed * dt;
      // when off canvas
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// player class
// This class has an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-pink-girl.png';
};

Player.prototype.update = function() {
    // Check for player reaching top of canvas ,water and winning the game
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
       document.getElementById('playerScore').innerHTML = 'Congratulations you win';  
    }



};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
//check if player not to go off the game
       if (keyPress == 'left' && this.x > 0){
            this.x -= this.speed + 50;
       }
           
       if (keyPress == 'up' && this.y > 0){
            this.y -= this.speed + 30;
       }
       
       if (keyPress == 'right' && this.x < 400){
            this.x += this.speed + 50;
       }
        
       if (keyPress == 'down' && this.y < 380){
            this.y += this.speed + 39;
       }
           
    
};
// Now instantiate the objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
// Location of the 3 enemies
var enemyPosition = [62, 142, 222];
//the player is located at x=200, y=380 
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(locationY) {
    enemy = new Enemy(0, locationY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
