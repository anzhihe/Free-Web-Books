window.onload = initPage;

function initPage() {
  // find the thumbnails on the page
  var thumbs = 
    document.getElementById("thumbnailPane").getElementsByTagName("img");

  // set the handler for each image
  for (var i = 0; i < thumbs.length; i++) {
    var image = thumbs[i];
    
    // create the onclick function
    image.onclick = function() {
      // find the image name
      var detailURL = 'images/' + this.title + '-detail.jpg';
      document.getElementById("itemDetail").src = detailURL;
      getDetails(this.title);
    }
  }
}

function getDetails(itemName) {
  request = createRequest();
  if (request == null) {
    alert("Unable to create request");
    return;
  }
  // Version for JSON server-side script
  var url= "getDetailsJSON.php?ImageID=" + escape(itemName);
  request.open("GET", url, true);
  request.onreadystatechange = displayDetails;
  request.send(null);
}

function displayDetails() {
  if (request.readyState == 4) {
    if (request.status == 200) {
      var detailDiv = document.getElementById("description");

      var itemDetails = eval('(' + request.responseText + ')');
      // Remove existing item details (if any)
      for (var i=detailDiv.childNodes.length; i>0; i--) {
        detailDiv.removeChild(detailDiv.childNodes[i-1]);
      }

      // Add new item details
      for (var property in itemDetails) {
        var propertyValue = itemDetails[property];
        if (!isArray(propertyValue)) {
          var p = document.createElement("p");
          p.appendChild(
               document.createTextNode(property + ": " + propertyValue));
          detailDiv.appendChild(p);
        } else {
          var p = document.createElement("p");
          p.appendChild(document.createTextNode(property + ":"));
          var list = document.createElement("ul");
          for (var i=0; i<propertyValue.length; i++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(propertyValue[i]));
            list.appendChild(li);
          }
          detailDiv.appendChild(p);
          detailDiv.appendChild(list);
        }
      }
    }  
  }
}

function isArray(arg) {
  if (typeof arg == 'object') {
    var criteria = arg.constructor.toString().match(/array/i);
    return (criteria != null);
  }
  return false;
}
