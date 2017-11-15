$(document).ready(function () {
  $('.new-tweet form').submit (function () {
    event.preventDefault();
    let tweetText = $(this).serialize();
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: tweetText,
      success: console.log('ok')
    })
  })
});