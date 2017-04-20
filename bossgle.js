
$(document).ready(function () {

  var logHTML = '';
  var totalScore = 0;
  var totalWords = 0;
  var wordHash = {};

  // Set initial random letters.
  randomLetters();

  // The 16 boxes are in the list section.
  // TODO: Don't restrict to particular section.
  $('li').click(function () {

    var idElement = document.getElementById(this.id);
    var content = idElement.innerHTML;

    idElement.style.backgroundColor = 'red';

    logHTML += content;
    $('#letters').html(logHTML);
  });

  // Clear the letter field.
  $('#clear').on('click', function () {
    $('#letters').html('');
    logHTML = '';
  });

  // Submit the letter field and add to word list.
  $('#submit').on('click', function () {
    if (logHTML.length > 0) {
      if (!(logHTML in wordHash)) {
        document.getElementById('chosen-words').innerHTML += logHTML + '<br>';

        var oneWordScore = checkWord(logHTML);
        document.getElementById('word-score').innerHTML += oneWordScore + '<br>';
        totalScore += oneWordScore;

        document.getElementById('score-tally').innerHTML = totalScore;

        // Add key/value to word hash.
        wordHash[logHTML] = oneWordScore;

        // console.log('Word in Dic : ' + logHTML + '  Score in Dic: ' + wordHash[logHTML]);

        // Rest the box colors.
        resetBoxColor();
      }
    }

    // Clear the log html string. Always at the end!
    logHTML = '';
  });

  // Reset board.
  $('#reset').on('click', function () {
    $('#word-score').html('');
    $('#chosen-words').html('');
    $('#letters').html('Selected Letters');
    $('#score-tally').html('');
    totalScore = 0;
    wordHash = {};
    resetBoxColor();
    randomLetters();
  });

});

function checkWord(word) {

  var wordScore = 0;
  var wordCase;

  // The 1000 word dictionary is in lowere case except 'I'.
  // Cover this condition.
  if (word !== 'I') {
    wordCase = word.toLowerCase();
  } else {
    wordCase = word;
  }

  if (isBasicWord(wordCase)) {
    wordScore = 9 * (word.length);
  }

  return wordScore;
}

function randomLetters() {

  var num;
  var char;

  for (var i = 1; i < 17; i++) {
    // Random letter ascii code between 65 and 90 (A-Z).
    // Max (excluded) = 91, Min (included) = 65.
    num = Math.floor(Math.random() * (91 - 65)) + 65;

    // Convert ascii number to character.
    char = String.fromCharCode(num);

    // Change box to new character.
    var boxID = 'box' + i;
    document.getElementById(boxID).innerHTML = char;
    var idElement = document.getElementById(boxID);
  }

}

// Reset the 16 boxes to original color.
function resetBoxColor() {
  for (var i = 1; i < 17; i++) {
    var boxID = 'box' + i;
    var idElement = document.getElementById(boxID);

    // TODO: Color to global variable.
    idElement.style.backgroundColor = '#69b390';
  }
}
