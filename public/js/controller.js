function BeveragesCtrl($scope, $http){
	$scope.realBeverages = [];
	$scope.wishBeverages = [];
	$scope.selectedRealBev;
	$scope.selectedWishBev;

	$scope.showNewRealForm = false;
	$scope.showNewWishForm = false;

	$scope.deleteSelectedRealClicked = function(){
		$http({
			method: 'DELETE',
			url: '/beverages/'+$scope.selectedRealBev._id,
		})
		.success(function(returnedData){
			$scope.realBeverages.splice($scope.realBeverages.indexOf($scope.selectedRealBev,1));
			$scope.selectedRealBev = null;
		})
		.error(function(){console.log('API ERROR');});		
	}
	$scope.deleteSelectedWishClicked = function(){
		$http({
			method: 'DELETE',
			url: '/beverages/'+$scope.selectedWishBev._id,
		})
		.success(function(returnedData){
			$scope.wishBeverages.splice($scope.wishBeverages.indexOf($scope.selectedWishBev,1));
			$scope.selectedWishBev = null;
		})
		.error(function(){console.log('API ERROR');});		
	}

	$scope.newRealButtonClicked = function(){
		$scope.selectedRealBev = false;
		$scope.showNewRealForm = true;
	}
	$scope.newWishButtonClicked = function(){
		$scope.selectedWishBev = false;
		$scope.showNewWishForm = true;
	}

	$scope.selectReal = function(bev){
		$scope.showNewRealForm = false;
		$scope.selectedRealBev=bev;
	}
	$scope.selectWish = function(bev){
		$scope.showNewWishForm = false;
		$scope.selectedWishBev=bev;
	}

	$scope.upvote = function(bev){
		bev.upvotes = bev.upvotes + 1;
		update_beverage(bev);
	}
	$scope.downvote = function(bev){
		bev.downvotes = bev.downvotes + 1;
		update_beverage(bev);
	}
	var update_beverage = function(bev){
		$http({
			method: 'PUT',
			url: '/beverages/'+bev._id,
			data: {name:bev.name,
					upvotes:bev.upvotes,
					downvotes:bev.downvotes,
					real:bev.real,
					description:bev.description,
					calories:bev.calories
				},
		})
		.success(function(returnedData){console.log(returnedData);})
		.error(function(){console.log('API ERROR');});
	}
	$scope.postBev = function(realBool){
		$http({
			method: 'POST',
			url: '/beverages',
			data: {name:this.bevName,
					upvotes:0,
					downvotes:0,
					real:realBool,
					description:this.bevDescription,
					calories:this.bevCalories
				},
		})
		.success(function(returnedData){
			if(realBool){
				$scope.realBeverages.push(returnedData);
				$scope.showNewRealForm = false;
			}
			else{
				$scope.wishBeverages.push(returnedData);
				$scope.showNewWishForm = false;
			}
		})
		.error(function(){console.log('API ERROR');});
	}

	var handle_beverages = function(beverages){
		$scope.realBeverages = [];
		$scope.wishBeverages = [];
		var numBeverages = beverages.length;
		for(var i=0; i<numBeverages; i++){
			var bev = beverages[i];
			if(bev.real){$scope.realBeverages.push(bev);}
			else{$scope.wishBeverages.push(bev);}
		}
	}

	var get_beverages = function(){
		$http({
			method: 'GET',
			url: '/beverages',
		})
		.success(function(returnedData){handle_beverages(returnedData);})
		.error(function(){console.log('API ERROR');});
	}
	$scope.classByVotes = function(bev){
		if(bev.upvotes >= bev.downvotes){return 'blue-background';}
		else{return 'red-background';}
	}


	var init = function(){
		get_beverages();
	}
	init();
}
var submit = function(){console.log('hi');}

