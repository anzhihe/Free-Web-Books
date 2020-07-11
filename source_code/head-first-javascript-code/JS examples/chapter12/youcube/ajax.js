// AjaxRequest object constructor
function AjaxRequest() {
  // Try the XMLHttpRequest object first
  if (window.XMLHttpRequest) {
    try {
      this.request = new XMLHttpRequest();
    } catch(e) {
      this.request = null;
    }
  // Now try the ActiveX (IE) version
  } else if (window.ActiveXObject) {
    try {
      this.request = new ActiveXObject("Msxml2.XMLHTTP");
    // Try the older ActiveX object for older versions of IE
    } catch(e) {
      try {
        this.request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        this.request = null;
      }
    }
  }

  // If the request creation failed, notify the user
  if (this.request == null)
    alert("Ajax error creating the request.\n" + "Details: " + e);
}

// Send an Ajax request to the server
AjaxRequest.prototype.send = function(type, url, handler, postDataType, postData) {
  if (this.request != null) {
    // Kill the previous request
    this.request.abort();

    // Tack on a dummy parameter to override browser caching
    url += "?dummy=" + new Date().getTime();

    try {
      this.request.onreadystatechange = handler;
      this.request.open(type, url, true); // always asynchronous (true)
      if (type.toLowerCase() == "get") {
        // Send a GET request; no data involved
        this.request.send(null);
      } else {
        // Send a POST request; the last argument is data
        this.request.setRequestHeader("Content-Type", postDataType);
        this.request.send(postData);
      }
    } catch(e) {
      alert("Ajax error communicating with the server.\n" + "Details: " + e);
    }
  }
}

AjaxRequest.prototype.getReadyState = function() {
  return this.request.readyState;
}

AjaxRequest.prototype.getStatus = function() {
  return this.request.status;
}

AjaxRequest.prototype.getResponseText = function() {
  return this.request.responseText;
}

AjaxRequest.prototype.getResponseXML = function() {
  return this.request.responseXML;
}
