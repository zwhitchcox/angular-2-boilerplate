(function() {
  'use strict'
  angular
    .module('app.user')
    .controller('LoginCtrl', LoginCtrl)

  function LoginCtrl($window, $state, Login, Restangular) {
    var vm = this
    vm.login = login
    var user = Restangular.all('api/auth/authenticate')
    function login(credentials) {
      user
        .post(credentials)
        .then(getResponse, onErr)
    }

    function getResponse(token) {
      if (token) {
        $window.localStorage.token = token
        Login.isLoggedIn = true
        $state.go('home')
      } else {
        login.msg = 'Something went wrong...'
      }
    }

    function onErr(err) {
      vm.msg = err.data
    }
  }
})();
