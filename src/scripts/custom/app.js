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
    // cfpLoadingBarProvider.spinnerTemplate = '<div class="load-main-box"><div class="load-box"><div class="logo"><span></span></div><span id="text" loading>Sky vow</span></div></div>';
    
    $httpProvider.interceptors.push('timestampMarker');
}]);

App.run(['$rootScope', function($rootScope){
    $rootScope.sidebarActive = false;
}]);

App.factory('timestampMarker', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    var timestampMarker = {
        request: function (config) {
            $rootScope.loading = true;
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function (response) {
            $timeout(function(){
                $rootScope.loading = false;
            }, 3000);
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return timestampMarker;
}]);