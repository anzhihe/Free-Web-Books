<?php

$details = array (
	'itemGuitar'	=>	"<p>Pete Townshend once played this guitar while his own axe was in the shop having bits of drumkit removed from it.</p>",
	'itemShades'	=>	"<p>Yoko Ono's sunglasses. While perhaps not valued much by Beatles fans, this pair is rumored to have been licked by John Lennon.</p>",
	'itemCowbell'	=>	"<p>Remember the famous \"more cowbell\" skit from Saturday Night Live? Well, this is the actual cowbell.</p>",
	'itemHat'		=>	"<p>Michael Jackson's hat, as worn in the \"Billie Jean\" video. Not really rock memorabilia, but it smells better than Slash's tophat.</p>"
);

echo $details[$_REQUEST['ImageID']];

?>