(function() {
  'use strict'                 

  angular
    .module('app.user')        
    .controller('ResetCtrl', ResetCtrl)
    
  ResetCtrl.$inject = ['Restangular']
  function ResetCtrl(Restangular) {
    var vm = this
    var user = Restangular.all('api/auth/reset')
    vm.reset = reset
          
    function reset(email) {    
      user
        .post({email:email})   
        .then(getResponse,onErr)        
    }   
        
    function getResponse(response) {
      vm.msg = 'Check your email for password reset link.'
      vm.errMsg = undefined
    }   
        
    function onErr(err) {      
      vm.errMsg = err.data     
      vm.msg = undefined       
    }
  } 
})();
