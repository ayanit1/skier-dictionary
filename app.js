var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser"); //middleware, help parse through data that is posted to api
var app = express();

var skierTerms = [
	{
		term: "Rip",
		defined: "To move at a high rate of speed"
	},
	{
		term: "Huck",
		defined: "To throw your body off of something, usually a natural feature like a cliff"
	},
	{
		term: "Chowder",
		defined: "Powder after it has been sufficiently skied"
	}
];

// allows us to accept both json and url encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.use(express.static("./public"));

// allows us to use api on different domains
app.use(cors());

// api request
app.get("/dictionary-api", function(req, res){
	res.json(skierTerms);
});

// adding receiver for any post requests. Pushes request onto skierTerms
app.post("/dictionary-api", function(req, res){
	skierTerms.push(req.body);
	res.json(skierTerms);
});

// allows us to delete terms by creating delete route
app.delete("/dictionary-api/:term", function(req, res){
	skierTerms = skierTerms.filter(function(definition){ //reset skierTerms
		return definition.term.toLowerCase() !== req.params.term.toLowerCase(); //predicate, returns true means definition stays in array else deletes
	});
	res.json(skierTerms);
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;
