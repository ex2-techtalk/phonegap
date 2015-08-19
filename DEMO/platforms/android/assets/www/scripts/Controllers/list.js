controller.controller('itemsCtrl', ['homeModel', '$scope', 'fileReaderService', '$cordovaInstagram', function (homeList, $scope, fileReaderService, $cordovaInstagram) {
    var list = this;
    fileReaderService.getAllFiles().then(function (e) {
        console.log(e);
        $scope.images = e;
    });

    $scope.onClickPhoto = function(src) {
        console.log("Entering onclick");
        var img = new Image();
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        img.src = src;

        img.onload = function () {
            console.log("loaded");
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height);

            imageData = canvas.toDataURL("image/png");
            console.log(imageData);

            Instagram.share(imageData, function (err) {
                if (err) {
                    console.log("not shared");
                } else {
                    console.log("shared");
                }
            });
        };
        
    }

}]);