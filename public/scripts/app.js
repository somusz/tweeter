// app.js
// controling rendering page, new tweets, re-rendering, and events

//any action only on ready document
$(document).ready (() => {

//helper function to convert entries into safe text
  let escape = (str) => {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

//helper function to control time since the tweet was created
  let msToProperTime = (ms) => {
    let timeToPrint;
    let timeMeasure = '';
    let plural = '';
    let since = Date.now() - ms;
    let sinceInSec = Math.round(since/1000);
    let sinceInMin = Math.round(since/1000/60);
    let sinceInHrs = Math.round(since/1000/60/60);
    let sinceInDay = Math.round(since/1000/60/60/24);
    let sinceInMth = Math.round(since/1000/60/60/24/12);
    let sinceInYrs = Math.round(since/1000/60/60/24/365);

    if (sinceInYrs > 0) {
      timeToPrint = sinceInYrs;
      timeMeasure = 'year';
    }

    else if (sinceInMth > 0) {
      timeToPrint = sinceInMth;
      timeMeasure = 'month';
    }

    else if (sinceInDay > 0) {
      timeToPrint = sinceInDay;
      timeMeasure = 'day';
    }

    else if (sinceInHrs > 0) {
      timeToPrint = sinceInHrs;
      timeMeasure = 'hour';
    }

    else if (sinceInMin > 0) {
      timeToPrint = sinceInMin;
      timeMeasure = 'minute';
    }

    else {
      timeToPrint = sinceInSec;
      timeMeasure = 'second';
    };

    if (timeToPrint > 1) {
      plural = 's';
    };

    return `Posted ${timeToPrint} ${timeMeasure+plural} ago`;
  };

//helper function for templating new tweets
  let createTweetElement = (tweet) => {
    return $(
// icons wrapped in anchor for future feature additions
      `<article>
        <header>
          <img class="hovering" src=${tweet.user.avatars.small}>
          <span class="user-name hovering">${tweet.user.name}</span>
          <span class="handle hovering">${tweet.user.handle}</span>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
          <span>${msToProperTime(tweet.created_at)}</span>
          <span class="links">
            <a><i class="fa fa-flag" aria-hidden="true"></i></a>
            <a><i class="fa fa-retweet" aria-hidden="true"></i></a>
            <a><i class="fa fa-heart" aria-hidden="true"></i></a>
          </span>
        </footer>
      </article>`);
  };

//helper function for deleting, prepending and re-rendering tweets
  let renderTweets = (tweets) => {
    $('#tweet-container').empty();
    tweets.forEach( (tweet) => {
      $('#tweet-container').prepend(createTweetElement(tweet));
    });
  };

//helper function for loading page and reloading page upon tweet submission
  let loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (data) => {
        renderTweets(data);
      }
    });
  };

//calling page loading function
  loadTweets();

//events upon new tweet submission
  $('.new-tweet form').submit (function() {
//preventing html form submission event
    event.preventDefault();

//variables for entry data in two formats
    let tweetData = $(this).serialize();
    let tweetText = $(this).children('textarea').val();

//timed error message on attempt to submit blank tweet
    if (!tweetText) {
      $('.new-tweet').append(`<div id="error-nomsg">Hum louder!</div>`);

      setTimeout(() => {
        $('#error-nomsg').remove();
      }, 3000);
    }

//timed error message on attempt to submit oversized tweet
    else if (tweetText.length > 140) {
      $('.new-tweet').append(`<div id="error-over140">Cut it out, you're over 140!</div>`);

      setTimeout(() => {
        $('#error-over140').remove();
      }, 3000);
    }

//posting tweet upon valid entry
    else {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: tweetData,
        success: () => {

//clearing textarea and resetting counter upon successful post
          $('#new-tweet-input').val('');
          $(this).find('.counter').text('140');

//reloading element upon successful post
          loadTweets();

        }
      });
    };
  });

//toggling new tweet form upon clicking compose button
//and passing focus on textarea
  $('#compose-button').click(() => {
    $('.new-tweet').slideToggle('fast');
    $('.new-tweet textarea').focus();
  });
});