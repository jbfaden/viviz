// TODO: $.gallery({"showdropdowns":true,"showfilmstrip":true,"showattributes":true,"showconfiguration":true,"showprint",true,"showgrid",true,"showabout":true,"compact","false"]})
// TODO:
//     If vector image, use imgconvert.org.
//     If raster image and thumbs not available, use imgconvert.org.

LAZY_LOAD_MAX  = 12;
FIT_TO_WINDOW  = true; // Code needs work.
//FIT_TO_WINDOW  = true; // Code needs work.			
VIVIZ = {
			"CATALOGXML":"xml/test-catalog.xml",
			"defaultmode":"thumb",
			"showthumbstrip":false,
			"thumbheight":10.15,
			"thumbwidth":10.15,
			"fullwidth":550,
			"fullheight":880
		};

$(document).ready(function(){
	$("#thumbbrowsebutton").click(function () {
		$('#g-container').hide();
		$('#t-container').show();
		thumb("#thumb1");
	})
	$("#gallerybrowsebutton").click(function () {
		$('#t-container').hide();
		$('#g-container').show();
		gallery("#gallery1");
		//$("#gallery1 #gallerythumbframe img").first().click(); // To trigger resize of thumb div.
	})

	if (VIVIZ["defaultmode"] == "gallery") {
		$("#gallerybrowsebutton").click();
		//gallery("#gallery1");$('#g-container').show();
		//setTimeout(function () {thumb("#thumb1")},1000);
	} else {
		$("#thumbbrowsebutton").click();
		//thumb("#thumb1");$('#t-container').show();
		//setTimeout(function () {thumb("#gallery1")},1000);
	}
	
	$("#skin").change(function() {
		var newTheme =  $(this).attr('value');
		$("#jQuery-style").attr("href",newTheme);
		setCookie('ViVizTheme',newTheme, 365);
		return false;
	});
	$('.button').mouseenter(function(){
		$(this).removeClass('ui-state-active');
		$(this).addClass('ui-state-hover');
	});	
	$('.button').mouseleave(function(){
		$(this).removeClass('ui-state-hover');
		$(this).addClass('ui-state-active');
	});
	var selectedTheme = getCookie('ViVizTheme');
	if(selectedTheme!=null)
	{
		$("#jQuery-style").attr("href",selectedTheme);
		$("#skin").val(selectedTheme);
	}


});