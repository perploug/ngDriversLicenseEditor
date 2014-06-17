angular.module('umbraco').controller('DriversLicenseEditorController',
	function($scope, dialogService) {
  	
  	
	$scope.months = [
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December"
						];
	$scope.years = [2014, 2013, 2012, 2011, 2010, 2009];


	$scope.model.value.month = "June";
	$scope.model.value.year = 2010;



	$scope.setYear = function(year){
		$scope.model.value.year = year;
	};

	$scope.setMonth = function(month){
		$scope.model.value.month = month;
	};


	$scope.pickImage = function(){
		dialogService.mediaPicker({callback:function(data){
			$scope.model.value.image = data.image + "?width=120&height=180&mode=crop";
			$scope.model.value.mediaId = data.id;	
		}});
	};
});

