App.controller('AppController', ['$scope', '$rootScope', '$http', 'cfpLoadingBar', '$timeout', function($scope, $rootScope, $http, cfpLoadingBar, $timeout){

	$http.get('./api/data.json').success(function(data, status, headers, config) {
		$scope.packages = data['list'];
		console.log(data['list']);
	}).error(function(data, status, headers, config) {
		console.log("error");
	});

	$scope.start = function() {
      cfpLoadingBar.start();
    };

    $scope.complete = function () {
      cfpLoadingBar.complete();
    };

    // fake the initial load so first time users can see the bar right away:
    $scope.start();
    // $scope.fakeIntro = true;
    // $timeout(function() {
      $scope.complete();
      // $scope.fakeIntro = false;
    // }, 1250);
    
   
    $scope.sidebar = function() {
        $rootScope.sidebarActive = !$rootScope.sidebarActive;
    };
    

}]);


App.controller('ListController', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', function($scope, $rootScope, $stateParams, $location, $sce){
    $rootScope.sidebarActive = false;
	$scope.contactId = $stateParams.contactId;
	console.log($stateParams.contactId);
	new Clipboard('.btn-copy');
	$scope.currentProject = $scope.packages[$scope.contactId];
	$scope.currentProjectUrl = $sce.trustAsResourceUrl($scope.currentProject.src);
    console.log( $scope.currentProject );
    console.log( $scope.currentProjectUrl );
    $scope.minIframe = function() {
    	$scope.iframeSize = 'min-iframe';
    };
    $scope.maxIframe = function() {
    	$scope.iframeSize = 'max-iframe';
    };
    $scope.closeIframe = function() {
    	$scope.iframeSize = 'close-iframe';
    };
}]);