var ArtistSearch = angular.module('ArtistSearch', ['ngMessages']);

ArtistSearch.service('SearchService', ['$q', '$http', function ($q, $http) {
    "use strict";
    this.getArtistData = function (name) {
        var err;
        var def = $q.defer();
        $http.get('api.php?artist=' + encodeURIComponent(name))
            .success(function (data) {
                def.resolve(data);
            })
            .error(function () {
                def.reject("Request Failed.");
            });
        return def.promise;
    };
}]);

ArtistSearch.controller('SearchController', ['$scope', 'SearchService', 
    function SearchController($scope, SearchService) {
    "use strict";
    $scope.artist = '';
    $scope.artistData = null;

    $scope.search = function () {
        SearchService.getArtistData($scope.artist)
            .then(function (response) {
                $scope.artistData = response.artists.items;
            }, function (response) {
                $scope.artistData = null;
                $scope.error = 'Search Failed.';
            });
    };
}]);