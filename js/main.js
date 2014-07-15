// TODO: $.gallery({"showdropdowns":true,"showfilmstrip":true,"showattributes":true,"showconfiguration":true,"showprint",true,"showgrid",true,"showabout":true,"compact","false"]})
// TODO:
//       If vector image, use imgconvert.org.
//       If raster image and thumbs not available, use imgconvert.org.
// TODO: thumbWidth and fullWidth are ignored.

VIVIZ = {
			"CATALOGXML":"xml/enlil.xml",
			"defaultmode":"gallery",
			"showThumbstrip":true,
			"showFileName":true,
			"showCatalog":true,
			"showControls":true,
			"showAttributes":true,
			"showDropdowns":true,
			"lazyLoadMax":10,
			"useCachedImages":false
		};

// http://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};

function enlil() {

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		console.log("Mobile Device Detected.")
		var enlildiv = "enlilmobile";
	} else {
		var enlildiv = "#enlil";
	}
	
	//$("#gallerystyle").attr('href',"")
	
	var enlildiv = "#enlilmobile";
	var si;
	$(enlildiv + ' #ss_stop').click(
			function () {
				clearInterval(si);
			}
	)
	$(enlildiv + ' #ss_start').click(
			function () {
				$("#next").click();
				si = setInterval(
						function () {
							$("#next").click();
						},'200');
			}
	)
	$(enlildiv + ' #ss_next').click(function () {$("#next").click();})
	$(enlildiv + ' #ss_prev').click(function () {$("#previous").click();})

	$(window).hashchange(function() {
			if (location.hash.match(/\/IPSBD-ENLIL\//)) {
			$("#shock").hide();
		} else {
			$("#shock").show();
		}
	});
	
	//$('#g-container').hide();
	//$("#enlil").show()
	$(enlildiv).show()
	$(enlildiv + ' td.input a').on("click",function () {	$(enlildiv + " td.input").attr('bgcolor','#4488cc');$(this).parent().attr("bgcolor","#224488");});
	$(enlildiv + ' td.output a').on("click",function () {	$(enlildiv + " td.output").attr('bgcolor','#4488cc');$(this).parent().attr("bgcolor","#224488");});

	$(enlildiv + ' td.output a').on("click",xupdatehash);
	$(enlildiv + ' td.output a').css('cursor','pointer')
	$(enlildiv + ' select').css('font-size','12pt');
}

	function getdownload() {
		var aa = $( "#dl_select option:selected" ).text();
		if(aa == "File List"){ window.location = "_blank"; }
		if(aa == "Animated GIF"){ window.location = "http://aurora.mesa.gmu.edu/cgi-bin/imgconvert.cgi?base=http://spaceweather.gmu.edu/projects/enlil/ipsbd/tim1evo4vel2b/&in=0240.gif,0249.gif&height=200&out=gif"; }
		if(aa == "MP4"){ window.location = "_blank"; }
		if(aa == "MOV"){ window.location = "http://aurora.mesa.gmu.edu/cgi-bin/imgconvert.cgi?base=http://spaceweather.gmu.edu/projects/enlil/ipsbd/tim1evo4vel2b/&in=0240.gif,0249.gif&height=200&out=gif"; }
		if(aa == "Zip File"){ window.location = "http://aurora.mesa.gmu.edu/cgi-bin/imgconvert.cgi?base=http://spaceweather.gmu.edu/projects/enlil/ipsbd/tim1evo4vel2b/&in=0240.gif,0249.gif&height=200&out=zip"; }
	}

	function yupdatehash() {
		var output = $(this).children('font').attr('id');
		console.log($(this).attr('href'))
	}
	function xupdatehash() {

		var output = $(this).children('font').attr('id');
		var title = $(this).children('font').attr('id');
		var myoutput = $('#sitetitle').text().split('Solar Wind Prediction');

		if(title.indexOf('/') === -1){ //NOT A MATCH ITS A MODEL
			$('#sitetitle').text(title + ' \u2013 ' + 'Solar Wind Prediction' + myoutput[1]);
		}
		else { //ITS A MATCH ITS A VARIABLE
			var newtitle = title.split('/');
			$('#sitetitle').text(myoutput[0] + 'Solar Wind Prediction' + ' \u2013 ' + newtitle[0] + ' ' + newtitle[1]);
		}

		location.hash = '/' + location.hash.split('/')[1] + '/' + output;
	}
		


$(document).ready(function(){

	// Code here executed when DOM is loaded and ready for manipulation.
	$("#thumbbrowsebutton").click(function () {
		$('#g-container').hide();
		$('#t-container').show();
		thumb("#thumb1");
	})
	
	$("#gallerybrowsebutton").click(function () {
		$('#t-container').hide();
		$('#g-container').show();
		gallery("#gallery1");
	})

	if (VIVIZ["defaultmode"] == "gallery") {
		$("#gallerybrowsebutton").click();
	} else {
		$("#thumbbrowsebutton").click();
	}

	enlil();

});