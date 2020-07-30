/* notetoself.js
 *
 * This version uses the array and allows delete of the sticky note
 * Also includes a Clear all notes button that clears out everything
 * in local storage, removes sticky notes from the DOM and resets the 
 * stickies array to []
 */

window.onload = init;

function init() {
	var button = document.getElementById("add_button");
	button.onclick = createSticky;
/*
	var clearButton = document.getElementById("clear_button");
	clearButton.onclick = clearStickyNotes;
*/

	var stickiesArray = localStorage["stickiesArray"];
	if (!stickiesArray) {
		stickiesArray = [];
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	}
	else {
		stickiesArray = JSON.parse(stickiesArray);
	}

	// replace with
	// var stickiesAray = getStickiesArray();
	
	for (var i = 0; i < stickiesArray.length; i++) {
		var key = stickiesArray[i];
		var value = localStorage[key];
		addStickyToDOM(key, value);
	}	
}

function getStickiesArray() {
	var stickiesArray = localStorage.getItem("stickiesArray");
	if (!stickiesArray) {
		stickiesArray = [];
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	} else {
		stickiesArray = JSON.parse(stickiesArray);
	}
	return stickiesArray;
}

function createSticky() {
	var stickiesArray = getStickiesArray();
	var currentDate = new Date();
	var key = "sticky_" + currentDate.getTime();
	var value = document.getElementById("note_text").value;

	localStorage.setItem(key, value);
	stickiesArray.push(key);
	localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	
	addStickyToDOM(key, value);
}

function deleteSticky(e) {
	var key = e.target.id;
	if (e.target.tagName.toLowerCase() == "span") {
		key = e.target.parentNode.id;
	}
	localStorage.removeItem(key);
	var stickiesArray = getStickiesArray();
	if (stickiesArray) {
		for (var i = 0; i < stickiesArray.length; i++) {
			if (key == stickiesArray[i]) {
				stickiesArray.splice(i,1);
			}
		}
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
		removeStickyFromDOM(key);
	}
}


function addStickyToDOM(key, value) {
	var stickies = document.getElementById("stickies");
	var sticky = document.createElement("li");
	sticky.setAttribute("id", key);
	var span = document.createElement("span");
	span.setAttribute("class", "sticky");
	span.innerHTML = value;
	sticky.appendChild(span);
	stickies.appendChild(sticky);

	sticky.onclick = deleteSticky;
}

function removeStickyFromDOM(key) {
	var sticky = document.getElementById(key);
	sticky.parentNode.removeChild(sticky);
}


function clearStickyNotes() {
	localStorage.clear();
	var stickyList = document.getElementById("stickies");
	var stickies = stickyList.childNodes;
	for (var i = stickies.length-1; i >= 0; i--) {
		stickyList.removeChild(stickies[i]);
	}

	// reset notes array
	var stickiesArray = getStickiesArray();
}

