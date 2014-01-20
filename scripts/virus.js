
var Virus = (function (){
    var ctx;
    var cvs;

    function Virus(context,obj){
        ctx = context;
        cvs = ctx.canvas;

        this.points = [];
        this.init(obj);
    }

    Virus.prototype = {
        constructor:Virus,
        init:function (obj) {
            this.POINT_NUM       = obj.pointNum;
            this.LINE_WIDTH      = obj.lineWidth;
            this.MIN_DISTANCE    = obj.minDistance;

            for (var i = 0; i < this.POINT_NUM; i++) {
                this.points.push(
                    new Point(ctx,{
                        no:i,
                        pointSize:obj.pointSize,
                        stress:obj.stress,
                        speed:obj.speed
                    })
                );
            }
        },
        draw:function () {
            for(var i=0; i<this.POINT_NUM; i++) {
                this.points[i].draw(ctx);
                this.move(this.points[i]);
                for(var j=i; j<this.POINT_NUM; j++) {
                    this.connect(i,j);
                }
            }
        },
        move:function(point){
            var min = cvs.width + cvs.height;
            var gx = cvs.width/2;
            var gy = cvs.height/2;
            var min_no = point.no;

            var d = point.getDist(point.x, point.y, cvs.width/2, cvs.height/2);
            if (d < this.MIN_DISTANCE*2) {
                for (var i=0; i<this.POINT_NUM; i++) {
                    if (i != point.no) {
                        d = point.getDist(point.x, point.y, this.points[i].x, this.points[i].y);
                        if (min > d) {
                            min = d;
                            min_no = i;
                        }
                    }
                }
                if (this.MIN_DISTANCE >= min) {
                    gx = point.x + (point.x - this.points[min_no].x)/2;
                    gy = point.y + (point.y - this.points[min_no].y)/2;
                }
            }
            point.vx += ((point.x - gx) - point.vx * point.STRESS);
            point.x -= point.vx / point.SPEED;
            point.vy += ((point.y - gy) - point.vy * point.STRESS);
            point.y -= point.vy / point.SPEED;
        },
        connect:function (i,j) {
            ctx.beginPath();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = this.LINE_WIDTH;
            ctx.moveTo(this.points[i].x, this.points[i].y);
            ctx.lineTo(this.points[j].x, this.points[j].y);
            ctx.closePath();
            ctx.stroke();
        }
    }

    return Virus;
}())