
var searchquery = document.getElementById('s-q');
var searchbutton = document.getElementById('s-b');

window.onload = function() {
	searchquery.focus();
};


$('#s-q').focus();

searchquery.onkeypress = function(e) {
	if (e.keyCode === 13) {
		execute();
	}
}

searchbutton.addEventListener('click', execute, false);



function execute() {
	var query = searchquery.value;
	var searchtype = query.substring(0,2);
	var specific = query.substring(3);

	if(searchtype == '!d') {
		define(specific);
		showhide('dshide');
	}

	 else if(searchtype == '!y') {
		window.location = 'https://www.youtube.com/results?search_query=' + specific;

	}

	else if(searchtype == '!k') {
		window.location = 'https://kat.cr/usearch/' + specific;
	}

	else if(searchtype == '!r') {
		window.location = 'https://www.reddit.com/search?q=' + specific;
	}

	else if(searchtype == '!w') {
		findweather(specific);
		showhide('shide');
	}

	else {
		window.location = 'https://google.co.in/search?q=' + query;
	}
}

function showhide(id) {
	var sh = document.getElementById(id);
	if(sh.style.display == 'block') {
		sh.style.display = 'none';
	}
	else 
		sh.style.display = 'block'
}


function findweather(specific) {
	var we = 'http://api.openweathermap.org/data/2.5/find?q=' + specific + '&units=metric&appid={{$YOUR KEY HERE}}';
		
	$.getJSON(we, function(json) {
		var loc = json.list[0].name + ', ' + json.list[0].sys.country;
 		var des = json.list[0].weather[0].description;
 		var temperature = json.list[0].main.temp;
 		var maxi = 'Maximum: ' + json.list[0].main.temp_max + ' °C';
 		var mini = 'Minimum: ' + json.list[0].main.temp_min + ' °C';
 		var idw = json.list[0].weather[0].id;

 		var d = new Date();
   		var n = d.getHours();

   		if( n < 6 || n > 19){
   			var dn = 'night';
   		} 
   		else 
   			var dn = 'day';

		var place =  loc;
		var place1 ='Current: ' + temperature + '°C';
		var place3 = des;
		var place4 = 'wi wi-owm-' + dn + '-' + idw;

		//console.log(place);
		//console.log(place1);
  		document.getElementById('he').innerHTML= place;
  		document.getElementById('waterfall').innerHTML = place1;
  		document.getElementById('max').innerHTML = maxi;
  		document.getElementById('min').innerHTML = mini;
  		document.getElementById('descrip').innerHTML = place3;
		document.getElementById('icons').innerHTML = '<i class=\"' + place4 +  '\"></i>';

});
}


function dshowhide(id) {
	var sh = document.getElementById(id);
	if(sh.style.display == 'block') {
		sh.style.display = 'none';
	}
	else 
		sh.style.display = 'block'
}


function define(specific) {
	var we = 'http://api.wordnik.com:80/v4/word.json/' + specific + '/definitions?limit=200&includeRelated=false&sourceDictionaries=wiktionary&useCanonical=false&includeTags=false&api_key={{$YOUR KEY HERE}}';
		
	$.getJSON(we, function(def) {

		var word = 'Definition: ' + specific;

		var typ1 = def[0].partOfSpeech + ';';
		var defined1 = def[0].text;

		var typ2 = def[1].partOfSpeech + ';';
		var defined2 = def[1].text;

		var typ3 = def[2].partOfSpeech + ';';
		var defined3 = def[2].text;

		document.getElementById('dhe').innerHTML = specific; 
		document.getElementById('type1').innerHTML = typ1;
		document.getElementById('define1').innerHTML = defined1;
		document.getElementById('type2').innerHTML = typ2;
		document.getElementById('define2').innerHTML = defined2;
		document.getElementById('type3').innerHTML = typ3;
		document.getElementById('define3').innerHTML = defined3;



	});
}
