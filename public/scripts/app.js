$(document).ready (function () {

  var DATABASE = [
{
"user": {
"name": "Johann von Goethe",
"avatars": {
"small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
"regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
"large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
},
"handle": "@johann49"
},
"content": {
"text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
},
"created_at": 1461113796368
},
{
"user": {
"name": "Descartes",
"avatars": {
"small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
"regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
"large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
},
"handle": "@rd"
},
"content": {
"text": "Je pense , donc je suis"
},
"created_at": 1461113959088
},
{
"user": {
"name": "Newton",
"avatars": {
"small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
"regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
"large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
},
"handle": "@SirIsaac"
},
"content": {
"text": "If I have seen further it is by standing on the shoulders of giants"
},
"created_at": 1461116232227
},
{
"user": {
"name": "Mildred Oliver",
"handle": "@DrOliver14",
"avatars": {
"small": "https://vanillicon.com/01cce0acc2f11f9d1a90f962bee1a9bf_50.png",
"regular": "https://vanillicon.com/01cce0acc2f11f9d1a90f962bee1a9bf.png",
"large": "https://vanillicon.com/01cce0acc2f11f9d1a90f962bee1a9bf_200.png"
}
},
"content": {
"text": "gjghj"
},
"created_at": 1510687886954
}];


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

  // renderTweets(DATABASE);


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
// console.log(createTweetElement());

  // let createNewTweet = function (tweet) {
  //   let tweetElements = tweet.map(createNewTweetElement);
  //   return tweetElements;
  // }

  // let $container = $('#tweet-container');
  // $container.append(createNewTweet(DATABASE));



})