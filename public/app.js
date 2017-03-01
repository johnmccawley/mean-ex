// public/app.js
var helloTaskList = angular.module('helloTaskList', [])

  .controller('MainCtrl', function ($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all tasks and show them
    $http.get('/api/tasks')
      .then(
          function(data){
            // success callback
            $scope.tasks = data;
            console.log(data);
          }, 
          function(data){
            // failure call back
            console.log('Error: ' + data);
          }
       );
    
    // when submitting the add form, send the text to the node API 
    $scope.createTask = function() {
        $http.post('/api/tasks', $scope.formData)
            .then(
                function(data) {
                  $scope.formData = {}; // clear the form so our user is ready to enter another
                  $scope.tasks = data;
                  console.log(data);
                },
                function(data) {
                  console.log('Error: ' + data);
                }
            );
    };

    // delete a task after checking it
    $scope.deleteTask = function(id) {
      $http.delete('/api/tasks/' + id)
         .then(
             function(data){
               // success callback
               $scope.tasks = data;
                console.log(data);
             }, 
             function(response){
               // failure call back
               console.log('Error: ' + data);
             }
         );
    };
  }
