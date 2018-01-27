
            function leftArrowPressed() {
            var element = document.getElementById("image1");
            element.style.left = parseInt(element.style.left) - 5 + 'px';
            }

            function rightArrowPressed() {
            var element = document.getElementById("image1");
            element.style.left = parseInt(element.style.left) + 5 + 'px';

            }

            function upArrowPressed() {
            var element = document.getElementById("image1");
            element.style.top = parseInt(element.style.top) - 5 + 'px';
            }

            function downArrowPressed() {
            var element = document.getElementById("image1");
            element.style.top = parseInt(element.style.top) + 5 + 'px';
            }
            function spacebarPressed(){
             var element = document.getElementById("image1");
            }

            function moveSelection(evt) {
            	console.log("Hello"); 
            	console.log(evt.keycode); 
                switch (evt.keyCode) {
                    case 37:
                    leftArrowPressed();
                    break;
                    case 39:
                    rightArrowPressed();
                    break;
                    case 38:
                    upArrowPressed();
                    break;
                    case 40:
                    downArrowPressed();
                    break;
                    case 32: 
                    console.log("test"); 
                    break; 
                    }
                };

        function docReady()
        {
          
          window.addEventListener('keydown', moveSelection);
        }
        console.log("loaded"); 