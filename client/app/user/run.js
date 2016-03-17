(function() {
  'use strict'

  angular
    .module('app.user')
    .run(run)

  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeError', onStateChangeError)
    function onStateChangeError(event, toState, toParams, fromState, fromParams, error) {
      if (error.status === 401) {
        $state.go('home')
      }
    }
  }
})();
