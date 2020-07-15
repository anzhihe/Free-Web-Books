<?php

$details = array (
        'itemGuitar'    =>      
"<?xml version=\"1.0\"?>
<item id=\"itemGuitar\">
 <description>Pete Townshend once played this guitar while his own axe was in the shop having bits of drumkit removed from it</description>
 <price>5695.99</price>
 <resources>
   <url>http://www.thewho.com/</url>
   <url>http://en.wikipedia.org/wiki/Pete_Townshend</url>
 </resources>
</item>",
        'itemShades'    =>      
"<?xml version=\"1.0\"?>
<item id=\"itemShades\">
 <description>Yoko Ono's sunglasses. While perhaps not valued much by Beatles fans this pair is rumored to have been licked by John Lennon.</description>
 <price>258.99</price>
 <resources>
   <url>http://www.beatles.com/</url>
   <url>http://johnlennon.com/</url>
   <url>http://www.yoko-ono.com/</url>
 </resources>
</item>",
        'itemCowbell'   =>      
"<?xml version=\"1.0\"?>
<item id=\"itemCowbell\">
 <description>Remember the famous \"more cowbell\" skit
    from Saturday Night Live? Well, this is the actual
    cowbell.</description>
 <price>299.99</price>
 <resources>
   <url>http://www.nbc.com/Saturday_Night_Live/</url>
   <url>http://en.wikipedia.org/wiki/More_cowbell</url>
 </resources>
</item>",
        'itemHat'               =>     
"<?xml version=\"1.0\"?>
<item id=\"itemHat\">
 <description>Michael Jackson's hat as worn in the \"Billie Jean\" video. Not really rock memorabilia but it smells better than Slash's tophat.
 </description>
 <price>1699.99</price>
 <resources>
   <url>http://www.michaeljackson.com/</url>
   <url>http://music.yahoo.com/vid-2143030--Billie-Jean</url>
 </resources>
</item>");

header("Content-Type: text/xml");
echo $details[$_REQUEST['ImageID']];

?>    
