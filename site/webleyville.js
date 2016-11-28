var express = require('express');
var homerQuotes = [
	"Operator! Give me the number for 911!",
	"What do we need a psychiatrist for? We know our kid is nuts.",
	"Owww look at me Marge, I'm making people Happy! I'm the magical man, from Happy Land, who lives in a gumdrop house on Lolly Pop Lane!!!!...... By the way I was being sarcastic...",
	"America's health care system is second only to Japan... Canada, Sweden, Great Britain... well, all of Europe. But you can thank your lucky stars we don't live in Paraguay.",
	"Everyone knows rock n' roll attained perfection in 1974; It's a scientific fact.",
	"First you get the sugar, then you get the power, then you get the women."
];
var app = express();

//set handlebars 
var handlebars = require('express3-handlebars')
		.create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	var homerQuote = homerQuotes[Math.floor(Math.random() * homerQuotes.length)];
	res.render('about', {homerQuote: homerQuote});
})

//static middleware
app.use(express.static(__dirname + '/public'));

// custom 404 page
app.use(function(req, res){	
	res.status(404);
	res.render('404');
});
// custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);		
	res.status(500);
	res.render('500');
});
app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to cut this shit down.' );
});