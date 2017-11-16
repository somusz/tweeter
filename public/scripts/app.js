$(document).ready (function () {

  let escape = function (str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

  let msToDays = function (ms) {
    let date = new Date(ms);
    let now = new Date(Date.now());
    return now.getDay() - date.getDay();
  }

  let createTweetElement = function (tweet) {
    return $(
      `<article>
        <header>
          <img class="hovering" src=${tweet.user.avatars.small}>
          <span class="user-name hovering">${tweet.user.name}</span>
          <span class="handle hovering">${tweet.user.handle}</span>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
          <span>Posted ${msToDays(tweet.created_at)} days ago</span>
          <span class="links">
            <a href="><i class="fa fa-flag" aria-hidden="true"></i></a>
            <a href="><i class="fa fa-retweet" aria-hidden="true"></i></a>
            <a href="><i class="fa fa-heart" aria-hidden="true"></i></a>
          </span>
        </footer>
      </article>`);
  }

  let renderTweets = function (tweets) {
    tweets.forEach( function (tweet) {
      let toAdd = createTweetElement(tweet);
      $('#tweet-container').prepend(toAdd);
    });
  }

  let loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {
        renderTweets(data);
      }
    });
  }

  loadTweets();

  $('.new-tweet form').submit (function () {
    event.preventDefault();

    let tweetData = $(this).serialize();
    let tweetText = $(this).children('textarea').val();

    if (!tweetText) {
      $('.new-tweet').append(`<div id="error-nomsg">Hum louder!</div>`);

      setTimeout( function() {
        $('#error-nomsg').remove();
      }, 3000);
    }

    else if (tweetText.length > 140) {
      $('.new-tweet').append(`<div id="error-over140">Cut it out, you're over 140!</div>`);

      setTimeout( function() {
        $('#error-over140').remove();
      }, 3000);
    }

    else {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: tweetData
      });

      loadTweets();

      $('#new-tweet-input').val('');
    }
  })

  $('#compose-button').click(function () {
    $('.new-tweet').slideToggle('fast');
    $('.new-tweet textarea').focus();
  })


  // let createTweetElement = function (tweet) {
  //   let $tweet = $('<article>').addClass('tweet');
  //   let $header = $('<header>').append('<img>').addClass('hovering').append('<span>').addClass('user-name hovering').append('<span>').addClass('handle hovering');
  //   let $para = $('<p>');
  //   let $spanLinks = $('span').addClass('links').
  //   let $footer = $('<footer>').append().addClass
  //   $tweet.append($('<footer>'));
  //   // $tweet.append($header);
  //   // $article.html(tweet);
  //   console.log($header);
  //   return $tweet;
  // }



})