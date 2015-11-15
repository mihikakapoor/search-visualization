var express = require('express');
var router = express.Router();
var Twit = require('twit');
var nconf = require('nconf');

nconf.env().file({ file: 'config.json'});


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: '#realtime' });

});

/* POST home page. */
router.post('/', function(req, res, next) {

	var T = new Twit({
	    consumer_key:         nconf.get('consumer_key'), 
	    consumer_secret:      nconf.get('consumer_secret'), 
	    access_token:         nconf.get('access_token'), 
	    access_token_secret:  nconf.get('access_token_secret')
	});

	var ht = '#' + req.body.hashtag;

	/* REST API - Search for past Tweets */
	T.get('search/tweets', { q: ht, count: 200}, function(err, data, response) {
	  var hashtagCounts = [];
	  var newhashtagcounts = new Array();

	    for (x in data.statuses) {
		    /*console.log(data.statuses[x].text);*/
		    for (y in data.statuses[x].entities.hashtags) {

		    	var htprelower = data.statuses[x].entities.hashtags[y].text;
		    	var lowercase = htprelower.toLowerCase();
		    	

		    	/*hashtagCounts.push({hashtag: lowercase, count: 1});*/
		    	if (typeof hashtagCounts[lowercase] == 'undefined')
		    		hashtagCounts[lowercase] = ({name: lowercase, size: 1});
		    	else {
		    		var vcount = hashtagCounts[lowercase].size;
		    		vcount++;
		    		hashtagCounts[lowercase] = ({name: lowercase, size: vcount});
		    	}

		    	/*
		    	var htprelower = data.statuses[x].entities.hashtags[y].text;
		    	var ht = htprelower.toLowerCase();
		    	if (typeof hashtagarray[ht] == 'undefined')
		    		hashtagarray[ht] = 1;
		    	else 
		    		hashtagarray[ht]++;
		    	
		    	hashtags.push(ht);*/
		    	/*console.log(data.statuses[x].text);*/
		    	/*console.log(lowercase);*/
		    	/*console.log(hashtagarray[ht]);*/
		    }
	    }

	    function compare(a, b)
	    {
		  	if (a.size > b.size)
		  	 	return -1;
		  	if (a.size < b.size)
		  	 	return 1;
		  	return 0;
	    }

	    for (x in hashtagCounts) {
	  		newhashtagcounts.push(hashtagCounts[x]);
	  	}

	    var new_array = newhashtagcounts.sort(compare);
	  	console.log(new_array);

	  	/*write to jsonfile*/
	  	var jsonfile = require('jsonfile');

	  	var file = './public/flare2.json';

	  	var obj = { "name": "flare", "children": new_array }

	  	jsonfile.writeFile(file, obj, function(err) {
	  		console.error(err);
	  	});

	  res.render('index', { title: 'Express', hashtags: new_array, search: req.body.hashtag});
	})
});

/*router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

module.exports = router;
