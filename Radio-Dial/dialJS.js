var RANGE_PER_REV = 10000;
var SNAP = true;
var SNAP_VALUE = 20;

var rotaryCountPerRev = 0;
var speed = RANGE_PER_REV / 360;
var previousDegree = 0;
var degree = 0;

var degMove = 0;

var timer;

$(document).ready(function() {

  function rotateOnMouse(e, pw) {
  
	  var origin_x = 256;
	  var origin_y = 256;
	  
      var mouse_x = e.pageX;
      var mouse_y = e.pageY;
      var radians = Math.atan2(mouse_x - origin_x, mouse_y - origin_y) - (Math.PI);
	  previousDegree = degree;
      degree = (radians * (180 / -Math.PI));
	
	degMove = degree - previousDegree;
	
	rotaryCountPerRev += (degMove) * speed;
	
	// temporary condition to increment by major value when a full rotation boundary is reached.
	if(degMove < -180)
	{	
		rotaryCountPerRev += RANGE_PER_REV;
	}
	else if(degMove > 180)
	{
		rotaryCountPerRev -= RANGE_PER_REV;
	}
	
	var outputVal = rotaryCountPerRev;
	
	if(SNAP)
	{
		outputVal = Math.floor(outputVal / SNAP_VALUE) * SNAP_VALUE;
	}
	
	document.getElementById("dial").setAttribute("transform", "rotate(" + degree + ",256,256)");
	document.getElementById("number").textContent = parseInt(outputVal);
	
  }
  
   var dec = 0.02;
   var fricStop = 0.1;
  
  // function rotateDec(pw, dif) {
  
	// if(degMove > fricStop)
	// {
	
	// degree += degMove;
	
	// degMove -= dec;
	
	// rotaryCountPerRev += (degMove) * speed;
	
	// // temporary condition to increment by major value when a full rotation boundary is reached.
	// if(degMove < -180)
	// {	
		// rotaryCountPerRev += RANGE_PER_REV;
	// }
	// else if(degMove > 180)
	// {
		// rotaryCountPerRev -= RANGE_PER_REV;
	// }
	
	// var outputVal = rotaryCountPerRev;
	
	// if(SNAP)
	// {
		// outputVal = Math.floor(outputVal / SNAP_VALUE) * SNAP_VALUE;
	// }
	
	// document.getElementById("dial").setAttribute("transform", "rotate(" + degree + ",256,256)");
	// document.getElementById("number").textContent = parseInt(outputVal);
	
	// }
	
	// else if(degMove < -fricStop)
	// {
		// degree -= degMove;
		// degMove += dec;
		
		// rotaryCountPerRev += (degMove) * speed;
		
		// // temporary condition to increment by major value when a full rotation boundary is reached.
		// if(degMove < -180)
		// {	
			// rotaryCountPerRev += RANGE_PER_REV;
		// }
		// else if(degMove > 180)
		// {
			// rotaryCountPerRev -= RANGE_PER_REV;
		// }
		
		// var outputVal = rotaryCountPerRev;
		
		// if(SNAP)
		// {
			// outputVal = Math.floor(outputVal / SNAP_VALUE) * SNAP_VALUE;
		// }
		
		// document.getElementById("dial").setAttribute("transform", "rotate(" + degree + ",256,256)");
		// document.getElementById("number").textContent = parseInt(outputVal);
	// }
	
	// else
	// {
		// degMove = 0;
		// window.clearInterval(timer);
	// }
	
  // }
  

  $('#fingerhole').mousedown(function(e) {
    e.preventDefault(); // prevents the dragging of the image.
    $(document).bind('mousemove.rotateDial', function(e2) {
	  window.clearInterval(timer);
      rotateOnMouse(e2, $('g'));
    });
  });

  $(document).mouseup(function(e) {
    $(document).unbind('mousemove.rotateDial');
	
	//$(document).bind('mousemove.rotateDial', function(e3) {
	
	  //timer = setInterval(function () {rotateDec($('g'), degMove)}, 10);
	  //$(document).unbind('mousemove.rotateDial');
	//});
  });
});
