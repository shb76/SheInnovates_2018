// The "M" in MVC, acts like database for game
var levels = [20,40,60]
//var currentlevel = 1

var model = {
  score: 0,
  highScore: 0,
  totalEnemies: 0,
  avatar: new Avatar(),
  bullets: [],
  enemies: [],
  currentlevel: 1,

  // Creates a new bullet and adds it to the bullets array
  avatarFire: function() {
    model.bullets.push(new Bullet());
  },

  // Moves all bullets up and remove any that go out of bounds
  updateBullets: function() {
    var allBullets = model.bullets;
    for (var b in allBullets) {
      allBullets[b].y -= allBullets[b].dy;
      if (allBullets[b].y <= -20) {
        allBullets.splice(b, 1);
      }
    }
  },

  // Creates a new enemy and adds it to the enemies array
  generateEnemy: function() {
    var max = 100;
    var spawnRate = 90; // Change this number spawn rate, lower = more
    var random = Math.floor(Math.random() * max);

    if (spawnRate < random) {
      model.enemies.push(new Enemy());
      model.totalEnemies++;
      model.spawnTimer = 0;
    }
  },

  // Moves all enemies and remove any that go out of bounds
  updateEnemies: function() {
    var allEnemies = model.enemies, currE;
    for (var e in allEnemies) {
      currE = allEnemies[e];
      currE.x +=   currE.dx;
      currE.y +=   currE.dy;
      if (currE.x <= -50 || currE.x >= 800 ||
        currE.y <= -50 || currE.y >= 800) {
          allEnemies.splice(e, 1);
      }
    }
  },

  // Checks for collisions and processes accordingly
  checkCollisions: function() {
    var avatar = model.avatar;
    var bullets = model.bullets;
    var enemies = model.enemies;
    var emax = enemies.length;
    var bmax = bullets.length;

    var currE, bullet;
    for (var i = 0; i < emax; i++) {
      // Collision between avatar and enemy
      currE = enemies[i];
      if (
        (avatar.x < currE.x + currE.size && avatar.x + avatar.size > currE.x) && (avatar.y < currE.y + currE.size && avatar.y + avatar.size > currE.y)
      ) {
        model.enemyHitsAvatar(currE);
        break;
      }
      // Collision between bullet and enemy
      for (var j = 0; j < bmax; j++) {
        bullet = bullets[j];
        if (
          (bullet.x < currE.x + currE.size && bullet.x + bullet.sizeX > currE.x) && (bullet.y < currE.y + currE.size && bullet.y + bullet.sizeY > currE.y)
        ) {
          model.bulletHitsEnemy(bullet, currE);
          break;
        }
      }
    }
  },

  enemyHitsAvatar: function(enemy) {
    model.avatar.hp -= 1;
    model.killEnemy(enemy);
  },

  bulletHitsEnemy: function(bullet, enemy) {
    model.score++;
   if (model.score > levels[model.currentlevel-1]){
    	model.currentlevel +=1;
    	//view.stop(); 
    	//view.message(); 
    	if (model.currentlevel == 2) {
    		alert("57% of 2015 Bachelor's degrees were female and of those only 18% were Computer Science and Information Science");
    	}
    	if (model.currentlevel == 3) {
    		alert("57% of professional occupations were held by women but of those only 26% are profession computing occupations");
    	}
    	if (model.currentlevel == 4) {
    		alert("level 4");
    		view.stop();
    	}
    	//alert("hi");
    	console.log("getting to init"); 
    	view.init(model.currentlevel);

    }
    if (model.score > model.highScore) model.highScore = model.score;
    model.killEnemy(enemy);
    model.killBullet(bullet);
  },

  killBullet: function(bullet) {
    var i = model.bullets.indexOf(bullet);
    if (i >= 0) model.bullets.splice(i, 1);
  },

  killEnemy: function(enemy) {
    var i = model.enemies.indexOf(enemy);
    if (i >= 0) model.enemies.splice(i, 1);
  }
};

function Avatar() {
  // Avatar stats
  this.hp = 1000;
  this.damage = 1;

  // Position
  this.x = view.max / 2;
  this.y = view.max - 250;

  // Movement Speed or step size
  this.dx = 10;
  this.dy = 10;

  // Size and Bitmap image
  this.size = 90;
  this.image = new Image();
  this.image.src = "images/oprah.png";

  // Renders the avatar image on the passed context, which should be a canvas
  this.draw = function(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  };

  // Updates the current position of the avatar
  this.move = function(dir) {
    var LEFT = 97, UP = 119, RIGHT = 100, DOWN = 115;
    if (dir == LEFT) this.x -= this.dx;
    else if (dir == RIGHT) this.x += this.dx;
    else if (dir == UP) this.y -= this.dy;
    else if (dir == DOWN) this.y += this.dy;

    // contrains avatar's position to never move off the grid
    this.x = Math.max(0, Math.min(this.x, view.max - this.size));
    this.y = Math.max(0, Math.min(this.y, view.max - this.size));
  };
}

function Bullet() {
  // Starting position
  this.x = model.avatar.x + 20;
  this.y = model.avatar.y;

  // Movement Speed or step size
  this.dx = 0;
  this.dy = 20;

  // Size and Bitmap image
  this.sizeX = 20;
  this.sizeY = 30;
  this.image = new Image();
  this.image.src = "images/femalesymbol.png";

  // Renders the bullet image on the passed context, which should be a canvas
  this.draw = function(context) {
    context.drawImage(this.image, this.x, this.y, this.sizeX, this.sizeY);
  };
}

function Enemy() {
  // Starting position
  this.x = Math.random() * 850 - 50;
  this.y = -50;

  // Movement Speed or step size
  this.scalar = Math.floor(Math.random() * 2);
  this.dx = ((Math.random() * 10) - 5) * this.scalar;
  this.dy = (Math.random() * 10) * this.scalar;

  // Size and Bitmap image
  this.size = 150;
  this.image = new Image();
  this.image.src = "images/sandwich.png";

  // Renders the bullet image on the passed context, which should be a canvas
  this.draw = function(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  };
}
