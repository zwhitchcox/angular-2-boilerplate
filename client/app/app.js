(function(){
  'use strict';

  angular.module('app', [
    'ngResource',
    'ui.router',
    'restangular',

     // 3rd Party Modules

     // Custom Modules
     'app.home',
     'app.user'
  ])

  .config(config);
  
  angular.module('app.user',[])
  angular.module('app.home', []);
  
  function config($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
  }


})();
