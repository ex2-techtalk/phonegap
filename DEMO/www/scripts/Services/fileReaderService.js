'use strict';

techTalkApp.factory("fileReaderService",
	function ($q, userData) {
	    return {
	        getAllFiles: function () {
	            var deferred = $q.defer();
	            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
	            //Read app directory on device
	            function onFileSystemSuccess(fileSystem) {
	                fileSystem.root.getDirectory('TechTalk', { create: false, exclusive: false }, getDirSuccess, fail);
	            }

	            function getDirSuccess(dirEntry) {

	                // Get a directory reader
	                var directoryReader = dirEntry.createReader();

	                // Get a list of all the entries in the directory
	                directoryReader.readEntries(readerSuccess, fail);
	            }

	            function readerSuccess(entries) {
	                var files = [];
	                var i;
	                for (i = 0; i < entries.length; i++) {
	                    files.push({ id: i + 1, title: entries[i].name, src: entries[i].nativeURL, star: false });
	                    console.log(entries[i]);
	                }
	                userData.photos = files;
	                deferred.resolve(files);
	            }

	            function fail(error) {
	                console.log("Failed to list directory contents: " + error.code);
	            }
	            //Return data as a promise
	            return deferred.promise;

	        },
	        deletePhoto: function (filename) {
	            var defer = $q.defer();


	            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, fsFail);

	            function gotFileSystem(fileSystem) {
	                fileSystem.root.getFile("TechTalk/" + filename, { create: false, exclusive: false }, gotRemoveFileEntry, fail);
	            }

	            function fsFail(error) {
	                alert("failed with error code: " + error.code);
	            }

	            function gotRemoveFileEntry(fileEntry) {
	                // TODO test this over iOS since ios can manage fileEntry different than Android
	                var fileName = fileEntry.fullPath.replace("//", "").split("/")[1];
	                fileEntry.remove(success(fileName), fail);
	            }

	            function success(filename) {
	                defer.resolve(filename);
	                console.log("Removal succeeded");
	            }

	            function fail(error) {
	                defer.resolve(null);
	                console.log("Error removing file: " + error.code);
	            }

	            return defer.promise;
	        },

	        saveImage: function (imageURI) {
	            var defer = $q.defer();
	            function gotFileEntry(fileEntry) {
	                var gotFileSystem = function (fileSystem) {
	                    var fileName;
	                    fileSystem.root.getDirectory('TechTalk', {
	                        create: true
	                    }, function (dataDir) {
	                        fileName = fileEntry.name;
	                        fileEntry.moveTo(dataDir, fileName, success, fsFail);
	                    }, dirFail);

	                };

	                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, fsFail);
	            }

	            // resolve file system for image
	            window.resolveLocalFileSystemURL(imageURI, gotFileEntry, fsFail);

	            // file system fail
	            function fsFail(error) {
	                defer.resolve("error");
	                //alert("failed with error code: " + error.code);

	            };

	            function dirFail(error) {
	                defer.resolve("error");
	                //alert("Directory error code: " + error.code);

	            };

	            function success() {
	                defer.resolve("success");
	            };

	            return defer.promise;

	        }
	    };
	});