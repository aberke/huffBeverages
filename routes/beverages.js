/* not using Mongo...but I'll pretend? */
var db = {};


exports.findAllReal = function(request, response){
	response.send(db['real']);
};
exports.findAllWish = function(request, response){
	response.send(db['wish']);
};

var populateDB = function() {
	var beverages = {
	real: [
		{
			name: "Diet Pepsi Cherry",
			upvotes: 0,
			downvotes: 0,
			score: 0,
		},
		{
			name: "Coke",
			upvotes: 0,
			downvotes: 0,
			score: 0,
		},
	],
	wish: [
		{
			name: "Polar Seltzer Lime",
			upvotes: 0,
			downvotes: 0,
			score: 0,
		},
	]};
	return beverages;
}
db = populateDB();
console.log(db);