var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,c,d){var b=this.length||0;0>c&&(c=Math.max(0,b+c));if(null==d||d>b)d=b;d=Number(d);0>d&&(d=Math.max(0,b+d));for(c=Number(c||0);c<d;c++)this[c]=a;return this}},"es6-impl","es3");
var gridContainer=null,canvas=document.createElement("canvas");canvas.setAttribute("id","rotate_ball");canvas.setAttribute("class","bordered");var context=canvas.getContext("2d"),handle=null,dots=[],circles=[],lastRelativeSize=1;
w3.includeHTML(function(){addButton("Back","../../canvas.html");gridContainer=document.getElementById("grid-container");document.getElementById("title-text").innerText=document.title="Rotate Ball";document.getElementById("intro").innerHTML="";document.getElementById("grid-container").appendChild(canvas);canvas.width=gridContainer.clientWidth;canvas.height=gridContainer.clientHeight;lastRelativeSize=getRelativeSize(1);generate();toggle()});
function generate(){canvas.width=gridContainer.clientWidth;canvas.height=gridContainer.clientHeight;context.clearRect(0,0,canvas.width,canvas.height);balls=[];circles=[];for(var a=new Vector2(canvas.width/2,canvas.height/2),b=0;360>b;b+=30){balls.push(new Circle(0,0,3));balls.push(new Circle(0,0,3));var c=angleToDirection(b*Math.PI/180).multiply(29*lastRelativeSize).add(a),c=new Circle(c.x,c.y,12);c.startAngle=Math.PI/2+Math.PI/12*circles.length;c.angle=c.startAngle;c.enable=!1;circles.push(c)}for(i in circles)a=
[balls[2*i+1],balls[0>2*i-2?24-2*i-2:2*i-2]],b=angleToDirection(circles[i].angle+i*Math.PI/12).multiply(getRelativeSize(circles[i].radius)),a[0].from(circles[i].add(b,!0)),a[1].from(circles[i].subtract(b,!0));circles[0].enable=!0;render()}
function move(){new Vector2(canvas.width/2,canvas.height/2);for(i in circles)if(circles[i].enable){var a=[balls[2*i+1],balls[0>2*i-2?24-2*i-2:2*i-2]],b=angleToDirection(circles[i].angle+i*Math.PI/12).multiply(getRelativeSize(circles[i].radius));a[0].from(circles[i].add(b,!0));a[1].from(circles[i].subtract(b,!0));circles[i].angle-=Math.PI/100;circles[i].angle+Math.PI/5<circles[i].startAngle&&(circles[0==i?11:i-1].enable=!0);circles[i].angle+Math.PI<circles[i].startAngle&&(circles[i].angle=circles[i].startAngle,
circles[i].enable=!1)}}
function render(){canvas.width=gridContainer.clientWidth;canvas.height=gridContainer.clientHeight;var a=getRelativeSize(1);if(lastRelativeSize!=a){var b=a/lastRelativeSize;lastRelativeSize=a;a=new Vector2(b,b);for(i in circles)circles[i].multiply(a);for(i in balls)balls[i].multiply(a)}context.clearRect(0,0,canvas.width,canvas.height);a=new Vector2(canvas.width/2,canvas.height/2);for(i in circles)context.beginPath(),b=Math.abs(circles[i].angle-circles[i].startAngle+Math.PI/2),context.strokeStyle=(new ColorHSLA(vecToAngle(circles[i],
a)+120,100,50,b<Math.PI/2?1-b/Math.PI*1.8:0)).toString(),context.shadowBlur=10,context.shadowColor=context.strokeStyle,context.lineWidth=.5*lastRelativeSize,context.arc(circles[i].x,circles[i].y,getRelativeSize(circles[i].radius),0,2*Math.PI,!0),context.stroke(),context.closePath();for(i in balls)context.beginPath(),context.fillStyle=(new ColorHSLA(vecToAngle(balls[i],a)+120)).toString(),context.shadowBlur=10,context.shadowColor="gray",context.arc(balls[i].x,balls[i].y,getRelativeSize(balls[i].radius),
0,2*Math.PI,!0),context.fill(),context.closePath()}function onUpdate(){render();move();handle=requestAnimationFrame(onUpdate)}function toggle(){handle?handle=cancelAnimationFrame(handle):onUpdate()};
