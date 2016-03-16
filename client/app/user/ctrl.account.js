(function() {
  'use strict'
  angular
    .module('app.user')
    .controller('AccountCtrl', AccountCtrl)

  function AccountCtrl(Restangular, $window, Login) {
    var vm = this
    vm.update = update
    vm.token = 
    vm.info = decodeToken(window.localStorage.token).claim
    var account = Restangular.all('api/auth/update')
    function update(accountInfo) {
      account
        .post(accountInfo)
        .then(getToken, onErr)
    }

    function getToken(token) {
      if (token) {
        $window.localStorage.token = token
        Login.isLoggedIn = true
        vm.successMsg = 'Information Updated'
        vm.msg = undefined
      } else {
        vm.msg = 'Something went wrong...'
        vm.successMsg = undefined
      }
    }

    function onErr(err) {
      vm.msg = err.data
      vm.successMsg = undefined
    }

    function decodeToken(token) {

      var parts, header, claim, signature;
      token = token || '';
      parts = token.split('.');
      if (parts.length === 3) {
        header = parts[0];
        claim = parts[1];
        signature = parts[2];
        header = JSON.parse(decodeURIComponent(escape(atob(header))));
        claim = JSON.parse(decodeURIComponent(escape(atob(claim))));
      }
    
      return {
        header: header,
        claim: claim,
        signature: signature
      }
    }
  }
})();
