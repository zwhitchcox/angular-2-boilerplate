(function(){
  'use strict';

  angular
    .module('app.user')
    .config(config)

  function config ($stateProvider, $locationProvider, $httpProvider, $provide) {
    $provide.factory('authInterceptor', authInterceptor)
    authInterceptor.$inject = ['$window']
    function authInterceptor($window) {
      return {
        request: function (config) {
          if ($window.localStorage.jwt) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.jwt
          }
          return config
        }
      }
    }
    $httpProvider.interceptors.push('authInterceptor')
    $stateProvider
      .state('cl', {
        abastract:true,
        template: '<ui-view/>',
        resolve: {
          loggedin: ['$window', '$timeout', '$state',
            function ($window, $timeout, $state) {
              if (!$window.localStorage.jwt)
                $timeout(function() {
                  $state.go('login')
                })
              return ''
            }
          ]
        }
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'app/user/views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/user/views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('reset', {
        url: '/reset',
        templateUrl: 'app/user/views/reset.html',
        controller: 'ResetCtrl',
        controllerAs: 'reset'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/user/views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .state('account', {
        url: '/account',
        templateUrl: 'app/user/views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'account'
      })
  }
})();
