(function() {
  'use strict'

  angular
    .module('app')
    .controller('NavLoginCtrl', NavLoginCtrl)

  function NavLoginCtrl(Login) {
    var vm = this
    vm.state= Login
  }
})();
