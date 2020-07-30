/* luckyornot.js */
/*
 * get the content of a JSON file using Ajax 
 *
 */

window.onload = init;

function init() {
	var button = document.getElementById("amilucky");
	button.onclick = getLuck;
}

function getLuck() {
	var url = "luckyornot.txt";
	var request = new XMLHttpRequest();
	request.onload = function() {
		if (request.status == 200) {
			displayLuck(request.responseText);
		}
	};
	request.open("GET", url);
	request.send(null);
}

function displayLuck(luck) {
	var p = document.getElementById("luck");
	p.innerHTML = luck;
}

