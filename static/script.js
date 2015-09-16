var vertex=[];
function enter(e){
	if(e.keyCode==13)
		connect();
};
function addvertex(e){
	var c_canvas=document.getElementById("graphcanvas");
	var context=c_canvas.getContext("2d");
	var x=e.clientX-c_canvas.getBoundingClientRect().left;
        var y=e.clientY-c_canvas.getBoundingClientRect().top;
	context.beginPath();
	context.fillRect(x,y,10,10);
	context.fillStyle="black";
	context.font ="20px bold Arial";
	context.fillText('v'+vertex.length,x,y);
	vertex.push({name:'v'+vertex.length,cord:[x,y],color:"black",adjacent:[]});
};
function connect(){
	x=document.getElementById("x").value;
	y=document.getElementById("y").value;
	if(x && y){
	var c_canvas=document.getElementById("graphcanvas");
        var c_context=c_canvas.getContext("2d");
	c_context.beginPath();
	var v1=find(x);
	var v2=find(y);
	c_context.lineWidth=3;
	c_context.moveTo(v1.cord[0]+5,v1.cord[1]+5);
	c_context.lineTo(v2.cord[0]+5,v2.cord[1]+5);
	if(v1.adjacent.indexOf(v2.name)==-1)
		v1.adjacent[v1.adjacent.length]=v2.name;
	if(v2.adjacent.indexOf(v1.name)==-1)
		v2.adjacent[v2.adjacent.length]=v1.name;
	c_context.stroke();
	};
};
function find(name){
	for(x in vertex){
		if(vertex[x].name==name)
			return vertex[x];
	};
};
function send_server(){
	$.post('/colour', {
                'vertex': JSON.stringify(vertex)
                 }).done(function success(datas){
                        console.log(datas[1]);
			vertex=datas[1];
			colour_vertex();
                }).fail(function error(){
                alert("error");
           });
};
function colour_vertex(){
	for(v in vertex){
		var canvas=document.getElementById("graphcanvas");
	        var c_context=canvas.getContext("2d");
        	var x=vertex[v].cord[0];
        	var y=vertex[v].cord[1];
		c_context.fillStyle=vertex[v].color;
        	c_context.beginPath();
        	c_context.fillRect(x,y,10,10);
		c_context.closePath();
	};
};
