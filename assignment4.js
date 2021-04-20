var canvas;
var ctx;
var w = 1000;
var h = 600;
var allRect = [];
var allCircles = []

var o1 = {
    "x": w/2,
    "y": h/2,
    "w": 20,
    "h": 20,
    "c": 260,
    "a": 0.5,
    "angle": 0,
    "changle": 30,
    "distance": 50,
 }

var o2 = {
    "x": w/2,
    "changex": rand(10),
    "y": h/2,
    "changey": rand(10),
    "r": 150,
    "w": 100,
    "h": 100,
    "c": 260,
    "a": 0.5,
    "d":10,
    "angle": 0,
    "changle": 15,
}

var o3 = {
    "x": w/2,
    "y": h/2,
    "r": 10,
    "w": 100,
    "h": 100,
    "c": 250,
    "a": 0.5,
}
var o4 = {
    "x": w/2,
    "y": h/2,
    "r": 130,
    "w": 100,
    "h": 100,
    "c": 260,
    "a": 0.2,
}

var toggle = 1;
document.querySelector("#myCanvas").onclick = click;



setUpCanvas();
createData(10);
animationLoop();




function animationLoop(){

    clear();

    middle(o1);{
        if(toggle%2 == 1){
            angle(o1,20); 
            
        }else{
            angle(o1,0); 
        }
     
    }
      
    
    circle(o2);
    circle(o3);
    circle(o4);

    turn(o2,randn(10));
    createData(1);

    for(var i=0; i<allRect.length; i++){
        rectangle(allRect[i]);
        bounce(allRect[i]);
        if(toggle%2 == 1){
            turn(allRect[i], 1);
            forward(allRect[i],10); 
            
        }else{
            turn(allRect[i], 0);
            stop(o2);
        }
        turn(allRect[i], randn(30));
        collisionRemove(o2,allRect[i]);
        collisionTestArray(allRect[i], allRect);
     
    }


    requestAnimationFrame(animationLoop);
}





function middle(o){
    var x = o.x;
    var y = o.y;
    var a = o.angle;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    for(var i=0; i<10; i++){
        angle(o,13);
        forward(o,19);
        ctx.lineTo(o.x,o.y);
        ctx.fill();

    }
    o.x = x;
    o.y = y;
    o.angle = a;
}


function angle(o,a){
    console.log(a);
    if(a == undefined){
        o.angle+=o.changle;
    }else{
        o.angle+=a;
    }
}

function collisionTestArray(o,a){
    for(var i=0; i<a.length; i++){
        if(o != a[i]){
            collision(o,a[i]);    
        }
       
    }
}



function collisionRemove(o1,o2){
    var differencex = Math.abs(o1.x-o2.x);
    var differencey = Math.abs(o1.y-o2.y);
    var hdist = Math.sqrt(differencex*differencex + differencey*differencey);
    var index = 0;
    if(hdist < o1.r+o2.r){
        index = allRect.indexOf(o2);
        allRect.splice(index,1);
    };
}

function collision(o1,o2){
    if(o1 && o2){
        var differencex = Math.abs(o1.x-o2.x);
        var differencey = Math.abs(o1.y-o2.y);
        var hdist = Math.sqrt(differencex*differencex + differencey*differencey);
        if(hdist < o1.r+o2.r){
            if(differencex < differencey){
 
                turn(o1,360-2*o1.angle);
                turn(o2,360-2*o2.angle);
            }else{
            
                turn(o1,180-2*o1.angle);
                turn(o2,180-2*o2.angle);
            }
            turn(o1,180);
            turn(o2,180);

        };
    }
    
}

function click(event){
    toggle++;
}



function createData(num){
    for(var i=0; i<num; i++){
        allRect.push({
        "x": rand(w),
        "changex": rand(10),
        "y": rand(h),
        "changey": rand(10),
        "r": 10,
        "w": 75,
        "h": 75,
        "c": 200+rand(100),
        "a": 0.5,
        "d": 10,
        "angle": 0,
        "changle": 15,
        })
    }
}


function stop(){
    o1.changex = 0;
    o1.changey = 0;
    o2.changex = 0;
    o2.changey = 0;
}

function bounce(o){
    if(o.x>w || o.x <0){
        // o.angle = 180-o.angle;
        turn(o,180-2*o.angle);
    };
    if(o.y>h || o.y <0){
        // o.angle = 360-o.angle;
        turn(o,360-2*o.angle);
    }
}

function move(o){
    o.x+=o.changex;
    o.y+=o.changey;
}

function rectangle(o){
    var x = o.x;
    var y = o.y;
    o.x -=o.w/2;
    o.y -=o.h/2;

    ctx.beginPath();
    ctx.rect(o.x,o.y,o.w,o.h);
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();

    o.x = x;
    o.y = y;
}

function clear(){
    ctx.clearRect(0,0,w,h);
}

function turn(o,angle){
    if(angle != undefined){
        o.changle = angle;
    };
    o.angle += o.changle;
}

function forward(o,d){
    var changex;
    var changey;
    var oneDegree = Math.PI/180;
    if(d !=undefined){
        o.d = d;
    };
    changeX = o.d*Math.cos(o.angle*oneDegree);
    changeY = o.d*Math.sin(o.angle*oneDegree);
    o.x+=changeX;
    o.y+=changeY;
}

function rect(o){
    var x = o.x;
    var y = o.y;
    var a = o.angle;
    var d = o.d;

    turn(o,180);
    forward(o,o.w/2);
    turn(o,90);
    forward(o,o.h/2);
    turn(o,90);
    ctx.beginPath();
    ctx.moveTo(o.x,o.y);
    forward(o, o.w);
    ctx.lineTo(o.x,o.y);
    turn(o,90);
    forward(o, o.h);
    ctx.lineTo(o.x,o.y);
    turn(o,90);
    forward(o, o.w);
    ctx.lineTo(o.x, o.y);
    turn(o,90);
    forward(o, o.h);
    ctx.lineTo(o.x,o.y);
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();


    o.x = x;
    o.y = y;
    o.angle = a;
    o.d = d;
}


function circle(o){
    rectangle;
    ctx.beginPath();
    ctx.arc(o.x,o.y,o.r,0, 2*Math.PI);
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();
    // ctx.stroke();
}

function randn(r){
    var result = Math.random()*r-r/2;
    return result
}

function randi(r){
    var result = Math.floor(Math.random()*r);
    return result
}

function rand(r){
    return Math.random()*r
}


function setUpCanvas(){
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "5px solid black"
}

console.log("Module 10");
