function BeveragesCtrl($scope, $http){
	$scope.realBeverages = [{name:'coke', upvotes:0},{name:'pepsi',upvotes:1}];
	$scope.wishBeverages = [];

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
		.success(function(returnedData){
			console.log(returnedData);
			handle_beverages(returnedData);
		})
		.error(function(){console.log('API ERROR');});
	}


	var init = function(){
		get_beverages();
	}
	init();
}