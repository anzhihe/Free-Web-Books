/* manager.js */

window.onload = function() {
	if (Worker == "undefined") {
		document.getElementById("output").innerHTML = "Bummer, no Web Workers";
	}
	else {
		var worker = new Worker("worker.js");

		worker.postMessage("ping");

		worker.onmessage = function(event) {
			var message = "Worker " + " says " + event.data;
			document.getElementById("output").innerHTML = message;
		}
		worker.onerror = function(error) {
			document.getElementById("output").innerHTML =
				"There was an error in " + error.filename + 
				" at line number " + error.lineno +
				": " + error.message;
		};
	}
}

/*
// exercise 1
window.onload = function() {
	var worker = new Worker("worker.js");
	worker.onmessage = function(event) {
		alert("Worker says " + event.data);
	}
	for (var i = 0; i < 5; i++) {
		worker.postMessage("ping");
	}
}

// exercise 2
window.onload = function() {
	var worker = new Worker("worker.js");
	worker.onmessage = function(event) {
		alert("Worker says " + event.data);
	}

	for (var i = 5; i > 0; i--) {
		worker.postMessage("pong");
	}
}

// exercise 3
// Careful with this one! 
window.onload = function() {
	var worker = new Worker("worker.js");
	worker.onmessage = function(event) {
		alert("Worker says " + event.data);
		worker.postMessage("ping");
	}
	worker.postMessage("ping");
}

// exercise 4
// Be a little careful with this one
window.onload = function() {
	var worker = new Worker("worker.js");
	worker.onmessage = function(event) {
		alert("Worker says " + event.data);
	}

	setInterval(pinger, 1000);
	
	function pinger() {
		worker.postMessage("ping");
	}
}
// exercise... bonus!
window.onload = function() {
	var numWorkers = 3;
	var workers = [];
	for (var i = 0; i < numWorkers; i++) {
		var worker = new Worker("worker.js");
		worker.onmessage = function(event) {
			alert(event.target + " says " + event.data);
		};
		workers.push(worker);
	}
	for (var i = 0; i < workers.length; i++) {
		workers[i].postMessage("ping");
	}
}

*/

