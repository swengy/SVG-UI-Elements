var SNAP_VALUE = 100;
var RANGE = 5000;
var SPLIT = 1000;

var lowerVal;
var upperVal;

var selectedLowerVal;
var selectedUpperVal;

var mouseIsDown;

var target;
var xStart = 50;
var xEnd = 250;

var graphTop = 270;
var graphBottom = 300;

var lowerHandlePoints = (xStart-10) + "," + graphBottom + " " + xStart + "," + graphTop;
var upperHandlePoints = xEnd + "," + graphTop + " " + (xEnd+10) + "," + graphBottom;

var visualRANGE = xEnd - xStart;
/*
	 d="M 50,300 
	 
		  100,300
		  100,250
		  
		  200,250
		  200,300
		  
		  250,300
		  "
  */

$(document).ready(function() {

  $("#graph")[0].setAttribute("d", "M 40," + graphBottom + " " + lowerHandlePoints + " " + upperHandlePoints + " 260," + graphBottom);
  
  UpdateSliders(500, 4500);
  
  function UpdateSliders(low, high) {
	
	selectedLowerVal = low;
	selectedUpperVal = high;
	
	lowerHandlePoints = (RangeFromValue(low)-10) + "," + graphBottom + " " + RangeFromValue(low) + "," + graphTop;
	upperHandlePoints = RangeFromValue(high) + "," + graphTop + " " + (RangeFromValue(high)+10) + "," + graphBottom;
	$("#graph")[0].setAttribute("d", "M 40," + graphBottom + " " + lowerHandlePoints + " " + upperHandlePoints + " 260," + graphBottom);
	
	$("#lower")[0].setAttribute("cx", RangeFromValue(low));
	$("#upper")[0].setAttribute("cx", RangeFromValue(high));
	
	$("#valLower")[0].textContent = parseInt(ValueToSnap(low));
	$("#valUpper")[0].textContent = parseInt(ValueToSnap(high));
  }
  
  function ValueToSnap(value)
  {
	return Math.floor(value / SNAP_VALUE) * SNAP_VALUE;
  }
  
  function ValueFromRange(visualPos)
  {
	return RANGE/visualRANGE * (visualPos - xStart);
  }
  
  function RangeFromValue(value)
  {
	return visualRANGE/RANGE * value + xStart;
  }
  
  function handleSlide(e) {
  
	target = e.target.id != "" ? e.target.id : target;
	
	var mouse_x = e.pageX;

	var position;
	var targetPos
	
	if(target == "lower" && mouseIsDown)
	{
		targetPos = $("#lower")[0].getAttribute("cx");

		lowerVal = ValueFromRange(mouse_x);
		
		if((mouse_x >= xStart && mouse_x <= xEnd) && lowerVal <= SPLIT)
		{	
			position = mouse_x;
			
			
			if(mouse_x != targetPos)
			{	
				selectedLowerVal = ValueFromRange(position);
				lowerHandlePoints = (position-10) + "," + graphBottom + " " + position + "," + graphTop;
				$("#lower")[0].setAttribute("cx", position);
			}
		}
	}
	else if(target == "upper"&& mouseIsDown)
	{
		targetPos = $("#upper")[0].getAttribute("cx");
		
		upperVal = ValueFromRange(mouse_x);
			
		if((mouse_x >= xStart && mouse_x <= xEnd) && upperVal >= SPLIT)
		{

			position = mouse_x;
		
			if(mouse_x != targetPos)
			{
				selectedUpperVal = ValueFromRange(position);
				upperHandlePoints = position + "," + graphTop + " " + (position+10) + "," + graphBottom;
				$("#upper")[0].setAttribute("cx", position);
			}
		}
	}
	
	$("#graph")[0].setAttribute("d", "M 40," + graphBottom + " " + lowerHandlePoints + " " + upperHandlePoints + " 260," + graphBottom);
	
	$("#valLower")[0].textContent = parseInt(ValueToSnap(selectedLowerVal));
	$("#valUpper")[0].textContent = parseInt(ValueToSnap(selectedUpperVal));
  }
  
  $('.slideHandle').mousedown(function(e) {
    e.preventDefault();
	
    $(document).bind('mousemove.slide', function(e2) {
		mouseIsDown = true;
        handleSlide(e2);
    });
  });

  $(document).mouseup(function(e) {
		mouseIsDown = false;
		$(document).unbind('mousemove.slide');
  });
});
