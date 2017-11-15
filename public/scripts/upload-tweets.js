$(document).ready(function () {
  $('.new-tweet form').submit (function () {
    event.preventDefault();
    let tweetData = $(this).serialize();
    let tweetText = $(this).children('textarea').val();
    if (!tweetText) {
      $('.new-tweet').append(`<div id=\'error-nomsg\'>Hum louder!</div>`);
      setTimeout( function() {
        $('#error-nomsg').remove();
      }, 3000);
    } else if (tweetText.length > 140) {
      $('.new-tweet').append(`<div id=\'error-over140\'>Cut it out, you\'re over 140!</div>`);
      setTimeout( function() {
        $('#error-over140').remove();
      }, 3000);
    } else {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: tweetData,
        success: console.log('ok')
      })
    }
  })
});