var express = require('express');
var router = express.Router();
var Twit = require('twit');

/* GET home page. */
router.get('/', function(req, res, next) {

	var T = new Twit({
	    consumer_key:         ''
	  , consumer_secret:      ''
	  , access_token:         ''
	  , access_token_secret:  ''
	});

	/* REST API - Search for past Tweets */
	T.get('search/tweets', { q: '#Paris', count: 10 }, function(err, data, response) {
	  var hashtags = new Array();
	  for (x in data.statuses) {
	    /*console.log(data.statuses[x].text);*/
	    for (y in data.statuses[x].entities.hashtags)
	    	hashtags.push(data.statuses[x].entities.hashtags[y].text);
	    	console.log(data.statuses[x].entities.hashtags[y].text);
	  }
	  res.render('index', { title: 'Express', hashtags: hashtags});
	})
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
