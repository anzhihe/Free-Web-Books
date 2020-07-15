<?php

require_once('JSON.php');
$json = new Services_JSON();

$itemGuitar = array(
  'id' => 'itemGuitar',
  'description' => 'Pete Townshend once played this guitar while his own axe was in the shop having bits of drumkit removed from it.',
  'price' => 5695.99,
  'urls' => array('http://www.thewho.com/',
                  'http://en.wikipedia.org/wiki/Pete_Townshend')
);

$itemShades = array(
  'id' => 'itemShades',
  'description' => 'Yoko Ono\'s sunglasses. While perhaps not valued much by Beatles fans, this pair is rumored to have been licked by John Lennon.',
  'price' => 258.99,
  'urls' => array('http://www.beatles.com/',
                  'http://johnlennon.com/',
                  'http://www.yoko-ono.com/')
);

$itemCowbell = array(
  'id' => 'itemCowbell',
  'description' => 'Remember the famous "more cowbell" skit from Saturday Night Live? Well, this is the actual cowbell.',
  'price' => 299.99,
  'urls' => array('http://www.nbc.com/Saturday_Night_Live/',
                  'http://en.wikipedia.org/wiki/More_cowbell')
);

$itemHat = array(
  'id' => 'itemHat',
  'description' => 'Michael Jackson\'s hat as worn in the "Bille Jean" video. Not really rock memorabilia, but it smells better than Slash\'s tophat.',
  'price' => 1699.99,
  'urls' => array('http://www.michaeljackson.com/',
                  'http://music.yahoo.com/vid-2143030--Billie-Jean')
);


$details = array (
  'itemGuitar'  => $itemGuitar,
  'itemShades'  => $itemShades,
  'itemCowbell' => $itemCowbell,
  'itemHat'     => $itemHat
);

$itemDetail = $details[$_REQUEST['ImageID']];
$output = $json->encode($itemDetail);
print($output);

?>    
