$(document).ready(function () {

  var logHTML = '';
  var totalScore = 0;
  var totalWords = 0;

  // Set initial random letters.
  randomLetters();

  // The 16 boxes are in a list.
  $('li').click(function () {

    var idElement = document.getElementById(this.id);
    var content = idElement.innerHTML;
    console.log(content);

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
      document.getElementById('chosen-words').innerHTML += '<br>' + logHTML;
      logHTML = '';
    }
  });

  // Reset board.
  $('#reset').on('click', function () {
    randomLetters();
  });

});

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
