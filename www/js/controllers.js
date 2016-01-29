angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Plants) {
  $scope.plants = Plants.all();
})

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
.controller('NotesCtrl', function($scope, $state, Notes) {
  $scope.notes = Notes.all();

  $scope.remove = function(note) {
    Notes.remove(note);
  } // end remove

  $scope.new_note = {};
  $scope.saveNote = function(note) {
    Notes.save($scope.new_note).then(function(res) {
      console.log('from the then');
      console.log(res);
    });
  } // end save

}) // end notesCtrl

// note view control
.controller('NoteViewCtrl', function($scope, $stateParams, Notes) {
  $scope.note = Notes.get($stateParams.note_id);
}) // end the notviewctrl

// plants controllers
.controller('PlantsCtrl', function($scope, $state, Plants, Camera) {
  $scope.plants = Plants.all();

  // update view
  $scope.refresh = function() {
    $scope.plants = Plants.all();
    $scope.$broadcast('scroll.refreshComplete');
  }

  // delete a plant
  $scope.remove = function(plant) {
    Plants.remove(plant);
  } // end remove method

  // add a plant
  $scope.new_plant = {};
  $scope.savePlant = function() {
    Plants.save($scope.new_plant).then(function(res) {
      console.log('from the then');
      console.log(res);
      $state.go('tab.plants');
    });
  }

  // plants need a photo
  $scope.takePhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  } // end take photo


}) // end plantsctrl

// plant view control
.controller('PlantViewCtrl', function($scope, $stateParams, Plants) {
  $scope.plant = Plants.get($stateParams.plant_id);
}) // end the plantviewctrl

// equipment view controller
.controller('EquipmentViewCtrl', function($scope) {
  
})
// end the equipment view controller



;
