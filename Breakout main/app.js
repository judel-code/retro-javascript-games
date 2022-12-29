
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100 // we get this from our css file
const blockHeight = 20
const ballWidth = 20
const boardWidth = 560
const boardHeight = 300 
let timerId 
let xDirection = 2
let yDirection = 2
let score = 0


// user position 

const  userStart = [230, 10]
// we want to be able to track the user's movement 
let currentPosition = userStart


const ballStart = [270, 40]
let ballCurrentPosition = ballStart

//(1B) create block
// Block = drawBlock
// we need to create 15 blocks
// in order to do that, we will create a class

class drawBlock {
    // we add a constructor
    // the xAxis and yAxis represent the bottom left of out blocks
    // using the xAxis  and yAxis we can figure out the other 4 points
    // we will do this using the width variable of the block 
    constructor(xAxis, yAxis) {
        // using the xAxis and yAxis to get the other points
        // we pull the xAxis and yAxis  values from  the blocksArray constant 
        this.bottomLeft = [xAxis,yAxis]
        // to get the point of the bottom right 
        this.bottomRight = [xAxis + blockWidth, yAxis]
        // to get the top left
        this.topLeft = [xAxis, yAxis + blockHeight]
        // to get the top right
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}


//(1C) creating an array to draw  all the blocks
// blocks = blocksArray

const blocksArray = [

    new drawBlock(10,270),
    new drawBlock(120,270),
    new drawBlock(230,270),
    new drawBlock(340,270),
    new drawBlock(450,270),
    new drawBlock(10,240),
    new drawBlock(120,240),
    new drawBlock(230,240),
    new drawBlock(340,240),
    new drawBlock(450,240),
    new drawBlock(10,210),
    new drawBlock(120,210),
    new drawBlock(230,210),
    new drawBlock(340,210),
    new drawBlock(450,210),
    
]

//console.log(blocksArray[0])



//(1A) draw all the blocks
// const block = blockDiv
// so we need to make 15 blocks
// we will start by creating one
// we will place it into a function 
function addBlocks() {

  // to draw all the blocks  we need to add a for loop in this function
  for (let i = 0; i < blocksArray.length; i++) {
    
        // we will start by creating one using the create element method
        const blockDiv = document.createElement('div')
        // now want to add to the block div we just created a class of block for styling   
        blockDiv.classList.add('block')
        // to style and position the div Block
        // we pull those values from the constructor values
        // we go into our blocksArray and collect the i value the we get the anchor points in  the constructor
        blockDiv.style.left = blocksArray[i].bottomLeft[0] + 'px'
        blockDiv.style.bottom = blocksArray[i].bottomLeft[1] + 'px'
        // we now gonna add the block div to the main grid by using appendChild method
        grid.appendChild(blockDiv)
  }

}

// only when we call this function then we will create a block
addBlocks()



//(1D)
// creating a user 
// we gonna do that by creating a div 
const user =  document.createElement('div')
// to style the user
user.classList.add('user')
// we will now append the user div to the main grid 
grid.appendChild(user)
// the user block will appear at the top, we need to position the block correctly 
// we will get the current position 
//user.style.left = currentPosition[0] + 'px'
//user.style.bottom = currentPosition[1] + 'px'
// just call the function 
drawUser()

// we gonna be changing the user div position alot, so we need to put it in its own function
// redraw the user
function drawUser() {

    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'

}


//(1E)
// move the user
// we add the e in because we gonna be listening for events 
function moveUser(e) {

    // we gonna use the case switch to listen out for keys being pressed
    switch(e.key) {
        // we will be passing through the key event and we will try to see if it matches any of the case statement
        case 'ArrowLeft':
            // we gonna add an if statement  to restrict the user block from being moved out of the main grid 
            if(currentPosition[0]> 0){
            // we want to move the user div if the arrow key is pressed
            currentPosition[0] -= 10
            // after we change position, we want to re assign the position 
            drawUser()

            }
        break;

        case 'ArrowRight':
            // we gonna add an if statement  to restrict the user block from being moved out of the main grid 
            // we do boardWidth - blockWidth because we taking into account the block size because the anchor points are on the bottom left
            // if we dont do this the block will only stop when the anchor points reach 560 
            if(currentPosition[0] < boardWidth - blockWidth){
            // we want to move the user div if the arrow key is pressed
            currentPosition[0] += 10
            // after we change position, we want to re assign the position 
            drawUser()

            }
        break;

    }
}

// we need to add the moveUser event listener to listen when keys are pressed  then we run the moveUser
document.addEventListener('keydown', moveUser)


//(1F2)
// draw the  ball
function drawBall(){

    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'

}

//(1F)
// we now need to create the ball 
const ball = document.createElement('div')
ball.classList.add('ball')
// we also need to give it a start position 
//ball.style.left = ballCurrentPosition[0] + 'px'
//ball.style.bottom = ballCurrentPosition[1] + 'px'
// since we gonna be changing position of the ball alot, it better we put it in a function 
// we will put it in the drawBall function
// we will call the function
drawBall()
// we adding the ball the the main grid 
grid.appendChild(ball)


//(1G)
// now we want to work on moving the ball 
// we will create a function, which we can call every time we want to move the ball 
function moveBall() {
 
     ballCurrentPosition[0] += xDirection
     ballCurrentPosition[1] += yDirection 
     drawBall()
     checkForCollisions()

}

// we also need to put it on an interval
timerId = setInterval(moveBall, 30)

//(1G2)
// now that we get the ball moving, we need to get the ball to change direction when it hits the walls of the grid 
// check for collisions 
function checkForCollisions(){
    // lets check for wall collisions 
    // we can do this by checking the ball's current position 
    // this will let know that the ball is on the wall of the grid
    if
    (
        ballCurrentPosition[0] >= (boardWidth - ballWidth) || 
        ballCurrentPosition[1] >= (boardHeight - ballWidth)||
        ballCurrentPosition[0] <= 0
    ){
        // we need to create a change direction function 
        changeDirection()
    }
    // check for user collision 
    // we are checking if the ball is in between
    if 
    (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight) 
    ){
        changeDirection()
    }

    // to check if the game is over 
    if(ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose'
        // we want to stop the event listener once the game is over
        document.removeEventListener('keydown', moveUser)
        //console.log('game over')
    }

    //check for block collisions
    // we will use a 4 loop 
    for (let i = 0; i < blocksArray.length; i++){
       // to check for collision we gonna check if the ball is between the blocks bottom left xAxis and bottom right xAxis 
       // we gonna write this and loop it for every block
       // we want to check if the ball's current position  is bigger the a block bottom left xAxis but smaller then blocks'S bottom right Axis 
       
       if 
       (
            (ballCurrentPosition[0] > blocksArray[i].bottomLeft[0] && ballCurrentPosition[0] < blocksArray[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballWidth) > blocksArray[i].bottomLeft[1] && ballCurrentPosition[1] < blocksArray[i].topLeft[1] )
       ){
         // if the above is true.. we want to remove the block 
         // we want to grab the block which contains the  class block
         // to do this we need to remove the class of that specific
        
         const allBlocks = Array.from(document.querySelectorAll('.block'))
         // we gonna loop through all the blocks and any blocks containing  the class block remove it
         allBlocks[i].classList.remove('block')
         // we will use splice  to remove the block from the array 
         blocksArray.splice(i, 1)
         // once we remove the block, we also wanna change the ball's direction 
         changeDirection()
         // we also wanna add the score
         score++
         scoreDisplay.innerHTML = score

         // check for  win 

         if(blocksArray.length === 0 ){
            scoreDisplay.innerHTML = 'YOU WIN'
            clearInterval(timerId)
            document.removeEventListener('keydown', moveUser)
         }
         
       }
    }
}

function changeDirection() {
     // when the ball hits the wall, we want to check if the ball x and y ball direction is equal to 2 and we want to change those numbers to change direction
    if (xDirection === 2 && yDirection === 2){
       yDirection = -2
       return
    }

    if (xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
     }

     if (xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
     }

     if (xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
     }
}




