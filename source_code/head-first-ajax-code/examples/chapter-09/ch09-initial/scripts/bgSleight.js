if (navigator.platform == "Win32" && navigator.appName == "Microsoft Internet Explorer" && window.attachEvent) {
	window.attachEvent("onload", alphaBackgrounds);
}

function alphaBackgrounds(){
	var rslt = navigator.appVersion.match(/MSIE (\d+\.\d+)/, '');
	var itsAllGood = (rslt != null && Number(rslt[1]) >= 5.5);
	for (i=0; i<document.all.length; i++){
		var bg = document.all[i].currentStyle.backgroundImage;
		if (itsAllGood && bg){
			if (bg.match(/-trans\.png/i) != null){
				var mypng = bg.substring(5,bg.length-2);
				document.all[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+mypng+"', sizingMethod='scale')";
				document.all[i].style.backgroundImage = "url('/images/x.gif')";
			}
		}
	}
}