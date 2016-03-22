(function() {
  'use strict'                 

  angular
    .module('app.user')        
    .controller('ResetCtrl', ResetCtrl)
    
  function ResetCtrl(Restangular, $location, $window, Login, $state) {
    var vm = this
    var user = Restangular.all('api/auth/reset')
    vm.sptoken = $location.search().sptoken
    if (vm.sptoken) 
      vm.reset = reset
    else
      vm.reset = sendReset
          
    function reset(password) {
      user
        .post({
          token: vm.sptoken,
          password: password
        })
        .then(getResetResponse,onErr)
    }

    function sendReset(email) {    
      user
        .post({email:email})   
        .then(getSendResponse,onErr)        
    }   

    function getResetResponse (jwt) {
      if (jwt) {
        $window.localStorage.jwt = jwt
        Login.isLoggedIn = true
        $state.go('home')
      } else {
        vm.msg = 'Something went wrong...'
        vm.errMsg = undefined
      }
    }

    function getSendResponse(response) {
      vm.msg = 'Check your email for password reset link.'
      vm.errMsg = undefined
    }   
        
    function onErr(err) {      
      vm.errMsg = err.data     
      vm.msg = undefined       
    }
  } 
})();
