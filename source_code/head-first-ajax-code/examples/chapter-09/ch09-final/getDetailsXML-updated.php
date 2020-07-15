<?php

$details = array (
        'itemGuitar'    =>      
"<?xml version=\"1.0\"?>
<item id=\"itemGuitar\">
	<category>
		<name>Manufacturer</name>
		<value>Gibson</value>
	</category>
	<category>
		<name>Model</name>
		<value>Les Paul Standard</value>
	</category>
	<category>
		<name>Description</name>
		<value>Pete Townshend once played this guitar while his own axe was in the shop having bits of drumkit removed from it.</value>
	</category>
	<category>
		<name>Price</name>
		<value>5695.99</value>
	</category>
  <category type=\"list\">
    <name>URLs</name>
    <value>http://www.thewho.com/</value>
    <value>http://en.wikipedia.org/wiki/Pete_Townshend</value>
  </category>
</item>",
        'itemShades'    =>      
"<?xml version=\"1.0\"?>
<item id=\"itemGuitar\">
        <category>
                <name>Description</name>
                <value>Yoko Ono's sunglasses. While perhaps not valued much by Beatles fans this pair is rumored to have been licked by John Lennon.</value>
        </category>
        <category>
                <name>Color</name>
                <value>Black</value>
        </category>
        <category>
                <name>Price</name>
                <value>258.99</value>
        </category>
  <category type=\"list\">
    <name>Worn By</name>
    <value>John Lennon</value>
    <value>Ringo Starr</value>
    <value>Yoko Ono</value>
  </category>
  <category type=\"list\">
    <name>URLs</name>
    <value>http://www.beatles.com/</value>
    <value>http://johnlennon.com/</value>
    <value>http://www.yoko-ono.com/</value>
  </category>
</item>",
        'itemCowbell'   =>      
"<?xml version=\"1.0\"?>
<item id=\"itemCowbell\">
        <category>
                <name>Description</name>
<value>Remember the famous \"more cowbell\" skit from Saturday Night Live? Well, this is the actual cowbell.</value>
        </category>
        <category>
                <name>Price</name>
                <value>299.99</value>
        </category>
  <category type=\"list\">
    <name>URLs</name>
    <value>http://www.nbc.com/Saturday_Night_Live/</value>
    <value>http://en.wikipedia.org/wiki/More_cowbell</value>
  </category>
</item>",
        'itemHat'               =>     
"<?xml version=\"1.0\"?>
<item id=\"itemHat\">
 <category>
   <name>Description</name>
   <value>Michael Jackson's hat as worn in the \"Billie Jean\" video. Not really rock memorabilia but it smells better than Slash's tophat.</value>
 </category>
 <category>
  <name>Price</name>
  <value>1699.99</value>
 </category>
 <category>
  <name>Size</name>
  <value>6 1/4\"</value>
 </category>

  <category type=\"list\">
    <name>URLs</name>
    <value>http://www.michaeljackson.com/</value>
    <value>http://music.yahoo.com/vid-2143030--Billie-Jean</value>
  </category>
</item>");

header("Content-Type: text/xml");
echo $details[$_REQUEST['ImageID']];

?>    
