var Point = (function () {
    var ctx;
    var cvs;

    function Point(context, obj){
        ctx = context;
        cvs = context.canvas;

        this.SIZE           = obj.pointSize;
        this.STRESS         = obj.stress;
        this.SPEED          = obj.speed;
        this.no = obj.no;
        this.x = Math.random() * cvs.width;
        this.y = Math.random() * cvs.height;
        this.vx = 0;
        this.vy = 0;
    }
    Point.prototype = {
        constructor:Point,
        draw:function(){
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.arc(this.x, this.y, this.SIZE, 0, Math.PI*2, false);
            ctx.fill();
        },
        getDist:function(x1, y1, x2, y2) {
            var dx = (x1 - x2);
            var dy = (y1 - y2);
            return Math.sqrt(dx*dx+dy*dy);
        }
    };
    return Point;
}());