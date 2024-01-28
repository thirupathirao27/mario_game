var canvas = document.querySelector('canvas');
canvas.width =1300;
canvas.height =600;

var c = canvas.getContext('2d');

function createImage(imageSrc)
{
    const image =new Image();
    image.src = imageSrc;
    return image;
}

let level = 1;


// ******** CREATE IMAGES **************
const plateformImg = createImage('./img/platform.png');
const backgroundImg = createImage('./img/background.png');
const hills = createImage('./img/hills.png')
const smallPlateform = createImage('./img/platformSmallTall.png');
const runLeft = createImage('./img/spriteRunLeft.png');
const runRight = createImage('./img/spriteRunRight.png');
const standLeft = createImage('./img/spriteStandLeft.png');
const standRight = createImage('./img/spriteStandRight.png');
const plateform2 = createImage('./img/plateform2.png');
let monstar = createImage('./img/monstar.gif');
let reversSprite = createImage('./img/spritesreverse.png');
let newPlateform = createImage('./img/p1.png');
const attack1 = createImage('./img/Attack1.png');
const attack2 = createImage('./img/Attack2.png');
const stand = createImage('./img/Idle.png');
const runAttacker = createImage('./img/Run.png');
const flag = createImage('./img/flag.png');



let container = document.getElementById('container');
let btn = document.getElementById('text');

// ******  EXACT INT VALUES *******
function getExactIntValue(num){

    return Math.floor(Math.random() * num)
}

plateformImg.onload = function()
{


   
// ******** ARRAYS ********
let plateforms = [];
let GenericObjects = [];
let moveplateforms = [];
let bullets = [];
let bulletsForPlayer = [];
let monstars = [];
let attackers = [];


// ****** VARIBLES *********
let player;
let player1;
let gravity = 0.5;
let scrollAmount = 0;
let playerspeed = 10;
let k = 5;
let openwinParticles = 0;


var Button = {
    keys :{
        pressed :false
    }
}

class Monstar 
{
    constructor(position,image,width,height)
    {
        this.position = {

            x:position.x,
            y:position.y
        }
        this.image = image;
        this.width =width;
        this.height =height;
        this.velocity = {
            x:1,
        }
        this.condCheck = 0;
        this.size = 1;
        this.sizeCheck = 0;
    }

    draw()
    {
        c.beginPath();
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);


    }

    update()
    {
        

      
        if(this.sizeCheck > 5 || this.sizeCheck < -5)
        {
            this.size = -this.size;
        }
        this.width += this.size;
        this.height +=this.size;
        this.sizeCheck +=this.size;
        
        this.draw();
    }
}

class Player
{
    constructor(image,position)
    {
        this.position ={
            x :position.x,
            y :position.y
        }
        this.image = image;
        this.width=66;
        this.height=150;
        this.frames =0;
        this.velocity={
            x:0,
            y :1
        }

        this.manImage ={
            stand:{
                right:standRight,
                left :standLeft,
                cropwidth:177,
                width:66
            },
            run :{
                right:runRight,
                left :runLeft,
                cropwidth:340,
                width:127
            }
        }

        this.flipCond = false;
        this.currentMan = this.manImage.stand.right;
        this.currentCropWidth = this.manImage.stand.cropwidth;
        this.currentWidth = this.manImage.stand.width;
    }

    draw()
        {
    if (this.flipCond) {
        // If moving left, flip the image horizontally
        c.save();
        c.scale(1, -1);
        c.drawImage(
            this.currentMan,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            -this.position.y - this.height, // Adjust y position for the flipped image
            this.currentWidth,
            this.height
        );
        c.restore();
    }
     else
     {
        // Draw normally if moving right
        c.drawImage(
            this.currentMan,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.currentWidth,
            this.height
        );
    }
}

   
    update()
    {
        if(this.frames < 59 && (this.currentMan == this.manImage.stand.right || this.currentMan == this.manImage.stand.left))
        {
            this.frames +=1;
        }
        else if(this.frames < 29 && (this.currentMan == this.manImage.run.right || this.currentMan == this.manImage.run.left)){
            
            this.frames +=1;
        }
        else{
            this.frames = 0;
        }
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y +=this.velocity.y;
        if(this.position.y + this.height + this.velocity.y < canvas.height)
        {
            this.velocity.y +=gravity;
        
        }
       
       
      
    }
}










function init()
{
     scrollAmount = 0;
     
    

// ****** PLATEFORMS********

class Plateform
{
    constructor(postion,image,width,height)
    {
        this.position ={
            x:postion.x,
            y:postion.y
        }
        this.image = image;
        this.width = width;
        this.height =height;
    }

    draw()
    {
        c.beginPath();
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
       
    }

    update()
    {
        this.draw();
    }
}


class GenericObject
{
    constructor(position,image)
    {
        this.position ={
            x:position.x,
            y:position.y
        }
        this.image =image;
        this.width = this.image.width;
        this.height = this.image.height;
    }

    draw()
    {
        c.beginPath();
        c.drawImage(this.image,this.position.x,this.position.y);
        
    }

    update()
    {
        this.draw();
    }
}

class MovePlateforms
{
    constructor(position,image,width,height)
    {
        this.position = {
            x:position.x,
            y:position.y
        }
        this.velocity = Math.random() * 3 + 1;
        this.image = image;
        this.width = width;
        this.height = height;
        this.conditionValue = 1;
    }

    draw()
    {
        c.beginPath();
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }

    update()
    {

        if(this.conditionValue > 500 || this.conditionValue < 0 )
        {
            this.velocity = -this.velocity;
          
            
        }
        this.position.x += this.velocity;
        this.conditionValue +=this.velocity;
        
        this.draw();
    }
}



// ************* ATTACKER CLASS ***************


let frame;
 class Attacker
 {
      constructor(position,image)
      {
         this.position = {
             x:position.x,
             y:position.y
         }
         this.image = image;
         this.width = 150;
         this.height = 400;
         this.frame = 0;
         this.maxFrame = 7;
         this.cropwidth = 200;
         this.flip = true;
         this.alpha = 1;
       
        
     }

      draw()
      {  
         if(this.flip)
         {
             
         c.beginPath();
         c.save();
         c.scale(-1,1);
         c.drawImage(this.image,
         this.cropwidth * this.frame,
         0,
         this.cropwidth,
         200,
         - this.position.x - this.width ,this.position.y,this.width,this.height);
        
         c.restore();
         }
         else{
             
         c.beginPath();
         
         c.scale(1,1);
         c.drawImage(this.image,
         this.cropwidth * this.frame,
         0,
         this.cropwidth,
         200,
          this.position.x ,this.position.y,this.width,this.height);
         }
         
      }

      update()
      {
        this.alpha -= 0.1;
         this.draw();  
      }
 }




let pw = plateformImg.width;
let ph = plateformImg.height;





// ********* CREATE PLATEFORMS *********
plateforms =[ new Plateform({x :0,y:canvas.height - plateformImg.height},plateformImg,pw,ph),
              new Plateform({x :plateformImg.width-2,y:canvas.height - plateformImg.height},plateformImg,pw,ph),
              new Plateform({x :plateformImg.width * 2 + 100,y:canvas.height - plateformImg.height},plateformImg,pw,ph),
              new Plateform({x :plateformImg.width * 3 + 98 ,y:canvas.height - plateformImg.height},plateformImg,pw,ph),
              new Plateform({x :plateformImg.width * 4 + 200,y:canvas.height - plateformImg.height * 3},plateformImg,200,ph),
              new Plateform({x :plateformImg.width *  4 + 500,y:canvas.height - plateformImg.height * 2},plateformImg,200,ph),
              new Plateform({x :plateformImg.width *  5 + 200,y:canvas.height - plateformImg.height},plateformImg,pw,ph),
              new Plateform({x :plateformImg.width *  8 + 500 ,y:canvas.height - plateformImg.height},plateformImg,pw,ph),
              new Plateform({x :plateformImg.width *  12  ,y:canvas.height - plateformImg.height},plateformImg,pw,ph),
              new Plateform({x :plateformImg.width *  12 + 150  ,y:200 },flag,300,300)
              ]





moveplateforms = [new MovePlateforms({x :plateformImg.width * 6 + 10,y:200},plateformImg,pw-200,ph),
                  new MovePlateforms({x :plateformImg.width * 7 + 100,y:300},plateformImg,pw,ph),
                  new MovePlateforms({x :plateformImg.width *  10 ,y:390},newPlateform,newPlateform.width + 100,newPlateform.height + 100),
                  new MovePlateforms({x :plateformImg.width *  10 ,y:150},newPlateform,newPlateform.width + 100,newPlateform.height + 100),
                  new MovePlateforms({x :plateformImg.width *  11 - 40 ,y:250},newPlateform,newPlateform.width + 100,newPlateform.height + 100)];

//   ********* CREATE BACKGROUND IMAGES *********
GenericObjects = [ new GenericObject({x : 0,y :0},backgroundImg),
                   new GenericObject({x : 0,y :0},hills)]

  player = new Player(standRight,{x:200,y:200});
 
 
monstars = [];
monstars = [new Monstar({x:plateformImg.width * 6,y:400},monstar,200,200)];

attackers = [new Attacker({x:plateformImg.width * 10,y:100},stand),
             new Attacker({x:plateformImg.width * 10 + 200,y:200},stand),
             new Attacker({x:plateformImg.width * 11 + 200,y:300},stand),
             new Attacker({x:plateformImg.width * 11 + 500,y:100},stand),
            //  new Attacker({x:plateformImg.width * 11 + 300,y:300},stand)
             ];


}
init();

btn.addEventListener('click',()=>{
   
    requestAnimationFrame(animate)
    container.style.display = 'none'
    init();
   
});

// **************BULLETS FOR MONSTAR **************
class Bullets
{
    constructor(position,radius,color,velocity)
    {
        this.position =
        {
            x:position.x,
            y:position.y
        }
        this.radius =radius;
        this.color = color;
        this.velocity = {
            x:velocity.x,
            y:velocity.y
        }
        this.alpha = 1;

    }

    draw()
    {
        c.beginPath();
        c.fillStyle=this.color;
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI * 2);
        c.fill();
        
    }

    update()
    {
        this.alpha -=0.01;
        this.position.x -= this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
       
    }
}



let particles = [];
class Particle
{
    constructor(position,radius,color,velocity)
    {
        this.position =
        {
            x:position.x,
            y:position.y
        }
        this.radius =radius;
        this.color = color;
        this.velocity = {
            x:velocity.x,
            y:velocity.y
        }
        this.alpha = 1;

    }

    draw()
    {
        c.beginPath();
        c.fillStyle=this.color;
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI * 2);
        c.fill();
        
    }

    update()
    {
        this.alpha -=0.01;
        this.position.x -= this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
       
    }
}


// ****** KEYS DECLARATION
const keys ={

    right:{
        pressed : false
    },
    left:{
        pressed : false
    }
}


 let lastKey 

 let animationId
 let lossGame = false;
function animate()
{
   animationId = requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255,0.1)';
    c.fillRect(0,0,innerWidth,innerHeight);



    //************* GENERAL OBJECT FOR EACH LOOP******** */
    GenericObjects.forEach(GenericObject=>{
        GenericObject.update();
    })

    
    // ******* PLATEFORMS FOR EACH LOOP ******
    plateforms.forEach(plateform=>{
         plateform.update();

        //  ****** PLATEFORM AND PLAYER COLLISION*****
        if(player.position.y + player.height + player.velocity.y >= plateform.position.y && plateform.position.y - player.height > player.position.y
           && player.position.x + player.width >= plateform.position.x && plateform.position.x + plateform.width > player.position.x)
        {
             player.velocity.y = 0;
        }
    })

    moveplateforms.forEach(movePlateform=>{
        movePlateform.update();

        if(player.position.y + player.height + player.velocity.y >= movePlateform.position.y && movePlateform.position.y - player.height > player.position.y
            && player.position.x + player.width >= movePlateform.position.x && movePlateform.position.x + movePlateform.width > player.position.x)
         {
              player.velocity.y = 0;
              player.position.x += movePlateform.velocity;
         }
        
    })




    // monstar area
    monstars.forEach((mon,index)=>{
        mon.update();
       
        
       
// ************* MONSTAR AND PLAYER GAP**********
         if(player.position.x - mon.position.x > -500)
         {

            // ********  CREATE BULLETS ******
             bullets.push(new Bullets({x:mon.position.x + 70,y:mon.position.y + 114},10,'red',
                {
                    x:(Math.random() * 8),
                    y:(Math.random() - 0.2 )  *  (Math.random() * 8)
                }))

            
            }
            else {
               
                bullets.forEach((bullet,index)=>{
                 
                    if(bullet.alpha < 0)
                    {
                        bullets.splice(index,1)
                    }
                })
            }
           let check =true;
            // ******COLLISION BETWEEN MONSTAR AND PLAYER*****
            if(player.position.y + player.height + player.velocity.y >= mon.position.y && mon.position.y - player.height > player.position.y
                && player.position.x + player.width >= mon.position.x && mon.position.x + mon.width > player.position.x)
             {
                

                // ************* CREATE PARTICLSE ***************
                for(var i=0;i<= 1000;i++)
                {
                    particles.push(new Particle({x:mon.position.x,y:mon.position.y},Math.random() * 2 + 1,`hsl(${getExactIntValue(360)},${50}%,${50}%)`,{
                        x:((Math.random()- 0.5) * (Math.random() *  8)),
                        y:((Math.random()- 0.5) * (Math.random() *  8))
                    }))

                }

                // ******** IF TOUCH REMOVE MONSTAR AND CREATE NEW MONSTAR *********
                let monsposition = mon.position.x;
                monstars.splice(index,1);
                monstars.push(new Monstar({x:monsposition * 5,y:Math.random () * 200 + 100},monstar,200,200));
                check = false;
              
             
             }

            //  *********** IF PLAYER DOESN'T HIT THE MONSTAR ABOVE CONDITION DOESN'T OPEN ,AT THAT TIME BASED ON DESTINCE
            // I WILL COLLAPSE THE MONSTAR AND I WILL CREATE NEW MONSTAR**************
             if(check==true && player.position.x - mon.position.x > 700 && player.position.x - mon.position.x < 900)
             {
                let monsposition = mon.position.x;
                monstars.splice(index,1);
                monstars.push(new Monstar({x:monsposition + 1500,y:Math.random () * 200 + 100},monstar,200,200));
            
             }

            
           
         if(mon.position.x  + mon.width< player.position.x){
               
            bullets.forEach((bullet,index)=>{
                 
                if(bullet.alpha < 0)
                {
                    bullets.splice(index,1)
                }
            })
            }

            // ****** REMOVE BULLETES BASED ON MONSTAR AND BULLETS DISTANCE AND CALL BULLET UPDATE METHOD
    bullets.forEach((bullet,index)=>{
       
        if(mon.position.x - bullet.position.x >  400)
        {
            bullets.splice(index,1)
        }
        else{
            bullet.update();
        }

        // // ***********COLLISION BETWEEN PLAYER AND BULLETS
        if(player.position.x + player.width > bullet.position.x && bullet.position.x + bullet.radius > player.position.x
            &&player.position.y + player.height > bullet.position.y && bullet.position.y + bullet.radius > player.position.y)
        {
            
           player.flipCond = true;
           lossGame = true;
           cancelAnimationFrame(animationId)
           
        
           
        }

      
        
    })
});


// ***************** ATTACKER AREA *************************
attackers.forEach((attacker,index)=>{
           
    // *************** TO DECREASE THE ANIMATION SPEED FOR ATTACKER ******************
    frame = attacker.frame;
if(k % 5 == 0)
{
      if(attacker.frame < attacker.maxFrame)
      {
        attacker.frame ++;
      }
      else{
        attacker.frame = 0;
      }
}
else{

    attacker.frame = frame;
}
k++;

// ************ PASS THE ATTACKER IMAGE BASED ON PLAYER ***************
   
if(attacker.position.x - player.position.x < 200 && attacker.position.x - player.position.x  > 0)
{
     attacker.image = attack1;
     attacker.maxFrame = 5;
     attacker.flip = true;

}

else if(player.position.x - attacker.position.x  < 200 &&  player.position.x - attacker.position.x > 0)
{
     attacker.image = attack1;
     attacker.maxFrame = 5;
     attacker.flip = false;
    
    
}
else if(player.position.x - attacker.position.x > 200)
{
    attacker.image = stand;
    attacker.maxFrame = 7;
    attacker.flip = false;
}
else if(attacker.position.x - player.position.x > 200) {
    attacker.image = stand;
    attacker.maxFrame = 7;
    attacker.flip = true;
    
}



// ************* COLLISION BETWEEN PLAYER AND ATTACKER ***************

if(attacker.position.x + attacker.width > player.position.x && player.position.x + player.width > attacker.position.x
    && attacker.position.y + attacker.height > player.position.y && player.position.y > attacker.position.y)
{
    cancelAnimationFrame(animationId);
    container.style.display = 'block';
    btn.innerHTML = 'LOSS THE GAME'
}

attacker.update();
 
})





if(scrollAmount > plateformImg.width *  12 )
{
    openwinParticles++;
    container.style.display = 'block';

   if(openwinParticles < 2)

   {
    
    for(var i=0;i<= 3000;i++)
    {
        particles.push(new Particle({x:player.position.x + 150 ,y:300},Math.random() * 4 + 1,`hsl(${getExactIntValue(360)},${50}%,${50}%)`,{
            x:((Math.random()- 0.5) * (Math.random() *  8)),
            y:((Math.random()- 0.5) * (Math.random() *  8))
        }))
    
    }
  

    particles.forEach((particle,index)=>{
        particle.update();
    })
}

    setTimeout(() => {
       btn.innerHTML = 'I WON THE GAME';
    },1000);

  
    setTimeout(() => {
       cancelAnimationFrame(animationId);
     },2000);

 
}

if(lossGame)
{
   container.style.display = 'block';
   setTimeout(() => {
      btn.innerHTML = 'LOSS THE GAME';
   },1000);
  
    lossGame = false;
}

if(player.position.y > canvas.height  )
{
   init();
}
   
    // *************** FOREACHLOOP FOR PARTICLES *************
    particles.forEach((particle,index)=>{
        if(particle.alpha < 0)
        {
            particles.splice(index,1)
        }
        else{
            particle.update();
        }
    })



 



    // ******* PLAYER VELOCITY BASED ON KEY PRESSING*******
     if(keys.right.pressed && player.position.x < 500)
     {
        player.velocity.x =playerspeed ;
        scrollAmount +=playerspeed  ;
     }
     else if(keys.left.pressed && player.position.x > 100 || keys.left.pressed && scrollAmount == 0 && player.position.x > 0)
     {
        player.velocity.x = -playerspeed;
        scrollAmount -= playerspeed  ;
     }
     else{
        //  ****** AFTER PLAYER REACHING FINAL POSITION MOVE PLATEFORMS************
          player.velocity.x = 0;

          if(keys.right.pressed)
          {
             plateforms.forEach(plateform=>
             {
                plateform.position.x -= playerspeed ;
             });

             GenericObjects.forEach(GenericObject=>{
                
                GenericObject.position.x -=playerspeed;
            });

            moveplateforms.forEach(movePlateform=>{
                movePlateform.position.x -= playerspeed;
            });

            monstars.forEach(mon=>{
                mon.position.x -= playerspeed;
            })

            bullets.forEach(bullet=>{
                bullet.position.x -= playerspeed;
            })

            attackers.forEach(attacker=>{
                attacker.position.x -=playerspeed;
            })

            scrollAmount +=playerspeed ;

          }
          else if(keys.left.pressed && scrollAmount > 0)
          {
            plateforms.forEach(plateform=>
                {
                   plateform.position.x +=playerspeed;
    
                });
                
                GenericObjects.forEach(GenericObject=>{
                
                    GenericObject.position.x +=playerspeed;
                });

                moveplateforms.forEach(movePlateform=>{
                    movePlateform.position.x += playerspeed;
                })

                monstars.forEach(mon=>{
                    mon.position.x += playerspeed;
                })

                attackers.forEach(attacker=>{
                    attacker.position.x +=playerspeed;
                })

                bullets.forEach(bullet=>{
                    bullet.position.x += playerspeed;
                })
    
                scrollAmount -= playerspeed;
          }
     }
    

     if(keys.right.pressed &&lastKey == 'right' && player.currentMan != player.manImage.run.right)
     {
        player.currentMan = player.manImage.run.right;
        player.currentCropWidth = player.manImage.run.cropwidth;
        player.currentWidth = player.manImage.run.width;
     }
     else if(keys.left.pressed && lastKey == 'left' && player.currentMan != player.manImage.run.left)
     {
        player.currentMan = player.manImage.run.left;
        player.currentCropWidth = player.manImage.run.cropwidth;
        player.currentWidth = player.manImage.run.width;
     }
     else if(!keys.left.pressed && lastKey == 'left' && player.currentMan != player.manImage.stand.left)
     {
        player.currentMan = player.manImage.stand.left;
        player.currentCropWidth = player.manImage.stand.cropwidth;
        player.currentWidth = player.manImage.stand.width;
     }
     else if(!keys.right.pressed && lastKey == 'right' && player.currentMan != player.manImage.stand.right)
     {
        player.currentMan = player.manImage.stand.right;
        player.currentCropWidth = player.manImage.stand.cropwidth;
        player.currentWidth = player.manImage.stand.width;
     }


// console.log('scroll amount :'+scrollAmount)
player.update();
}
animate();

  






addEventListener('keydown',({keyCode})=>{

   
     switch(keyCode)
     {
        case 65:{
            
            keys.left.pressed = true;
            lastKey = 'left';
            break;
        }
        case 68:{
           
            keys.right.pressed = true;
            lastKey = 'right'
            break;
        }
        case 87:{
          player.velocity.y = -18;
            break;
        }
        case 88:{
           
            break;
        }
     }
});

addEventListener('keyup',({keyCode})=>{

   
    switch(keyCode)
    {
       case 65:{
          
           keys.left.pressed = false;
           break;
       }
       case 68:{
          
           keys.right.pressed = false;
           break;
       }
       case 87:{
          
           break;
       }
       case 88:{
           
           break;
       }
    }
});





}
