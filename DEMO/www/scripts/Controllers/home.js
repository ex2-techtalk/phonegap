'use strict';

techTalkApp.controller('homeCtrl', 
    function homeCtrl($log, $scope){
        $scope.onclickCamera = function () {
            console.log('Getting to onclick Camera');
            capture();
        };
    });
