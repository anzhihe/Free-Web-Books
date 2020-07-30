/* addremove.js
 * 
 * 
 */


window.onload = init;

function init() {
	var addButton = document.getElementById("addButton");
	addButton.onclick = addItem;
	var removeButton = document.getElementById("removeButton");
	removeButton.onclick = removeItem;
	var clearButton = document.getElementById("clearButton");
	clearButton.onclick = clearItems;

	for (key in localStorage) {
		addItemToDOM(key, localStorage[key]);
	}	

	// add event to watch for changes to localStorage in other
	// windows open to the same origin.
	// WATCH IT: Doesn't work in IE8 or below. Added to IE9.
	window.addEventListener("storage", "storageChanged", false);
}

function addItem(e) {
	var key = document.getElementById("key").value;
	var value = document.getElementById("value").value;

	localStorage.setItem(key, value);

	addItemToDOM(key, value);
}

function removeItem(e) {
	var key = document.getElementById("key").value;
	var value = document.getElementById("value").value;
	localStorage.removeItem(key);
	removeItemFromDOM(key);
}

function addItemToDOM(key, value) {
	var items = document.getElementById("items");

	var item = document.createElement("li");
	// set the id attribute to the key so we can find it using
	// the ids stored in the notes array
	item.setAttribute("id", key);

	var span = document.createElement("span");
	span.setAttribute("class", "note");

	// use the noteObj value as the text for the note
	//var textNode = document.createTextNode(key + ": " + value);
	span.innerHTML = key + ": " + value;

	// add everything to the DOM
	//span.appendChild(textNode);
	item.appendChild(span);
	items.appendChild(item);
}

// Add this function when you're ready to show delete
function removeItemFromDOM(key) {
	var item = document.getElementById(key);
	item.parentNode.removeChild(item);
}

// To insert at the *beginning* of the list:
//stickyList.insertBefore(newSticky, stickyList.firstChild);


function clearItems() {
	localStorage.clear();
	var itemsList = document.getElementById("items");
	var items = itemsList.childNodes;
	for (var i = items.length-1; i >= 0; i--) {
		itemsList.removeChild(items[i]);
	}

}

function storageChanged(e) {
	console.log("Event: key is " + e.key);
	console.log("Event: value is " + e.value);
}

