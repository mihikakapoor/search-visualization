var express = require('express');
var router = express.Router();
var Twit = require('twit');


/* GET home page. */

/* POST home page. */
router.get('/', function(req, res, next) {

	var T = new Twit({
	    consumer_key:         'E8TSSuSOVnSXvPmEeiYEcwIw8', 
	    consumer_secret:      'm7MgjwnAQfM6PUUxOtGzkutCceW38SUhc761LAZXZByHBKIHQh', 
	    access_token:         '243421898-ouJrkkZyouwQ2uZpvmHPdQuzXM5MWKTq57BirkLd', 
	    access_token_secret:  'SExsA6bXbDJKfTsWa47PDGUppZtElN82PdMkrMNJ67ksH'
	});

	var hi = '#republican'

	/*var ht = */

	/* REST API - Search for past Tweets */
	T.get('search/tweets', { q: hi, count: 100 }, function(err, data, response) {
	  var hashtags = new Array();
	  var hashtagarray = [];
	  for (x in data.statuses) {
	    /*console.log(data.statuses[x].text);*/
	    for (y in data.statuses[x].entities.hashtags) {
	    	var htprelower = data.statuses[x].entities.hashtags[y].text;
	    	var ht = htprelower.toLowerCase();
	    	if (typeof hashtagarray[ht] == 'undefined')
	    		hashtagarray[ht] = 1;
	    	else 
	    		hashtagarray[ht]++;
	    	
	    	hashtags.push(ht);
	    	/*console.log(data.statuses[x].text);*/
	    	/*console.log(ht);*/
	    	/*console.log(hashtagarray[ht]);*/
	    }
	  }
	  console.log(hashtagarray);
	  res.render('index', { title: 'Express', hashtags: hashtags});
	})
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
