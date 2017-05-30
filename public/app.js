var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "views/home.html"
    })
    .when("/login", {
        templateUrl : "views/login.html",
        controller: "LoginController"
    })
    .when("/register", {
        templateUrl : "views/register.html",
        controller: "RegisterController"
    })
    .when("/profile", {
        templateUrl : "views/profile.html",
        controller: "ProfileController"
    })

});

app.factory('UserData', function(){
  var user = {}
  return {
    setUser: setUser,
    getUser: getUser
  }
  function setUser(user) {
    this.user = user;
  }
  function getUser() {
    return this.user;
  }
})

app.controller("LoginController", function($scope, $http, $location, UserData) {
    $scope.user = {};
    $scope.token = "";

    $scope.loginUser = function() {
      var userInfo = {
        username: $scope.user.username,
        password: $scope.user.password
      }
      $http({
        method : "POST",
        url : "users/login",
        data: userInfo
      }).then(function mySuccess(response) {
          data = response.data;
          $scope.token = data.token
          $http({
            method: "GET",
            url: "users/profile",
            headers: {
              'x-access-token': $scope.token
            }
          }).then(function(response){
            UserData.setUser(response.data)
            $location.path("profile");
          })
      }, function myError(response) {
          $scope.message = response.statusText;
          console.log("Login not successful");
      });
    }
});

app.controller('ProfileController', function($scope, $http, UserData){
  $scope.profile = UserData.getUser()
  console.log($scope.profile);

})

app.controller('RegisterController', function($scope, $http){

      $scope.user = {};

      $scope.registerUser = function() {
        var userData = {
          username: $scope.user.username,
          password: $scope.user.password,
          email: $scope.user.email,
          dob: $scope.user.dob,
          status: $scope.user.status
        }
        $http({
          method : "POST",
          url : "users/register",
          data: userData
        }).then(function mySuccess(response) {
            responseData = response.data;
            console.log(responseData);
        }, function myError(response) {
            $scope.message = response.statusText;
            console.log("Login not successful");
        });

      }
})
