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
  // Version for CSV server-side script
  var url= "getDetailsCSV.php?ImageID=" + escape(itemName);
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
      var response = request.responseText;
      var itemDetails = response.split(",");
      var descriptionP = document.createElement("p");
      descriptionP.appendChild(
        document.createTextNode("Description: " + itemDetails[1]));
      detailDiv.appendChild(descriptionP);
      var priceP = document.createElement("p");
      priceP.appendChild(
        document.createTextNode("Price: $" + itemDetails[2]));
      detailDiv.appendChild(priceP);
      var list = document.createElement("ul");
      for (var i=3; i<itemDetails.length; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", itemDetails[i]);
        a.appendChild(document.createTextNode(itemDetails[i]));
        li.appendChild(a);
        list.appendChild(li);
      }
      detailDiv.appendChild(list);
    }  
  }
}
