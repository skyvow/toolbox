App.directive('backToTop', ['$window', function($window){
	return {
		restrict: 'EA', 
		replace: true,
		link: function(scope, element, attrs, controller) {
			// var pH=document.documentElement.clientHeight;
			var timer = null;
			var scrollTop;
			angular.element($window).bind('scroll', function(){
				scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if (scrollTop > 100) {
					element.addClass('active');
				} else {
					element.removeClass('active');
				}
			});

			console.log(angular.element($window));

			element.bind("click", function(){
				clearInterval(timer);
				timer = setInterval(function(){
					var now = scrollTop;
					var speed = (0-now)/10;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					if(scrollTop == 0){
						clearInterval(timer);
					}
					document.documentElement.scrollTop = scrollTop + speed;
					document.body.scrollTop = scrollTop + speed;
				}, 10);
			});
		}
	};
}]);

App.directive('star', function () {
	return {
	    template: 
	    		'<ul class="rating" ng-mouseleave="leave()">' +
	        	'<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1, $event)" ng-mouseover="over($index + 1)">' +
	        	'<i class="fa fa-star"></i>' +
	        	'</li>' +
	        	'</ul>',
	    scope: {
			ratingValue: '=',
			max: '=',
			readonly: '@',
			onHover: '=',
			onLeave: '='
	    },
	    controller: function($scope){
			$scope.ratingValue = $scope.ratingValue || 0; //点亮星星个数
			$scope.max = $scope.max || 5; //星星最大个数

			//点击更新点亮星星个数
			$scope.click = function(val, $event){
				$event.preventDefault();
				$event.stopPropagation();
				if ($scope.readonly && $scope.readonly === 'true') {
					return;
				}
				$scope.ratingValue = val;
				console.log($event)
			};

			//鼠标进入
			$scope.over = function(val){
				$scope.onHover(val);
			};

			//鼠标移开
			$scope.leave = function(){
				$scope.onLeave();
			}
	    },
	    link: function (scope, elem, attrs) {

	    	//更新视图
		    var updateStars = function () {
				scope.stars = [];
				for (var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled: i < scope.ratingValue
					});
				}
				
		    };
	     	updateStars();
	 		
	 		//监听点亮星星个数，更新视图
			scope.$watch('ratingValue', function (oldVal, newVal) {
				if (newVal) {
					updateStars();
				}
			});

			//监听星星最大个数，更新视图
			scope.$watch('max', function (oldVal, newVal) {
				if (newVal) {
					updateStars();
				}
			});
	    }
	};
});

App.directive('loading', [function(){
	
	return {
		restrict: 'AE',
		template: '<span ng-transclude></span>',
		replace: true,
		transclude: true,
		link: function(scope, element, attrs, controller) {

			console.log(element.text())

			var str 	  = element.text(),
	        	loadClass = ["yoyo-load0", "yoyo-load1", "yoyo-load2", "yoyo-load3", "yoyo-load4", "yoyo-load5"];

	      	if (element != null) element.text('');

			function c_random(num, arrlen) {
				var arr = [];

				function r(i) {
					var t = Math.round(Math.random() * (num - 1));
					if (t == arr[i - 1]) {
						r(i);
						return;
					}
					arr.push(t);
				}

				for (var i = 0; i < arrlen; i++) {
					r(i);
				}

				return arr;
			}

	      	var tarr = c_random(loadClass.length, str.length);

			for (var i = 0; i < str.length; i++) {
				var t = str[i];

				if (t == " ") {
					t = "&nbsp;"
				}

				var _class = "yoyo-x-left";
				if (i > 0 && i < str.length - 1) {
					_class = loadClass[tarr[i]];
				}

				if (i == str.length - 1) {
					_class = 'yoyo-x-right';
				}

				element.append("<p class='" + _class + "'>" + t + "</p>");
			}
		}
	};
}]);