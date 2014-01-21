// Stats instance
var stats;


var cW = window.innerWidth;
var cH = window.innerHeight;
var cvs;
var ctx;
var virus;
var virus2;
var virus3;
var viruses = [];
var request;

// Stats.js to monitor the FPS
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '20px';
stats.domElement.style.top = '20px';
document.body.appendChild( stats.domElement );

init();
function init(){

    cvs = document.querySelector("canvas");
    ctx = cvs.getContext("2d");
    cvs.width = cW;
    cvs.height = cH;

    var obj = {
        pointNum       :30,
        pointSize      : 1,
        lineWidth      : 0.05,
        minDistance    : 20,
        speed           : 20,
        stress          : .5
    };
    var obj2 = {
        pointNum       :50,
        pointSize      : 1,
        lineWidth      : 0.05,
        minDistance    : 100,
        speed           : 20,
        stress          : .5
    };
    var obj3 = {
        pointNum       :30,
        pointSize      : 1,
        lineWidth      : 0.05,
        minDistance    : 150,
        speed           : 20,
        stress          : .5
    };

    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,cW,cH);

    virus = new Virus(ctx, obj);
    virus2 = new Virus(ctx, obj2);
    virus3 = new Virus(ctx, obj3);
    viruses.push(virus, virus2, virus3);
    draw();
}

function draw(){
    stats.begin();

    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,cW,cH);
    for (var i = 0; i < viruses.length; i++) {
        viruses[i].draw();
    }
    request = requestAnimFrame(draw);

    stats.end();
}

window.onresize = function(){
    cW = window.innerWidth;
    cH = window.innerHeight;
    ctx.canvas.width  = cW;
    ctx.canvas.height = cH;
}
window.onblur = function (){
    if (request){
        cancelRequestAnimFrame(request);
        request = undefined;
    };
}
window.onfocus = function (){
    if(request === undefined){
        draw();
    }
}


