services.factory('homeModel', function ($q, $timeout) {

    var items = [
		{
		    "name": "cebolla",
		    "vitamina": "vitamina C"
		},
		{
		    "name": "papaya",
		    "vitamina": "vitamina C"
		},
		{
		    "name": "sandia",
		    "vitamina": "vitamina C"
		}
    ];

    var getItems = function () {
        var defer = $q.defer();

        //if (Math.floor(Math.random()*10) % 2 == 1) {
        defer.resolve(items);
        /*} else {
			defer.reject('No Items');
		}*/

        return defer.promise;
    };

    return {
        returnItems: getItems
    }

});