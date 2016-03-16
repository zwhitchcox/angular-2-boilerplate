(function() {
  'use strict'

  angular
    .module('app.user')
    .controller('RegisterCtrl', RegisterCtrl)

  function RegisterCtrl(Restangular, Login, $window, $state) {
    var vm = this
    var user = Restangular.all('api/auth/register')
    vm.register = register
    
    function register(credentials) {
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
        vm.msg = 'Something went wrong...'
      }
    }

    function onErr(err) {
      vm.msg = err.data
    }
  }
})();
