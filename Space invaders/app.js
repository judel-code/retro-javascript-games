const grid = document.querySelector ('.grid')
const resultDisplay = document.querySelector('.results')

let currentShooterIndex = 202
let width = 15
let direction = 1 
let invadersId
let goingRight = true
let aliensKilled = []
let score = 0



//(1A)
// we gonna add all the other div using javascript
// we gonna used a four loop
// we gonna create 225 div

 for (let i = 0; i<225; i++){
    // we want to create divs and store them in square veriable
    const square = document.createElement('div')
    // we now want to get the main grid and append all our divs stored in square in there
    grid.appendChild(square)
 }

 //(1B)
 // squares = squareDiv
 // now we want to target all the divs in the main grid and store them in an array
 const squareDiv = Array.from(document.querySelectorAll('.grid div'))

 //(1C)
 // now lets make the alien Invaders
 // alien Invaders will only be a few squares out off all the 225 square
 const alienInvaders = [
    // we will start by making and array
    // we need to decide which square we want the alien to be
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
 ]

 //(1D)
 // now we want add our alien invaders to the squareDiv array
 // this is how we gonna draw the alien invaders
 function draw() {
    // we want to loop over all the alien invaders array element, thats why we are using the alienInvaders.length
    for (let i = 0; i < alienInvaders.length; i++) {

      //NB!! before we draw we want to check if the  alien invader is already removed
       if(!aliensKilled.includes(i)){
            //we want to go into our squareDiv array and locate all the element in alienInvaders array and add a class for styling
            squareDiv[alienInvaders[i]].classList.add('invader') 

       }
          
    }
 }
 //lets now call the draw class
 draw()

 // we also need to have a function that removes  alien invaders 
 function remove() {
    // we want to loop over all the alien invaders array element, thats why we are using the alienInvaders.length
    for (let i = 0; i < alienInvaders.length; i++) {
        //we want to go into our squareDiv array and locate all the element in alienInvaders array and add a class for styling
     squareDiv[alienInvaders[i]].classList.remove('invader')   
    }
 }


 //(1E)
 // now to that we have our alien invaders, we now need to draw our shooter
 // in our squareDiv array, we will pass through a index number for our shooter and we will add a class of shooter to it
 // now that we have a shooter we need to make it move 

 squareDiv[currentShooterIndex].classList.add('shooter')

 // we will move our shooter to our moveShooter function 

 
 // we will do that with a function 
 // we add an e to function because we will be listening for keyboard event

 function moveShooter(e) {

    // we will first remove the user,by removing the class
     squareDiv[currentShooterIndex].classList.remove('shooter') 
     // we will create a switch statement for the movement of our shooter
     switch(e.key) {

        case 'ArrowLeft':
            // if the left arrow  is clicked, we want to check if the shooter width is not 0,
            //which means is not at the corner which means, we can move the user
            if(currentShooterIndex % width !==0) 
            {
                // we then want to move one step to the left
                currentShooterIndex -=1
                
            }
            break
        case 'ArrowRight':
            
            if(currentShooterIndex % width < width -1) 
            {
                currentShooterIndex +=1 
                
            }
            break    
  
        }
     // now that we have moved the user, we must now redraw it in its new position
     // by adding the class 
    squareDiv[currentShooterIndex].classList.add('shooter')

 }
 // we need to link this function to an event listener to listen for when the specific buttons are pressed
 // if any of the button is clicked, we want to call the button
 document.addEventListener('keydown',moveShooter)





 //(1F)
 // now we need to find a way to move the alien invaders 
 // we will start with a function
 function moveInvaders(){
    // we need to find a way to know where we are 
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
    // we need to call the function to remove 
    remove()


    // we need to do some logic to make sure the alien invaders move seamlessly
    //  if the last alien are at the right edge of the box 
    if (rightEdge && goingRight){
       for (let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += width +1
        direction = -1
        goingRight = false
       }  
    }

    if(leftEdge && !goingRight){
      for (let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += width -1
        direction = 1
        goingRight= true
      }  
    }

    // to get the alien to move
    // to do that we use a loop, to loop over all the alien invaders and assign new position
    for(let i = 0; i < alienInvaders.length; i++) {
     // we gonna loop item and add a one
       alienInvaders[i] += direction  
    }

    // we will call the draw function
    draw()

    // we now need to account for when the alien invaders collide with the shooter
    // so we want to check in out, div if it contains the class name invader and shooter
    if (squareDiv[currentShooterIndex].classList.contains('invader', 'shooter')){
        resultDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
    }

    // we want to set a for loop to detect when the alien invader reach the bottom of the grid 
    // we want to detect and display game over 
    for (let i = 0; i < alienInvaders.length; i++) {
       
       if(alienInvaders[i] > (squareDiv.length + width)){
         resultDisplay.innerHTML = 'GAME OVER'
         clearInterval(invadersId)
         
       }

    }

    // now want to check for a win
    if(aliensKilled.length === alienInvaders.length)
    {
      resultDisplay.innerHTML = 'YOU WIN!!'
    }
 }

 // in order to move invaders, we need to set and interval, then we call the moveInvaders
 invadersId = setInterval(moveInvaders, 300) 

 //(1G)
 // now we want to work on shooting down the aliens 

 function shoot(e) {

   // we will start by making a laser id
   let laserId
   // now want to place the laser balls directly on top of the shooter at all times

   let currentLaserIndex = currentShooterIndex

   // now that we have done that, we now want to shoot the laser up to the aliens at the top
   // we will do that by creating an function called  moveLaser

   


   function moveLaser() {

      
      
      // we first need to remove the laser from wherever it is and we do that with the function bellow
 
      squareDiv[currentLaserIndex].classList.remove('laser')
      // and once we remove the laser, we will then just move it up by 15 which is the width
      currentLaserIndex -= width

      // and then we wil add back our laser
      // this will make it look like its moving up 
      squareDiv[currentLaserIndex].classList.add('laser') 
      
      
      // now we need to make make the aliens disappear when 
      // it collides with the laser
      if (squareDiv[currentLaserIndex].classList.contains('invader')) {

         squareDiv[currentLaserIndex].classList.remove('laser')
         squareDiv[currentLaserIndex].classList.remove('invader')
         //we also to display a boom, that will disappear after some time 
         squareDiv[currentLaserIndex].classList.add('boom')

         setTimeout(()=> squareDiv[currentLaserIndex].classList.remove('boom'), 100)
         clearInterval(laserId)

         // now that we shoot the alien invader, we need to remove it
         
         // we gonna use a javascript method to pass through the indexOf the laser, so we know which div to remove the class invader 
         const alienRemoved = alienInvaders.indexOf(currentLaserIndex)

         // we will now create an empty array where we will collect all the alien we have remove
         // aliensRemoved = alienKilled
         aliensKilled.push(alienRemoved)
         // each time we remove an alien, we need to update the score
         score++
         resultDisplay.innerHTML = score
      }

   }

    // we will add a switch case  for the buttons
    switch(e.key) {
         
      case 'ArrowUp' :
      // once its pressed we gonna move the laser 100 mill sec 
      laserId = setInterval(moveLaser, 100)
      break;
      

      
   }

 }

  // we trigger it when we press any button down
  document.addEventListener('keydown', shoot)
 
  // the start 
 





