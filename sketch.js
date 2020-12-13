var dog,dogimg, happyDog, database, foodS, foodStock
var fedTime,lastFed
var feed,addFood;
var foodObj



function preload()
{
  dogimg=loadImage("images/dogimg.png")
  happyDog=loadImage("images/dogimg1.png")
}

function setup() {

	createCanvas(500, 500);
  database = firebase.database();
   foodObj=new food()
dog=createSprite(200, 100, 20,20);
dog.addImage(dogimg)
dog.scale=0.2

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  feed=createButton("Feed the dog")
  feed.position(400,300)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(500,300)
  addFood.mousePressed(addFoods)
}


function draw() {

  background(46,139,87);
  foodObj.display()

 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last Feed:"+lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else{
    text("Last Feed :"+lastFed+"AM",350,30)
  }
  
  
  drawSprites();
  fill (255,255,254)
  stroke ("black")
  text("foodRemaining :"+foodS,150,200)
  textSize(10)

 
}
 function readStock(data){
   foodS=data.val()
   foodObj.updateFoodStock(foodS)
 }

 

 function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}