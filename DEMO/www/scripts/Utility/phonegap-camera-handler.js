function capture() {
    navigator.camera.getPicture(getImageURI, function (message) {
        alert('Image Capture Failed');
    }, {
        quality: 35,
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true
    });


}

function getImageURI(imageURI) {
    var smallImage = document.getElementById('smallImage');

    smallImage.style.display = 'block';

    smallImage.src = imageURI;

}
//Move image taken to app folder on device
function saveImageUri(imageURI) {
    var gotFileEntry = function (fileEntry) {
        //alert("got image file entry: " + fileEntry.fullPath);
        var gotFileSystem = function (fileSystem) {
            fileSystem.root.getDirectory('TechTalk', {
                create: true
            }, function (dataDir) {
                fileName = fileEntry.name;
                fileEntry.moveTo(dataDir, fileName, success, fsFail);
            }, dirFail);

        };
        // get file system to copy or move image file to
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, fsFail);
    };
    // resolve file system for image
    window.resolveLocalFileSystemURL(imageURI, gotFileEntry, fsFail);

    // file system fail
    var fsFail = function (error) {
        alert("failed with error code: " + error.code);

    };

    var dirFail = function (error) {
        alert("Directory error code: " + error.code);

    };

    var success = function () {
        console.log("Succeed");
    };
}