//Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-80245196-1', 'auto');
ga('send', 'pageview');


//normal code
var icon = document.getElementById("nav-menu");

// Toggle the "menu-open" class
function toggle() {
	  var nav = document.getElementById("nav");
	  var button = document.getElementById("menu");
	  var site = document.getElementById("wrap");
	  
	  if (nav.className == "menu-open") {
	  	  nav.className = "";
	  	  button.className = "";
	  	  site.className = "";
	  } else {
	  	  nav.className += "menu-open";
	  	  button.className += "btn-close";
	  	  site.className += "fixed";
	    }
	}

// Ensures backward compatibility with IE old versions
function menuClick() {
	if (document.addEventListener) {
		icon.addEventListener('click', toggle);
	} else if (document.attachEvent) {
		icon.attachEvent('onclick', toggle);
	}
}

menuClick();
