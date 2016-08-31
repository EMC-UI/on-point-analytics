'use strict';

angular.module('app', ['ngMessages'])
    .run(['$rootScope', "$interval", function($rootScope, $interval) {
        $rootScope.view = 0;

        $rootScope.views = [
            {id: 0, name: 'EmcWorld'},
            {id: 1, name: 'VmWorld'},
            {id: 0, name: 'Flash'},
            {id: 1, name: 'VCloud'},
            {id: 0, name: 'Avamar'},
            {id: 1, name: 'VCenter'},
        ];
    }])

    .controller('mainCtrl', ['$scope', '$http', '$rootScope', '$interval', function ($scope, $http, $rootScope, $interval) {

        $scope.setView = function(e) {
            $rootScope.view = e;
        };

        $scope.widgetModeActive = 1;
        $scope.widgetMode = [
                    {id: 0, name: "Auto"},
                    {id: 1, name: "Click"}
                ];

        $scope.prevDays = {
            availableOptions: [
                {days: 1, name: "Last 24 Hours"},
                {days: 7, name: "Last 7 Days"},
                {days: 14, name: "Last 14 Days"},
                {days: 30, name: "Last 30 Days"}
            ],
            selectedOption: {days: 7, name: "Last 7 Days"} //This sets the default value of the select in the ui
        };

        var startPresentation;
        $scope.$watch("widgetModeActive", function(newValue, oldValue){

            if($scope.widgetModeActive === 0) {
                startPresentation = $interval(function() {
                        switch ($rootScope.view) {
                            case 0: $rootScope.view = 1; break;
                            case 1: $rootScope.view = 0; break;
                            default: $rootScope.view = 0;
                        }
                    }, 5000);


            } else if ($scope.widgetModeActive === 1) {
                $interval.cancel(startPresentation);
                console.log("stopped!");

            }
        });

     }])

    .controller('TweetStatsCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.loadCounts = function() {
            console.log("About to invoke from app.js ");
            $scope.bothCount = 0;
            $scope.totalCount = 0
            $scope.emcWorldCount = 0 ;
            $scope.emcWorldPercentage = 0 ;
            $scope.vmWorldCount = 0;
            $scope.vmWorldPercentage = 0;
            $scope.flashCount = 0;
            $scope.flashPercentage = 0;
            $scope.vcloudCount = 0;
            $scope.vcloudPercentage = 0;
            $scope.avamarCount = 0;
            $scope.avamarPercentage = 0;
            $scope.vcenterCount = 0;
            $scope.vcenterPercentage = 0;


            $scope.resource = '/stats/tweetStats';
            $http.get($scope.resource).then( function(response) {
                $scope.bothCount = response.data.Both;
                $scope.totalCount = response.data.Total;
                $scope.emcWorldCount = response.data.EmcWorld;
                $scope.emcWorldPercentage = Math.round(($scope.emcWorldCount / $scope.totalCount) * 100);
                $scope.vmWorldCount = response.data.VmWorld;
                $scope.vmWorldPercentage = Math.round(($scope.vmWorldCount / $scope.totalCount) * 100);
                $scope.flashCount = response.data.Flash;
                $scope.flashPercentage = Math.round(($scope.flashCount / $scope.totalCount) * 100);
                $scope.vcloudCount = response.data.VCloud;
                $scope.vcloudPercentage = Math.round(($scope.vcloudCount / $scope.totalCount) * 100);
                $scope.avamarCount = response.data.Avamar;
                $scope.avamarPercentage = Math.round(($scope.avamarCount / $scope.totalCount) * 100);
                $scope.vcenterCount = response.data.VCenter;
                $scope.vcenterPercentage = Math.round(($scope.vcenterCount / $scope.totalCount) * 100);
            });
        };

        $scope.init = function() {
            $scope.loadCounts();
        };
        $scope.init();
    }
    ]);

// function vmCounts(obj) { return Object.keys("vmworld").length; }
// function emcCounts(obj) { return Object.keys("EMCWorld").length; }
// function countTerm(obj, term) { return Object.keys(term).length}
