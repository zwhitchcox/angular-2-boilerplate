(function() {
  'use strict'

  angular
    .module('app.user')
    .controller('ResetCtrl', ResetCtrl)
  
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
    }

    function onErr(err) {
      vm.msg = err.data
    }
  }
})();
