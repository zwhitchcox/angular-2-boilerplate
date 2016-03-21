(function() {
  'use strict'
  
  angular
    .module('app.user')
    .controller('LogoutCtrl', LogoutCtrl)

  function LogoutCtrl($window, $state, Login) {
    delete $window.localStorage.jwt
    Login.isLoggedIn = false
    $state.go('home')
  }
})();
