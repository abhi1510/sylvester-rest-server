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
    .when("/update", {
        templateUrl : "views/update.html",
        controller: "UpdateController"
    })

});

app.factory('UserData', function(){
  var user = {}
  var token = ""
  return {
    setUser: setUser,
    getUser: getUser,
    setToken: setToken,
    getToken: getToken
  }
  function setUser(user) {
    this.user = user;
  }
  function getUser() {
    return this.user;
  }
  function setToken(token) {
    this.token = token;
  }
  function getToken() {
    return this.token;
  }
})

app.controller("LoginController", function($scope, $http, $location, UserData) {
    $scope.user = {};

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
          UserData.setToken(data.token)          
          $http({
            method: "GET",
            url: "users/profile",
            headers: {
              'x-access-token': UserData.getToken()
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

app.controller('ProfileController', function($scope, $http, $location, UserData){
  $scope.profile = UserData.getUser()
  console.log($scope.profile);
  $scope.goHome = function() {
    $location.path('/')
  }
  $scope.updateUserProfile = function() {
    $location.path('update')
  }

})

app.controller('UpdateController', function($scope, $http, $location, UserData){

  $scope.user = UserData.getUser()
  $message = ""

  $scope.goHome = function() {
    $location.path('/')
  }
  $scope.updateUser = function() {
    userData = {
      username: $scope.user.username,
      password: $scope.user.password,
      email: $scope.user.email,
      dob: $scope.user.dob,
      status: $scope.user.status      
    }
    typeof(userData.dob)
    $http({
          method : "PUT",
          url : "users/update",
          data: userData,
          headers: {
              'x-access-token': UserData.getToken()
            }
        }).then(function mySuccess(response) {
            $message = response.data;                       
        }, function myError(response) {
            $scope.message = response.statusText;
        });
  }

})

app.controller('RegisterController', function($scope, $http, $location, UserData){

      $scope.user = {};
      $message = ""

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
            $scope.message = response.data;
            $scope.profile = UserData.setUser(userData)
            $location.path("profile");            

        }, function myError(response) {
            $scope.message = response.statusText;
        });

      }
})
