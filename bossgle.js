
$(document).ready(function () {

    var lettersHTML = '';
    var totalScore = 0;
    var totalWords = 0;
    var wordHash = {};

    // Set initial random letters.
    randomLetters();

    if (timer() === 0) {
      console.log('Game Ended');
    }

    // The 16 boxes are in the list section.
    $('.aligner-item').click(function () {

      var idElement = document.getElementById(this.id);

      if (!idElement.disabled) {
        var content = idElement.innerHTML;

        idElement.style.backgroundColor = 'red';

        lettersHTML += content;
        $('#letters').html(lettersHTML);

        // Disable clicked button.
        idElement.disabled = true;
      }

    });

    // Clear the letter field.
    $('#clear').on('click', function () {
      resetBoxes();
      $('#letters').html('Selected Letters');
      lettersHTML = '';
    });

    // Submit the letter field and add to word list.
    $('#submit').on('click', function () {
      if (lettersHTML.length > 0) {
        if (!(lettersHTML in wordHash)) {
          // document.getElementById('chosen-words').innerHTML += lettersHTML + '<br>';

          // Check if word has at least three letters.
          // If so update word score and total score.
          var oneWordScore = 0;
          if (lettersHTML.length > 2) {
            oneWordScore = checkWord(lettersHTML);
            totalScore += oneWordScore;
          }

          document.getElementById('score-tally').innerHTML = totalScore;

          // Add key/value to word hash.
          wordHash[lettersHTML] = oneWordScore;

          // Convert hash to 2 arrays. One for keys and the other for values.
          var keys = Object.keys(wordHash);
          var values = keys.map(function (v) { return wordHash[v]; });

          // Clear words and scores before reversing them.
          document.getElementById('chosen-words').innerHTML = '';
          document.getElementById('word-score').innerHTML = '';

          // Reverse words and scores.
          for (var i = keys.length - 1; i >= 0; i--) {
            document.getElementById('chosen-words').innerHTML += keys[i] + '<br>';
            document.getElementById('word-score').innerHTML += values[i] + '<br>';
          }

          $('#letters').html('<br>');
          lettersHTML = '';

          // Reset the box colors.
          resetBoxes();
        }
      }

      // Clear the log html string. Always at the end!
      lettersHTML = '';
    });

    // Reset board.
    $('#reset').on('click', function () {
      $('#word-score').html('');
      $('#chosen-words').html('');
      $('#letters').html('Selected Letters');
      $('#score-tally').html('');
      lettersHTML = '';
      totalScore = 0;
      resetBoxes();
      randomLetters();
      wordHash = {};
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
// Enable the boxes.
function resetBoxes() {
  for (var i = 1; i < 17; i++) {
    var boxID = 'box' + i;
    var idElement = document.getElementById(boxID);

    // TODO: Color to global variable?
    idElement.style.backgroundColor = '#69b390';
    idElement.disabled = false;
  }
}

function timer() {
  var timeInterval = 9;
  setInterval(function () {
    document.getElementById('timer').innerHTML = timeInterval;
    if (timeInterval === 0) {
      // alert('Time Ran Out!');
      return timeInterval;
    }

    timeInterval--;
  }, 1000);
}

function logWords() {

}
