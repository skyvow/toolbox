var App = angular.module('App', ['ngAnimate', 'ui.router', 'chieffancypants.loadingBar']);

App.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', 'cfpLoadingBarProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, cfpLoadingBarProvider) {
    //set router
    $urlRouterProvider.otherwise("/index");
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'tpl/index.html'
        })
        .state('bootstrap', {
        	abstract: true,
        	url: '/bootstrap',
            templateUrl: 'tpl/bootstrap.html'
        })
        .state('bootstrap.list', {
    		url: '/{contactId:[0-9]{1,4}}',
    		templateUrl: 'tpl/list.html',
    		controller: 'ListController'
		});
    // $locationProvider.html5Mode(true);
    
    // true is the default, but I left this here as an example:
    cfpLoadingBarProvider.includeSpinner = true;
    // cfpLoadingBarProvider.includeBar = false;
    // cfpLoadingBarProvider.spinnerTemplate = '<div class="test"><div id="loading-bar-spinner"><div class="spinner-icon"></div></div></div>';
    
}]);

App.run(['$rootScope', function($rootScope){
    $rootScope.sidebarActive = false;
}]);