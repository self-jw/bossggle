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

  // Submit the letter field.
  $('#submit').on('click', function () {
    // $('#chosen-words').html(logHTML);
    document.getElementById('chosen-words').innerHTML += '<br>' + logHTML;
    logHTML = '';
  });

});
