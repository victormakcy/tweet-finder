var search_url = 'http://search.twitter.com/search.json?q=';

function runScript(e) {
    if (e.keyCode == 13) {
        searchTwitter();
    }
}

function searchTwitter()
{
	var queryTerm = $('#input-keyword-area').val();

	$.ajax({
		type: 'GET',
		url: search_url + queryTerm + '&rpp=100',
		dataType: 'jsonp',
		success: function(result){
			showTweets(result);
			console.log(result);
		}
	});
};

function showTweets(result){
	$('#stream').html('');

	result.results.forEach(function(that){

		var pictureURL = that.profile_image_url;
		var name = that.from_user;
		var date = that.created_at;
		var index = date.indexOf("+");
		var message = that.text;

		date = date.substr(0,index-1)

		var addingTweet = '<li class="tweet-cards"><div id="profile-pic"><img src="' + pictureURL + '"/><p id="name"><a href="http://www.twitter.com/'+name+'" target="_blank">@'+ name +'</a></p><p id="date">' + date + '</p></div><div id="tweet">' + message + '</div></li>';

		$('#stream').append(addingTweet);

	});
}