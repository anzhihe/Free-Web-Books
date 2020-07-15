window.onload = initPage;

function initPage() {  // find the thumbnails on the page  thumbs = document.getElementById("thumbnailPane").getElementsByTagName("img");  // set the handler for each image  for (var i = 0; i < thumbs.length; i++) {
    image = thumbs[i];
    
    // create the onclick function
    image.onclick = function() {
      // find the image name
      detailURL = 'images/' + this.title + '-detail.jpg';
      document.getElementById("itemDetail").src = detailURL;
      getDetails(this.title);
    }  }}

function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  }
  return request;
}function getDetails(itemName) {  request = createRequest();  if (request == null) {    alert("Unable to create request");    return;  }  var url= "getDetails.php?ImageID=" + escape(itemName);  request.open("GET", url, true);  request.onreadystatechange = displayDetails;  request.send(null);}
function displayDetails() {  if (request.readyState == 4) {    if (request.status == 200) {      detailDiv = document.getElementById("description");      detailDiv.innerHTML = request.responseText;    }  }}