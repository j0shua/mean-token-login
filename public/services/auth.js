angular.module('MyApp')
	.factory('Auth', function($http, $location, $rootScope, $alert, $window) {
		var token = $window.localStorage.token;
    	if (token) {
      		var payload = JSON.parse($window.atob(token.split('.')[1]));
      		$rootScope.currentUser = payload.user;
    	}

		function login(user){
			return $http.post('auth/login', user)
				.success(function(data){
					$window.localStorage.token = data.token;
					var payo
					var payload = JSON.parse($window.atob(data.token.split('.')[1]));
            		$rootScope.currentUser = payload.user;
            		$location.path('/');
            		$alert({
              			title: 'Cheers!',
              			content: 'You have successfully logged in.',
              			animation: 'fadeZoomFadeDown',
              			type: 'material',
              			duration: 3
            		});
				})
				.error(function(data){
					delete $window.localStorage.token;
					$alert({
						title: 'error!',
						content: 'invalid username / password' + data,
						animation: 'fadeZoomFadeDown',
						type: 'material',
						duration: 3
					});
				});
		}

		function signup(user){
			return $http.post('auth/signup', user)
				.success(function(data){
					$location.path('/login');
            		$alert({
              			title: 'Congratulations!',
              			content: 'Your account has been created.',
              			animation: 'fadeZoomFadeDown',
              			type: 'material',
              			duration: 3
            		});
				})
				.error(function(response){
					$alert({
		            	title: 'Error!',
              			content: response.data,
              			animation: 'fadeZoomFadeDown',
              			type: 'material',
              			duration: 3
              		})
				})
		}

		function logout(){
			delete $window.localStorage.token;
			$rootScope.currentUser = null;
			$alert({
				content: 'you have successfully logged out',
				animation: 'fadeZoomFadeDown',
				type: 'material',
				duration: 3
			});
			$location.path('/');
		}

		return {
			login: login,
			signup: signup,
			logout: logout
		};
	});