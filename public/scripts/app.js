$(document).ready (() => {

  let escape = (str) => {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

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

  let createTweetElement = (tweet) => {
    return $(
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
            <a href=''><i class="fa fa-flag" aria-hidden="true"></i></a>
            <a href=''><i class="fa fa-retweet" aria-hidden="true"></i></a>
            <a href=''><i class="fa fa-heart" aria-hidden="true"></i></a>
          </span>
        </footer>
      </article>`);
  };

  let renderTweets = (tweets) => {
    $('#tweet-container').empty();
    tweets.forEach( (tweet) => {
      $('#tweet-container').prepend(createTweetElement(tweet));
    });
  };

  let loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (data) => {
        renderTweets(data);
      }
    });
  };

  loadTweets();

  $('.new-tweet form').submit (function() {
    event.preventDefault();

    let tweetData = $(this).serialize();
    let tweetText = $(this).children('textarea').val();

    if (!tweetText) {
      $('.new-tweet').append(`<div id="error-nomsg">Hum louder!</div>`);

      setTimeout(() => {
        $('#error-nomsg').remove();
      }, 3000);
    }

    else if (tweetText.length > 140) {
      $('.new-tweet').append(`<div id="error-over140">Cut it out, you're over 140!</div>`);

      setTimeout(() => {
        $('#error-over140').remove();
      }, 3000);
    }

    else {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: tweetData,
        success: () => {

          $('#new-tweet-input').val('');

          loadTweets();

        }
      });
    };
  });

  $('#compose-button').click(() => {
    $('.new-tweet').slideToggle('fast');
    $('.new-tweet textarea').focus();
  });
});