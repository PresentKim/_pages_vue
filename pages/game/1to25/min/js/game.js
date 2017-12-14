var Game=function(c,a){this.canStart=!0;this.started=!1;this.intervalId=null;this.countDownDate=(new Date).getTime();this.pre_goal=25;this.grid=new Grid(c,a);for(var b=0;b<this.grid.length;b++)this.grid.cells[b].getElement().addEventListener("click",this.clickCell.bind(null,b),!1);this.playTime=new ElementControl("play-time-text",0,TimeFomatter);this.bestTime=new ElementControl("best-time-text",0,TimeFomatter);this.target=new ElementControl("target-text",0);this.goal=new ElementControl("goal-text",
25);this.restartButton=new ElementControl("restart-button","New Game");this.gobackButton=new ElementControl("goback-button","Back");this.gridCover=new ElementControl("grid-cover","");this.goal.getElement().addEventListener("click",function(){game.started||game.goal.setData(100<=game.goal.getData()?25:game.goal.getData()+25)},!1);this.restartButton.getElement().addEventListener("click",function(){game.canStart&&(game.started?game.stop():game.start())},!1);this.gobackButton.getElement().addEventListener("click",
function(){window.history.back()},!1);document.getElementById("cheat-panel").addEventListener("click",function(){for(b=0;b<game.grid.length;b++)if(game.target.getData()==game.grid.cells[b].getData()){game.clickCell(b);break}},!1)};
Game.prototype.start=function(){null==this.intervalId&&(this.intervalId=setInterval(function(){if(this.started){var a=(new Date).getTime()-this.countDownDate;this.playTime.setData(a);0==this.bestTime.getData()&&this.bestTime.setData(a)}},10));this.started=!0;this.countDownDate=(new Date).getTime();this.target.setData(1);for(var c=[];c.length<this.grid.length;){var a=Math.ceil(25*Math.random());-1==c.indexOf(a)&&(c[c.length]=a)}for(a=0;a<this.grid.length;a++){var b=this.grid.cells[a];b.setData(c[a]);
b.getElement().setAttribute("style","color: #777777; background: #"+(a%2?"e4dad0":"eee4da")+";");b.getElement().disabled="false"}this.restartButton.getElement().innerText="Stop";this.gridCover.getElement().style.animation="";setTimeout(function(){game.gridCover.getElement().style.animation="cover-hide 1s forwards"},10)};
Game.prototype.stop=function(){null!=this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null);this.started=!1;this.pre_goal=25;this.target.setData(0);this.restartButton.setData("NewGame");for(var c=0;c<this.grid.length;c++)this.grid.cells[c].setData(0)};
Game.prototype.clickCell=function(c){if(game.started){var a=game.grid.cells[c];if(game.target.getData()==a.getData()){if(game.goal.getData()==game.pre_goal&&a.getData()<=game.pre_goal)a.getElement().disabled="true",a.getElement().style.animation="",a.getElement().style.animation="cell-remove 2s forwards";else a:for(;;){c=Math.ceil(25*Math.random())+game.pre_goal;for(var b=0;b<game.grid.length;b++)if(game.grid.cells[b].getData()==c)continue a;a.setData(c);a.getElement().disabled="true";a.getElement().style.animation=
"";setTimeout(function(){a.getElement().style.animation="cell-change 2s forwards"},10);break a}game.target.getData()==game.pre_goal&&(game.pre_goal+=25);game.target.getData()==game.goal.getData()&&((0==game.bestTime.getData()||game.bestTime.getData()>game.playTime.getData())&&game.bestTime.setData((new Date).getTime()-game.countDownDate),game.gridCover.getElement().style.animation="",setTimeout(function(){game.gridCover.getElement().style.animation="cover-show 1s forwards";game.gridCover.setData("End!")},
10),game.stop());game.target.setData(game.target.getData()+1)}}};
