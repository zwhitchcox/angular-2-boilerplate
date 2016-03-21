(function() {
  'use strict'
  angular
    .module('app.user')
    .controller('AccountCtrl', AccountCtrl)

  function AccountCtrl(Restangular, $window, Login) {
    var vm = this
    vm.update = update
    vm.info = decodeJwt(window.localStorage.jwt).claim
    var account = Restangular.all('api/auth/update')
    function update(accountInfo) {
      account
        .post(accountInfo)
        .then(getToken, onErr)
    }

    function getToken(jwt) {
      if (jwt) {
        $window.localStorage.jwt = jwt
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

    function decodeJwt(jwt) {

      var parts, header, claim, signature;
      jwt = jwt || '';
      parts = jwt.split('.');
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
