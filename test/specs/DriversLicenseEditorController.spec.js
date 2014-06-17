describe('Drivers License Editor tests', function() {
   var $scope, $location, $rootScope, createController, d;

   beforeEach(module('umbraco'));

   beforeEach(inject(function ($rootScope, $controller, angularHelper, dialogService, entityMocks, mocksUtils) {

        d = dialogService;

        //mock the scope mockdel
        $scope = $rootScope.$new();
        $scope.model = {
                        alias: "property",
                        label: "Drivers License Editor property",
                        description: "desc",
                        config: {},
                        value: {}
                      };

        //dialogservice mediaPicker expects a callback to return
        //we change that to mock the service in our test.
        dialogService.mediaPicker = function(options){
            options.callback({image:"hello.jpg", id: 1234});
        };              
                      
        //setup the controller for the test by setting its scope to
        //our mocked model
        createController = function() {
            return $controller('DriversLicenseEditorController', {
                '$scope': $scope
            });
        };
    }));

    it('model.value should be a valid license', function() {
        var controller = createController();
        
        //initially our model.value is not set
        expect($scope.model.value).not.toBeNull();
        
        $scope.setMonth("june");
        $scope.setYear(2010);

        expect($scope.model.value.month).toBe("june");
        expect($scope.model.value.year).toBe(2010);

        //then we pick the image
        $scope.pickImage();

        //I expect the controller to append sizing to the image
        expect($scope.model.value.image).toBe("hello.jpg?width=120&height=180&mode=crop");

        //I expect to store the media ID
        expect($scope.model.value.mediaId).toBe(1234);        
    });

    it('config should be set', function() {
        var controller = createController();
        
        //Our config should not be null
        expect($scope.model.config).not.toBeNull();
    
    });
});