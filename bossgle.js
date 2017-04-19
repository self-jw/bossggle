
$(document).ready(function () {

  var logHTML = '';
  var totalScore = 0;
  var totalWords = 0;
  var wordHash = {};

  // Set initial random letters.
  randomLetters();

  // The 16 boxes are in the list section.
  // TODO: Don't restrict to section.
  $('li').click(function () {

    var idElement = document.getElementById(this.id);
    var content = idElement.innerHTML;

    // console.log(content);

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
      console.log('Before If -- Word in Dic : ' + logHTML + '  Score in Dic: ' + wordHash[logHTML]);
      console.log(Object.keys(wordHash));
      if (!(logHTML in wordHash)) {
        document.getElementById('chosen-words').innerHTML += '<br>' + logHTML;

        // console.log(logHTML.toLowerCase());

        var oneWordScore = checkWord(logHTML);
        document.getElementById('word-score').innerHTML += '<br>' + oneWordScore;
        totalScore += oneWordScore;

        document.getElementById('score-tally').innerHTML = totalScore;

        // console.log(totalScore);

        // Add key/value to word hash.
        wordHash[logHTML] = oneWordScore;
        console.log('Word in Dic : ' + logHTML + '  Score in Dic: ' + wordHash[logHTML]);
      }
    }

    // Clear the log html string. Always at the end!
    logHTML = '';
  });

  // Reset board.
  $('#reset').on('click', function () {
    $('#word-score').html('');
    $('#chosen-words').html('');
    $('#letters').html('');
    $('#score-tally').html('');
    totalScore = 0;
    wordHash = {};
    randomLetters();
  });

});

function checkWord(word) {

  var wordScore = 0;

  // console.log('In Word Function : ' + word.toLowerCase());

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

    // console.log('Word : ' + wordCase + ' Score : ' + wordScore);
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
  }

}
