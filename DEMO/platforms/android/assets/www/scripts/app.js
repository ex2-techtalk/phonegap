var techTalkApp = angular.module('techTalkApp', [
 'ui.router',
 'controller',
 'services',
 'ngCordova'
]);

techTalkApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
		.state('home', {
		    url: '/home',
		    templateUrl: 'views/home.html',
		    controller: 'homeCtrl'
		})
        .state('photo', {
            url: '/photo',
            templateUrl: 'views/photo.html',
            controller: 'photoCtrl'
        })
        .state('images', {
            url: '/images',
            templateUrl: 'views/Items.html',
            controller: 'itemsCtrl'
        });

    $urlRouterProvider.otherwise("/home");

});
