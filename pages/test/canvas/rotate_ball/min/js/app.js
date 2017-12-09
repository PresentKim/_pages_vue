var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,d,b){if(b.get||b.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[d]=b.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,d,b,c){if(d){b=$jscomp.global;a=a.split(".");for(c=0;c<a.length-1;c++){var e=a[c];e in b||(b[e]={});b=b[e]}a=a[a.length-1];c=b[a];d=d(c);d!=c&&null!=d&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:d})}};$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,b,c){var d=this.length||0;0>b&&(b=Math.max(0,d+b));if(null==c||c>d)c=d;c=Number(c);0>c&&(c=Math.max(0,d+c));for(b=Number(b||0);b<c;b++)this[b]=a;return this}},"es6-impl","es3");
var gridContainer=null,canvas=document.createElement("canvas");canvas.setAttribute("id","rotate_ball");canvas.setAttribute("class","bordered");var context=canvas.getContext("2d"),handle=null,dots=[],circles=[];
w3.includeHTML(function(){addButton("Back","../../canvas.html");gridContainer=document.getElementById("grid-container");document.getElementById("title-text").innerText=document.title="Rotate Ball";document.getElementById("intro").innerHTML="";document.getElementById("grid-container").appendChild(canvas);generate();toggle()});
function generate(){canvas.width=gridContainer.clientWidth;canvas.height=gridContainer.clientHeight;context.clearRect(0,0,canvas.width,canvas.height);balls=[];circles=[];for(var a=new Vector2(canvas.width/2,canvas.height/2),d=Math.sqrt(canvas.width*canvas.height,2)/3,b=0;360>b;b+=15){var c=(b+7.5)*Math.PI/180,c=angleToDirection(c).multiply(new Vector2(d,d),!0).add(a,!0);balls.push(new Circle(c.x,c.y,3));0==b%30&&(c=b*Math.PI/180,c=angleToDirection(c).multiply(new Vector2(d,d),!0).add(a,!0),c=new Circle(c.x,
c.y,13),c.angle=0,circles.push(c))}render()}function move(){new Vector2(canvas.width/2,canvas.height/2);for(i in circles){var a=[balls[2*i+1],balls[0>2*i-2?24-2*i-2:2*i-2]],d=angleToDirection(circles[i].angle+i*Math.PI/12),b=getRelativeSize(circles[i].radius);a[0].from(circles[i].add(d.multiply(new Vector2(b,b),!0),!0));a[1].from(circles[i].subtract(d.multiply(new Vector2(b,b),!0),!0));circles[i].angle+=Math.PI/100;circles[i].angle>2*Math.PI&&(circles[i].angle%=2*Math.PI)}}
function render(){canvas.width=gridContainer.clientWidth;canvas.height=gridContainer.clientHeight;context.clearRect(0,0,canvas.width,canvas.height);var a=new Vector2(canvas.width/2,canvas.height/2);for(i in circles)context.beginPath(),context.strokeStyle=(new ColorHSLA(vecToAngle(circles[i],a)+120)).toString(),context.arc(circles[i].x,circles[i].y,getRelativeSize(circles[i].radius),0,2*Math.PI,!0),context.stroke(),context.closePath();for(i in balls)context.beginPath(),context.fillStyle=(new ColorHSLA(vecToAngle(balls[i],
a)+120)).toString(),context.arc(balls[i].x,balls[i].y,getRelativeSize(balls[i].radius),0,2*Math.PI,!0),context.fill(),context.closePath()}function onUpdate(){render();move();handle=requestAnimationFrame(onUpdate)}function toggle(){handle?handle=cancelAnimationFrame(handle):onUpdate()};
