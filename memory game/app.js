 // we start by first creating an array (1A)
 const cardArray = [
     // in the array we want to add objects
     // we gonna use the objects to create the grid
     {
        name: 'fries',
        img:'images/fries.png' 
     },
     {
        name: 'cheeseburger',
        img:'images/cheeseburger.png' 
     },
     {
        name: 'hotdog',
        img:'images/hotdog.png' 
     },
     {
        name: 'ice-cream',
        img:'images/ice-cream.png' 
     },
     {
        name: 'milkshake',
        img:'images/milkshake.png' 
     },
     {
        name: 'pizza',
        img:'images/pizza.png' 
     },
     {
        name: 'fries',
        img:'images/fries.png' 
     },
     {
        name: 'cheeseburger',
        img:'images/cheeseburger.png' 
     },
     {
        name: 'hotdog',
        img:'images/hotdog.png' 
     },
     {
        name: 'ice-cream',
        img:'images/ice-cream.png' 
     },
     {
        name: 'milkshake',
        img:'images/milkshake.png' 
     },
     {
        name: 'pizza',
        img:'images/pizza.png' 
     },
     
    
     

 ]
 ////(1B)
// to sort our objects randomly, will use the javascript method to sort everything randomly
// the code below sorts everything in the array randomly
// the sort() javascript method works by comparing two values, than sort through it.
// the math.random() in this case returns a number between 0 and 0.5
cardArray.sort(() => 0.5 - Math.random() ) 

//now using querySelector() to access the grid 
// the code below will look through the index.html document and find the grid element by id 
// we then want to store the grid element in to the variable gridDisplay
const gridDisplay = document.querySelector('#grid')


  //(2B)
 // the new array created in the cardflip function
 // this array will be used to push all the clicked card names into it 
 let cardsChosen = []

//(2E)
// this array will be used to store all the card's chosen ids
 let cardsChosenIds = []

//(2F)
// this array will be used to collect all the winning cards 
 let cardsWon =[]

 //(2h)
 // we want to display the result, so we need to grab the result span using the id
 const resultDisplay = document.querySelector('#result')

//(1C)
// then want to create a function
// we want this function to loop over the cardArray create an image element for each object in the cardArray
function createBoard() {

    // we will use a for loop
    for (let i = 0; i< cardArray.length; i++ ){

      // we want to create image element in the index file, we gonna use the createElement() method
      // we wanna store that image in the  card variable
      const card = document.createElement('img')
      
      //(1D)
      // we want to add an image to the image element we created
      // we do this by using the setAttribute
      card.setAttribute('src', 'images/blank.png')

      //(1D)
      // we also want to add a data id, to make sure each image has uniq data id
      // we use the loop i to assign the id
      card.setAttribute('data-id', i)
     // console.log(card, i)

       //(1D)
      // now that we've created the image, we want to display it index grid, using javascript
      // we use append to assign the card variable to gridDisplay
      gridDisplay.append(card)


        //(2A)
       // once the event listener is triggered we want to call the flipcard function
       card.addEventListener('click', flipCard)

    }

}
//(1C)
// we want to call the above function
createBoard()

//(2A)
// we now want to write a function, that will change the box once its clicked
// in in order to this we need to create an event listener in the createBoard function to listen for which box is being clicked 
function flipCard(){

   console.log(cardArray)

    //(2A)
    // we want to get this attribute of the clicked card and stored it in the cardId
    // the "this" element allows us to interact with any item we click
    const cardId = this.getAttribute('data-id')
    //(2A)
    //we want to get the card Id and assign it to our cardArray to get the name and picture
    // we will pass through the cardId to the array and return the name
    //console.log(cardArray[cardId].name)
    // once we have the clicked card's name, we want to store it in an a new array
    // the array has been created above
    // we now need to push the clicked card names into it, using the push() element
    //(2B)
    cardsChosen.push(cardArray[cardId].name) 

    ////(2E)
    // we now want to push the cardId to the cardsChosenIds
    cardsChosenIds.push(cardId)
    console.log(cardsChosen)
    console.log(cardsChosenIds)
    //console.log('clicked', cardId)
  
    //(2C)
    // now we want to also display the image when we send the name
    // to do this wew gonna use the this.setAttribute
    // using "this.setAttribute" we taking the card clicked and assign it the cardArray img using the cardId
    this.setAttribute('src', cardArray[cardId].img)
    // now want to check if two items are chosen and are a match, we want to increase the score
    if(cardsChosen.length === 2){
        // we want to set a timer 
        // setTimeout() is a javascript function that will call a certain function after a specified time
        // we specify the function we want to call and also set a time
        setTimeout(checkMatch, 500)
    }
}

//(2C)
// this function will be checking if two cards a user picked are a match
function checkMatch() {
   //(2C)
   // we want to write code to get all the cards on our grid
   // we want to get all the imgs in the the document and saved it as cards
   const cards = document.querySelectorAll('img')
   console.log(cards)
   // variables
   const optionOneId = cardsChosenIds[0]
   const optionTwoId = cardsChosenIds[1]

   //(2D)
  // console.log('check for match')
   // we also want to alert the user if they pick the same image
   // we the want to reset every time when that happens
   if(optionOneId  == optionTwoId){

      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png') 
       // to improve this by making it a pop up
      alert('You have clicked the same image!')
      
   }
   // we do this by going into cardsChosen array and check if the first item matches the second item
   else if(cardsChosen[0] === cardsChosen[1]){
       // if its a match display an to alert the user
       // to improve this by making it a pop up
       alert('You found a match!')

       ////(2E)
       // if they are a match we want to go into the cards array
       // and replace their background with the white background
       cards[optionOneId].setAttribute('src', 'images/white.png')
       cards[optionTwoId].setAttribute('src', 'images/white.png') 
       
       // on the same cards after they have been chosen and the background has been turned to white.
       // we want to remove the event listener from them so they stop listen for click event
       // using the removeEventListener and specifying the event we want to remove  and the function 
       cards[optionOneId].removeEventListener('click', flipCard)
       cards[optionTwoId].removeEventListener('click', flipCard)

    

       //(2F)
       // we now want to create another array to collect all the matched cards
       // we wanna know how many matches we got
       // we do this by pushing into the cardsWon array the content of the cardsChosen
       cardsWon.push(cardsChosen)

   } else{ // the you pick cards that are not a match, we want to rest back to the blank image

      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('Sorry try again')
   }
    //(2E)
   // after thats done we wanna restart
   // so we make cardsChosen and cardsChosenIds empty
   cardsChosen = []
   cardsChosenIds = []
   // we want to add results when we find a match
   resultDisplay.innerHTML = cardsWon.length

   //(2h)
   // if we get all the cards
   //  we divide by 2 because  with 12 cards we only get 6 matches

   if(cardsWon.length == cardArray.length/2 ){

     // want to display the result suing innerhtml or textcontent
     resultDisplay.textContent = "Congratulation you have found them all"

   }

}

