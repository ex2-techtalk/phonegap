'use strict';

techTalkApp.controller('photoCtrl',
    function photoCtrl($scope, $window, fileReaderService) {
        
        $scope.onclickSave = function () {
            var el = document.getElementById("smallImage");
            fileReaderService.saveImage(el.src).then(function (response) {
                if (response == "success")
                {
                    console.log('Image saved');
                    $window.history.back();
                }
                    

            });

        };

    }
);