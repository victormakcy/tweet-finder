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

		
		var name = that.from_user;
		var pictureURL = 'https://api.twitter.com/1/users/profile_image?screen_name=' + name + '&size=bigger';
		var date = that.created_at;
		var index = date.indexOf("+");
		var message = that.text;

		date = date.substr(0,index-1)

		var addingTweet = '<li class="tweet-cards"><div class="card-top"></div><div class="profile-pic"><img src="' + pictureURL + '"/><p id="name"><a href="http://www.twitter.com/'+name+'" target="_blank">@'+ name +'</a></p><p id="date">' + date + '</p></div><div class="card-bottom"><div id="tweet">' + message + '</div></li>';

		$('#stream').append(addingTweet);

	});
}