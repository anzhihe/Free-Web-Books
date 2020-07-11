function DebugConsole() {
  // Create the debug console area
  var consoleElem = document.createElement("div");
  consoleElem.id = "debug";
  consoleElem.style.fontFamily = "monospace";
  consoleElem.style.color = "#333333";
  document.body.appendChild(consoleElem);
  consoleElem.appendChild(document.createElement("hr"));

  // Create the alternating background color property
  this.shaded = false;
}

DebugConsole.prototype.displayMsg = function(msg) {
  // Create the message
  var msgElement = document.createElement("div");
  msgElement.appendChild(document.createTextNode(msg));
  msgElement.style.backgroundColor = this.shaded ? "#EEEEEE" : "#FFFFFF";
  var consoleElem = document.getElementById("debug");
  consoleElem.appendChild(msgElement);

  // Toggle the alternating background color property
  this.shaded = !this.shaded;
}
