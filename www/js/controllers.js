angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('NotificationsCtrl', function($scope, Notifications) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});



  $scope.notifications = Notifications.all();
  $scope.remove = function(notification) {
    Notifications.remove(notification);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

// notes shizznit
.controller('NotesCtrl', function($scope, Notes) {
  $scope.notes = Notes.all();

  $scope.remove = function(note) {
    Notes.remove(note);
  }

}) // end notesCtrl

// note view control
.controller('NoteViewCtrl', function($scope, $stateParams, Notes) {
  $scope.note = Notes.get($stateParams.note_id);
}) // end the notviewctrl

// plants controllers
.controller('PlantsCtrl', function($scope, Plants) {
  $scope.plants = Plants.all();

  $scope.remove = function(plant) {
    Plants.remove(plant);
  }

}) // end plantsctrl

// plant view control
.controller('PlantViewCtrl', function($scope, $stateParams, Plants) {
  $scope.plant = Plants.get($stateParams.plant_id);
}) // end the plantviewctrl


;
