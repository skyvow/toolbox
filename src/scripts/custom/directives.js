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