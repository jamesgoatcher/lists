var detectUserAgent = function () {
	var regex = /(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:|\bEdge\/)(\d+)/;
	var ua = navigator.userAgent;
  	if (ua.match(regex) != null && ua.match(regex).length > 0)
  		return true;
  	else
  		return false;
};

var detectBrowser = function () {
	if (ie_lte9 == true || detectUserAgent() == true) {
		var iePage = document.createElement('div');
		var body   = document.querySelector('body');
		body.style.overflow = 'hidden';
		body.style.backgroundColor = '#000';
		iePage.style.position = 'fixed';
		iePage.style.backgroundColor = '#000';
		iePage.style.width  = '100%';
		iePage.style.height = '100%';
		iePage.style.top    = '0';
		iePage.style.left   = '0';
		iePage.style.textAlign = 'center';
		iePage.style.color  = '#fff';
		iePage.innerHTML =  '<p>This page doesn\'t support Edge and Internet Explorer browsers.  Consider downloading a different browser here:</p>' +
							'<a href="https://www.google.com/chrome/" style="color: #aaa; cursor: pointer;" target="_blank">Google Chrome</a><br>' + 
							'<a href="https://www.mozilla.org/en-US/firefox/products/" style="color: #aaa; cursor: pointer;" target="_blank">Mozilla Firefox</a>';
		document.body.appendChild(iePage);
		throw 'Invalid browser.';
	}
};

detectBrowser();