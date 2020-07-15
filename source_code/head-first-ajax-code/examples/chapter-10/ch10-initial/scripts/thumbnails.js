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
  // Version for XML server-side script
  var url= "getDetailsXML-updated.php?ImageID=" + escape(itemName);
  request.open("GET", url, true);
  request.onreadystatechange = displayDetails;
  request.send(null);
}

function displayDetails() {
  if (request.readyState == 4) {
    if (request.status == 200) {
      var detailDiv = document.getElementById("description");

      // Remove existing item details (if any)
      for (var i=detailDiv.childNodes.length; i>0; i--) {
        detailDiv.removeChild(detailDiv.childNodes[i-1]);
      }

      // Add new item details
      var responseDoc = request.responseXML;
      var categories = responseDoc.getElementsByTagName("category");
      for (var i=0; i<categories.length; i++) {
        var category = categories[i];
        var nameElement = category.getElementsByTagName("name")[0];
        var categoryName = nameElement.firstChild.nodeValue;
        var categoryType = category.getAttribute("type");
        if ((categoryType == null) || (categoryType != "list")) {
          var valueElement = category.getElementsByTagName("value")[0];
          var categoryValue = valueElement.firstChild.nodeValue;
          var p = document.createElement("p");
          var text = document.createTextNode(
            categoryName + ": " + categoryValue);
          p.appendChild(text);
          detailDiv.appendChild(p);
        } else {
          var p = document.createElement("p");
          p.appendChild(document.createTextNode(categoryName));
          var list = document.createElement("ul");
          var values = category.getElementsByTagName("value");
          for (var j=0; j<values.length; j++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(
                                  values[j].firstChild.nodeValue));
            list.appendChild(li);
          }
          detailDiv.appendChild(p);
          detailDiv.appendChild(list);
        }
      }
    }  
  }
}
