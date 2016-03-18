(function(){
  'use strict';

  angular
    .module('app.home')
    .controller('HomeCtrl', HomeCtrl)

    function HomeCtrl($http){

      var self = this;
      self.service = null;

      init();

      function init(){
        $http.get('/api/v1/home').success(function(data){
          self.service = data
        })
      }

    }

})();
