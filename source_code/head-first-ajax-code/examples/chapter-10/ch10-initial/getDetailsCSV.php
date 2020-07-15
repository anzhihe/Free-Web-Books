<?php

$details = array (
	'itemGuitar'	=>	"itemGuitar,Pete Townshend once played this guitar while his own axe was in the shop having bits of drumkit removed from it.,5695.99,http://www.thewho.com/,http://en.wikipedia.org/wiki/Pete_Townshend",
	'itemShades'	=>	"itemShades,Yoko Ono's sunglasses. While perhaps not valued much by Beatles fans this pair is rumored to have been licked by John Lennon.,258.99,http://www.beatles.com/,http://johnlennon.com/,http://www.yoko-ono.com/",
	'itemCowbell'	=>	"itemCowbell,Remember the famous \"more cowbell\" skit from Saturday Night Live? Well this is the actual cowbell.,299.99,http://www.nbc.com/Saturday_Night_Live/,http://en.wikipedia.org/wiki/More_cowbell",
	'itemHat'		=>	"itemHat,Michael Jackson's hat as worn in the \"Billie Jean\" video. Not really rock memorabilia but it smells better than Slash's tophat.,1699.99,http://www.michaeljackson.com/,http://music.yahoo.com/vid-2143030--Billie-Jean"
);

echo $details[$_REQUEST['ImageID']];

?>
