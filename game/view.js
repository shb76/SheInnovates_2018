// The "V" in MVC, does rendering, eventhandlers,
// and runs appropriate controller response to those events
newenemies = ["images/sandwich.png", "images/boss.png", "images/glass.png"]
//var id = null; 
var view = {
  
  // Dimensions of the canvas in pixels
  max: 800,
  previousTime: 0,
  id: null, 
  // Initialize game loop
  init: function(currentlevel) {
  		console.log("inside init"); 
  		console.log(currentlevel); 
	currentlevel = model.currentlevel
    var INTERVAL = 30; // Set pace of game, 30 ~ 30 frames per second
    // Attach eventListener for hitting spacebar for firing
    view.fireListener();
	if (currentlevel == 1){
    window.onload = function() {
      var canvas = $("#canvas")[0],
        c = canvas.getContext("2d");
      // THE GAME LOOP BABY
     view.id = setInterval(function() {
      	console.log("inside setinterval"); 
        var currentTime = new Date().getTime();
        view.update(currentTime);
        view.renderAvatar(canvas);
        view.renderBullets(canvas);
        view.renderEnemies(canvas, currentlevel);
        view.renderStats();
      }, INTERVAL);
    };
   }else {
   		console.log("got to else"); 
   		var canvas = $("#canvas")[0],
        c = canvas.getContext("2d");
      // THE GAME LOOP BABY
      view.id = setInterval(function() {
      	console.log("inside setinterval"); 
        var currentTime = new Date().getTime();
        view.update(currentTime);
        view.renderAvatar(canvas);
        view.renderBullets(canvas);
        view.renderEnemies(canvas, currentlevel);
        view.renderStats();
      }, INTERVAL);
   	
   }
  },
  stop: function(){
  	clearInterval(view.id); 
  }, 

  // Renders the game board state on canvas
  renderAvatar: function(canvas) {
    // supercharge canvas element and clean it out
    var c = canvas.getContext("2d");
    view.clearCanvas(canvas);

    // retrieve avatar object from controller
    var avatar = controller.getAvatar();
    // render avatar
    avatar.draw(c);
  },

  renderBullets: function(canvas) {
    var c = canvas.getContext("2d");
    // retrieve bullet objects from controller
    var bullets = controller.getBullets();
    // render bullets
    for (var b in bullets) {
      bullets[b].draw(c);
    }
  },

  renderEnemies: function(canvas, currentlevel) {
    var c = canvas.getContext("2d");
    // retrieve enemy objects from controller
    var enemies = controller.getEnemies();
    // render enemies
    console.log(currentlevel); 
    if (currentlevel > 1){
    	 for (var b in enemies) {
    	  enemies[b].image.src = newenemies[currentlevel-1];
    	}
    	
    }
    for (var b in enemies) {
      enemies[b].draw(c);
    }
  },

  renderStats: function() {
    $(".current-stat").remove();
    var newDiv = $("<div></div>");
    newDiv.attr("class", "current-stat");
    statArray = controller.getStats();
    newDiv.text(
      "Current Health: " + statArray[0] +
      " Score: " + statArray[1] +
      " High Score: " + statArray[2] +
      " Total Enemies: " + statArray[3] +  
      " Current Level: " + statArray[4]
    );
    $(".stats").append(newDiv);
  },

  // Cleans out the current canvas
  clearCanvas: function(canvas) {
    var c = canvas.getContext("2d");
    c.beginPath();
    c.rect(0,0,view.max,view.max);
    c.fillStyle = "white";
    c.fill();
  },

  // Main update function
  update: function(currentTime) {
    var LEFT = 97, UP = 119, RIGHT = 100, DOWN = 115; // WASD keys
    controller.generateEnemy(currentTime);
    controller.updateEnemies();
    // Avatar movement
    if (key.isPressed("A")) controller.updateAvatar(LEFT);
    if (key.isPressed("D")) controller.updateAvatar(RIGHT);
    if (key.isPressed("W")) controller.updateAvatar(UP);
    if (key.isPressed("S")) controller.updateAvatar(DOWN);
    // Update bullet locations
    if (controller.getBullets) controller.updateBullets();
    // After updating everything, check and process any collisions
    controller.checkCollisions();
  },

  fireListener: function() {
    // Avatar launching fireball on hitting spacebar
    $(document).on("keydown", function(e) {
      if (e.keyCode == 32) controller.avatarFire();
    });
  }, 
  // listen: function(){
//   	console.log("in listen function"); 
//   	document.getElementById("continue").addEventListener("click", function toffi(){
//   		alert("HI"); 
//   	});
//   }, 
//   message: function(){
//   var sw = document.getElementById("game");
//   var info = document.getElementById("info"); 
//   if (sw.style.display === "block") {
//     sw.style.display = "none";
//     info.style.display = "block"
//   } else {
//     sw.style.display = "block";
//     info.style.display = "none";
//   }
//   console.log(sw.style.display);
// }
  
  
};
