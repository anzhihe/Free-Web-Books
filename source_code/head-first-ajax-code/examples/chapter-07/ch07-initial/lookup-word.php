<?php

$word = $_REQUEST['word'];

// Check dictionary to see if this is a real word
$dictionaryResponse = 
  file_get_contents(
    "http://www.headfirstlabs.com/books/hfajax/ch07/dictionary.php?word=" . 
          $word);
if ($dictionaryResponse == "-1") {
  echo "-1";
  return;
}

$vowels = array('a', 'e', 'i', 'o', 'u');

$score = 0;
for ($i=0; $i<strlen($word); $i++) {
  if (in_array($word[$i], $vowels))
    $score += 1;
  else
    $score += 2;
}

echo $score;

?>
