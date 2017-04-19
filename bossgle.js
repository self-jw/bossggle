$(document).ready(function () {

  var logHTML = '';

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

});
