var selectedElement;
var pressedButton;
var numButtons;
			//document.getElementById(elementID + " > buttonLED").style["fill"] = "#00FF00";

$(document).ready(function() {
  function buttonPress(e, pw) {
  
	pressedButton = selectedElement.children("desc")[0].id;
	
	var grpbtns = $(".grpbtn");
	
	for (i = 0; i < grpbtns.length; ++i) {
		var btn = grpbtns[i];
		var led = $("#"+ btn.id + " #buttonLED");
		led[0].style["fill"] = "#FF0000";
	}
	
	selectedElement.children("#buttonLED")[0].style["fill"] = "#00FF00";
	
	document.getElementById("val").textContent = pressedButton;
	
  }
  
  $('.grpbtn').mousedown(function(e) {
    e.preventDefault();
	
	var elementClass = $(e.target).parent().attr('class');
	
	if(elementClass.indexOf("grpbtn") > -1)
	{
	
	var targ = $("#" + $(e.target).parent().attr('id')).children("#buttonShape")[0];
	
		selectedElement = $("#" + $(e.target).parent().attr('id'));
		
		targ.style["fill"] = "url(#buttonSurfaceDown)";
		targ.style["stroke"] = "url(#buttonEdgeDown)";
	}
	
    $(document).bind('mousedown.impression', function(e2) {
        buttonPress(e2, $('g'));
    });
  });

  $(document).mouseup(function(e) {
	var elementClass = $(e.target).parent().attr('class');
	
	if(elementClass.indexOf("grpbtn") > -1)
	{
	var targ = $("#" + $(e.target).parent().attr('id')).children("#buttonShape")[0];
		targ.style["fill"] = "url(#buttonSurfaceUp)";
		targ.style["stroke"] = "url(#buttonEdgeUp)";
	}
	
    $(document).unbind('mousedown.impression');
  });
});
