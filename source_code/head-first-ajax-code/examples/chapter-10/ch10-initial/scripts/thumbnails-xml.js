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
  var url= "getDetailsXML.php?ImageID=" + escape(itemName);
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
      var description = responseDoc.getElementsByTagName("description")[0];
      var descriptionText = description.firstChild.nodeValue;
      var descriptionP = document.createElement("p");
      descriptionP.appendChild(
        document.createTextNode("Description: " + descriptionText));
      detailDiv.appendChild(descriptionP);
      var price = responseDoc.getElementsByTagName("price")[0];
      var priceText = price.firstChild.nodeValue;
      var priceP = document.createElement("p");
      priceP.appendChild(
        document.createTextNode("Price: $" + priceText));
      detailDiv.appendChild(priceP);
      var urlP = document.createElement("p");
      var list = document.createElement("ul");
      var urlElements = responseDoc.getElementsByTagName("url");
      for (var i=0; i<urlElements.length; i++) {
        var url = urlElements[i].firstChild.nodeValue;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.appendChild(document.createTextNode(url));
        li.appendChild(a);
        list.appendChild(li);
      }
      urlP.appendChild(list);
      detailDiv.appendChild(urlP);
    }  
  }
}
