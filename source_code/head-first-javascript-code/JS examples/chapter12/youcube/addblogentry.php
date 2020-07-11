<?php
$filename = "blog.xml";

if (file_exists($filename)) {
  // Load the blog entries from the XML file
  $rawBlog = file_get_contents($filename);
}
else {
  // Create an empty XML document
  $rawBlog = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
  $rawBlog .= "<blog><title>YouCube - The Blog for Cube Puzzlers</title>";
  $rawBlog .= "<author>Puzzler Ruby</author><entries></entries></blog>";
}
$xml = new SimpleXmlElement($rawBlog);

// Add the new blog entry as a child node
$entry = $xml->entries->addChild("entry");
$entry->addChild("date", $_REQUEST["date"]);
$entry->addChild("body", stripslashes($_REQUEST["body"]));
if ($_REQUEST["image"] != "")
  $entry->addChild("image", $_REQUEST["image"]);

// Write the entire blog to the file
$file = fopen($filename, 'w');
fwrite($file, $xml->asXML());
fclose($file);
?>
