// / *** MODULE *** / //

var angularLoginModule = angular.module('angularLoginModule', [ 'ngRoute' ]);

// / *** CONFIGURATIONS *** / //

angularLoginModule.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : './pages/login/login.html',
		controller : 'loginController'
	});
} ]);

// / *** RUNNERS *** / //

angularLoginModule.run(function($rootScope, $location) {
	$rootScope.$on('$routeChangeStart', function() {
		$location.url('/');
	});
});

// / *** CONTROLLERS *** / //

angularLoginModule.controller('loginController', function($scope, $location) {

	window.fbAsyncInit = function() {
		FB.init({
			appId : '387880144715063',
			cookie : true, // enable cookies to allow the server to access
			// the session
			xfbml : true, // parse social plugins on this page
			version : 'v2.1' // use version 2.1
		});

		// Now that we've initialized the JavaScript SDK, we call
		// FB.getLoginStatus(). This function gets the state of the
		// person visiting this page and can return one of three states to
		// the callback you provide. They can be:
		//
		// 1. Logged into your app ('connected')
		// 2. Logged into Facebook, but not your app ('not_authorized')
		// 3. Not logged into Facebook and can't tell if they are logged into
		// your app or not.
		//
		// These three cases are handled in the callback function.

		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});

	};
	
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=387880144715063&version=v2.0";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	// Load the SDK asynchronously
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id))
			return;
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	(function() {
		var po = document.createElement('script');
		po.type = 'text/javascript';
		po.async = true;
		po.src = 'https://apis.google.com/js/client:plusone.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(po, s);
	})();


});

function checkLoginState() {
	console.log("ChekLoginState!!!!");
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		testAPI();
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log '
				+ 'into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		document.getElementById('status').innerHTML = 'Please log '
				+ 'into Facebook.';
	}
}

// Here we run a very simple test of the Graph API after login is
// successful. See statusChangeCallback() for when this call is made.
function testAPI() {
	console.log('Welcome!  Fetching your information.... ');
	FB
			.api(
					'/me',
					function(response) {
						console.log('Successful login for: ' + response.name);
						document.getElementById('status').innerHTML = 'Thanks for logging in, '
								+ response.name + '!';
						window.location
								.assign("http://localhost:8080/PruebaGit/pages/home/home.html");
					});
}

function signinCallback(authResult) {
	if (authResult['access_token']) {
		// Autorizado correctamente
		// Oculta el botón de inicio de sesión ahora que el usuario está
		// autorizado, por ejemplo:
		window.location
				.assign("http://localhost:8080/PruebaGit/pages/home/home.html");
		document.getElementById('signinButton').setAttribute('style',
				'display: none');
	} else if (authResult['error']) {
		// Se ha producido un error.
		// Posibles códigos de error:
		// "access_denied": el usuario ha denegado el acceso a la aplicación.
		// "immediate_failed": no se ha podido dar acceso al usuario de forma
		// automática.
		console.log('There was an error: ' + authResult['error']);
	}
}
