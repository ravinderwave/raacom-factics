/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  var soClean = angular.module('BlurAdmin.pages.gallery');
     // .controller('GalleryCtrl', GalleryCtrl);

  /** @ngInject */
  soClean.controller('GalleryCtrl', ['$scope', '$http', function ($scope, $http) {
            
            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            }
            var data = JSON.stringify({
                "apiKey":"asdasdasdasdasda",
                "command":"existingCases",
                "action":"existingCases",
                "entity": "gallery",
                "viewData":{
                   "fieldSet":{
                      "galleryID":"WatchList"
                   },
                   "whereFieldset":[
                   ],
                   "paging":{
                      "Offset":0,
                      "Limit":10
                   }
                }
            });

            $http.post('http://raacom-factics-api.com/gallery', data, config).
            then(function(response) {
              //console.log(response.data);
                $scope.records=response.data
                //return $scope.result = response.data;
            }); 
            
         //to delete a case 
        $scope.removeGallery = function(caseId){
            
            var jsons=JSON.stringify({ 
              apiKey:"445dcfa295847ebbb77011ab264b4aa9",
              command:"Delete",
              lang:"en",
              deviceId:"en2",
              viewData:{
                fieldSet:{
                   caseID:caseId
                },
                whereFieldset:[
                ],
                paging:{
                   Offset:0,
                   Limit:10
                }
             }
          })
          
          //console.log(jsons);
  
          var onSuccess = function (data, status, headers, config) {
            
                location.reload();
            
          };
  
          var onError = function (data, status, headers, config) {
            location.reload();
          }
  
         $http.post('http://raacom-factics-api.com/gallery', jsons)
              .success(onSuccess)
              .error(onError);
  
      
  
        }
        
        $scope.updateGallery = function(user){
            
            $scope.originalCase = {
                caseID: '',
                name: '',
                gallery: 'WatchList',
                property: '',
                image: '',
            };
            
            $scope.uploadFile = function(files) {
                //console.log(files[0]);
                var reader = new FileReader();
                reader.onload = function (e) {
                    $scope.image=e.target.result;

                };
                reader.readAsDataURL(files[0]);
            }
            
            $scope.case = angular.copy($scope.originalCase);
            
            var jsons=JSON.stringify({ 
                apiKey:"445dcfa295847ebbb77011ab264b4aa9",
                command:"Insert",
                lang:"en",
                deviceId:"en2",
                viewData:{
                    fieldSet:{
                        caseID:$scope.caseID,
                        properties:{
                            values:[
                                {
                                    name:"gallery",
                                    value:"WatchList"
                                },
                                {
                                    name:"name",
                                    value:user.name
                                },
                                {
                                    name:"userdefined",
                                    value:user.property
                                }
                            ]
                        }
                    },
                    whereFieldSet:{
                        caseId:$scope.caseID,
                        imgSet:{
                          images:{
                            binaryImg:user.image
                          }
                        },
                        authName:'factics'
                    },
                    paging:{
                        Offset:0,
                        Limit:10
                    }
                }
            })
            
            console.log(jsons);
        }

  }]);
  
  angular.module('BlurAdmin.pages.gallery')
    .controller('ModalsPageCtrl', ModalsPageCtrl);

  /** @ngInject */
  function ModalsPageCtrl($scope, $uibModal, baProgressModal) {
    $scope.open = function (page, size) {
      $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };
    $scope.openProgressDialog = baProgressModal.open;
  }
  
  angular.module('BlurAdmin.pages.gallery')
    .controller('GalleryListCtrl', GalleryListCtrl);

  /** @ngInject */
  function GalleryListCtrl($scope, $http) {
        var config = {
            headers : {
                'Content-Type': 'application/json;'
            }
        }
        var data = JSON.stringify({
            "apiKey":"445dcfa295847ebbb77011ab264b4aa9",
            "command":"Insert",
            "lang":"en",
            "deviceId":"en",
            "viewData":{
               "fieldSet":{
                 "name":"Test"
               },
               "whereFieldset":[
               ],
               "paging":{
                  "Offset":0,
                  "Limit":10
               }
            }
        });
        
        $http.get('http://raacom-factics-api.com/galleryList', data, config).
        then(function(response) {
           // console.log(response.data);
            $scope.list=response.data;
        });
        
        $scope.selectTab = function(id){
            
            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            }
            var data = JSON.stringify({
                "apiKey":"asdasdasdasdasda",
                "command":"existingCases",
                "action":"existingCases",
                "entity": "gallery",
                "viewData":{
                   "fieldSet":{
                      "galleryID":id
                   },
                   "whereFieldset":[
                   ],
                   "paging":{
                      "Offset":0,
                      "Limit":10
                   }
                }
            });
            
            $http.post('http://raacom-factics-api.com/gallery', data, config).
            then(function(response) {
                $scope.records=response.data;
            }); 
        }
    }
})();
