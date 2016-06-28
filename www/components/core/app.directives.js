(function() {
  'use strict';
    angular
        .module('bluetoothConfig')
        .directive('animatedCard', animatedCard);

    /* @ngInject */
    function animatedCard() {
        var directive = {
            restrict: 'EA',
            link: linkFunc,
        };

        return directive;

        function linkFunc(scope, element, attrs) {
          setTimeout(function(){
            element.children().find('md-card-content').hide();
          }, 100);
          element.bind('click', function(){
            console.log($(element));
            setTimeout(function(){
              element.children().find('img').slideToggle('slow');
              element.children().find('md-card-title').slideToggle('slow');
              element.children().find('md-card-content').slideToggle('slow');
            }, 150);

          });
        }
    }
})();
