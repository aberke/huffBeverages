huffBeverages
=============
- My first app with nodejs.  Also my first app with mongo!
- Check it out live:
	- http://sleepy-cliffs-7584.herokuapp.com/

Problems addressed:
=============
	- Over at HuffPost the employees are treated to free beverages all day long.  Free beverages are great and all, but having some say over what ends up in the fridge and what isn't delicious enough to take up space in the fridge is an important feature of any tech job.  This app allows feedback of what people like or don't like in the fridge.  
		- Report to your coworkers what is in the (REAL) fridge by adding it to the fridge.
		- Let management know what you like/dislike in the (REAL) fridge with upvotes and downvotes, and what you hope to see there by adding a beverage to the *WISH* Fridge.
		- If a beverage receives more downvotes than upvotes, it's just not cool enough to be in the fridge and is highlighted red.

Run locally:
=============
- once mongo is running....
	$ node server.js

Built With:
=============
	* server: node.js
	* database: mongodb
	* launched with: heroku
	* javascript framework/MVVM: Angularjs
	* extra UI fun: twitter-bootstrap

Features:
=============
	* Real time editing via ajax API requests (with angular's $http service)
	* Restful API with:
		- get requests (get all the beverages)
		- post requests (post new beverage)
		- put requests (update downvote/upvote count)
		- delete requests (delete beverage)