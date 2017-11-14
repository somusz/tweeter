$(document).ready( function () {

  $('#new-tweet-input').on('input', function (){
    let count = $(this).val().length;
    let counter140 = $(this).parent().find('.counter')[0];
    counter140.innerText = 140 - count;
    if (count > 140) {
      $('.new-tweet span').css('color','red');
    } else {
      $('.new-tweet span').css('color','');
    }

  })

})