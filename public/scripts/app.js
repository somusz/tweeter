$(document).ready (function () {

  let createTweetElement = function (tweet) {
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    function msToDays (ms) {
      let date = new Date(ms);
      let now = new Date(Date.now());
      return now.getDay() - date.getDay();
    }

    return $(
      `<article>
        <header>
          <img class=\'hovering\' src=${tweet.user.avatars.small}>
          <span class=\'user-name hovering\'>${tweet.user.name}</span>
          <span class=\'handle hovering\'>${tweet.user.handle}</span>
        </header>
      <p>${escape(tweet.content.text)}</p>
        <footer>
          <span>Posted ${msToDays(tweet.created_at)} days ago</span>
          <span class=\'links\'>
            <a href=\'\'><i class=\'fa fa-flag\' aria-hidden=\'true\'></i></a>
            <a href=\'\'><i class=\'fa fa-retweet\' aria-hidden=\'true\'></i></a>
            <a href=\'\'><i class=\'fa fa-heart\' aria-hidden=\'true\'></i></a>
          </span>
        </footer>
      </article>`);
  }

  let renderTweets = function (tweets) {
    tweets.forEach( function (tweet) {
      let toAppend = createTweetElement(tweet);
      $('#tweet-container').append(toAppend);
    })
  }

  let loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {
        renderTweets(data);
      }
    })

  }()


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