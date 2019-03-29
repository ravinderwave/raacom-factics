//1. create app module 
var addApp = angular.module('BlurAdmin.pages.gallery');

//2. create controller
addApp.controller("AddCtrl", function ($scope, $http,$rootScope) {
    //3. attach originalStudent model object
    $scope.originalCase = {
        caseID: '',
        name: '',
        gallery: $rootScope.galleryID,
        property: '',
        image: '',
    };
    
    $scope.uploadFile = function(files) {
        //console.log(files[0]);
        var reader = new FileReader();
        reader.onload = function (e) {
            //$('#falseinput').attr('src', e.target.result);
            $scope.image=e.target.result;
           
        };
        reader.readAsDataURL(files[0]);
    }
    
    //4. copy originalStudent to student. student will be bind to a form 
    $scope.case = angular.copy($scope.originalCase);

    $scope.caseExist=function(myCaseId){
        console.log(myCaseId);
        var jsons=JSON.stringify({
            "apiKey":"asdasdasdasdasda",
            "command":"caseExist",
            "entity": "gallery",
            "viewData":{
               "fieldSet":{
                  "caseID":myCaseId
               },
               "whereFieldset":[
               ],
               "paging":{
                  "Offset":0,
                  "Limit":10
               }
            }
         });
         console.log(jsons);
         $http.post('http://raacom-factics-api.com/gallery', jsons)
            .then(function(response){
                var data=response.data
                if(data.exists==true){
                    console.log(data.exists);
                    $scope.myCaseExistStatus='The case id already exist. Please use another id';
                }else{
                    $scope.myCaseExistStatus='';
                }
            });

    }

    //5. create submitStudentForm() function. This will be called when user submits the form
    $scope.submitAddForm = function () {
        //console.log($scope.caseID);
        var command='addCase';
        if($scope.caseID){
            command='Insert';
        }
        var jsons=JSON.stringify({ 
            apiKey:"445dcfa295847ebbb77011ab264b4aa9",
            command:command,
            lang:"en",
            deviceId:"en2",
            viewData:{
                fieldSet:{
                    caseID:$scope.caseID,
                    properties:{
                        values:[
                            {
                                name:"gallery",
                                value:$rootScope.galleryID
                            },
                            {
                                name:"name",
                                value:$scope.nameCase
                            },
                            {
                                name:"userdefined",
                                value:$scope.property
                            }
                        ]
                    }
                },
                whereFieldSet:{
                    caseId:$scope.caseID,
                    imgSet:{
                      images:{
                        binaryImg:$scope.image
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

        var onSuccess = function (data, status, headers, config) {
          
              location.reload();
          
        };

        var onError = function (data, status, headers, config) {
           console.log(data);
           console.log(status);
        }

       $http.post('http://raacom-factics-api.com/gallery', jsons)
            .success(onSuccess)
            .error(onError);

    };

    
    //6. create resetForm() function. This will be called on Reset button click.  
    $scope.resetForm = function () {
        $scope.student = angular.copy($scope.OriginalStudent);
    };
});
