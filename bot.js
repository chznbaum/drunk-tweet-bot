console.log('The bot is starting.');
var Twit = require('twit');
var config = require('./config');
var user_screen_name = "otherconsolelog";
var bad_words = ['apple', 'banana', 'bread'];
var T = new Twit(config);
var stream = T.stream('user'); //Setting up a user stream
stream.on('tweet', tweetEvent); // Anytime a tweet enters the stream
console.log('The user stream is open.');
console.log('Listening for tweets from ' + user_screen_name);
function tweetEvent(eventMsg) {
	console.log('A tweet entered the stream.');
	// Uncomment below to write eventMsg data to file
	// var fs = require('fs');
	// fs.writeFile('tweet.json', json);
	var from = eventMsg.user.screen_name;
	var text = eventMsg.text;
	var tweet_id = eventMsg.id_str;
	console.log(tweet_id)
	if (from === user_screen_name) {
		console.log('User ' + user_screen_name + ' sent a tweet.');
		console.log('The tweet says: ' + text);
		var tweet_array = text.split(' ');
		console.log('The tweet in array form is: ' + tweet_array);
		for (var i = 0; i < bad_words.length; i++) {
			if (tweet_array.indexOf(bad_words[i]) != -1) {
				console.log('This tweet contains a bad word! The word is ' + bad_words[i]);
				T.post('statuses/destroy/:id', { id: tweet_id }, function (err, data, response) {
					if (err) {
						console.log('Something went wrong. The tweet was not deleted. This is the error: ');
						console.log(err);
					} else if (data.hasOwnProperty('text') && data.text != '') {
						console.log('Something went wrong. The tweet was not deleted, but it did not throw an error. You need to delete this yourself.');
					} else {
						console.log(data);
						console.log('The bad tweet was deleted! Hooray!');
					}
				});
			}
		}
	}
}