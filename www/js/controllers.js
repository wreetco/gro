angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Plants) {
  $scope.plants = Plants.all($scope);
})

.controller('NotificationsCtrl', function($scope, Notifications) {
  Notifications.all().then(function(notifications) {
    console.log('promise');
    console.log(notifications);
    $scope.notifications = notifications;
  });
	 
	// update view
  $scope.refresh = function($scope) {
    Notifications.all().then(function(notifications) {
      console.log('promise');
      console.log(notifications);
      $scope.notifications = notifications;
    });
    
    $scope.$broadcast('scroll.refreshComplete');
	}	
  // delete a notification
  $scope.remove = function(notification) {
    Notifications.remove(notification);
  } // end remove method

}) // end notifications controller

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
  $scope.notes = Notes.all($scope);

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
  $scope.note = Notes.get($scope, $stateParams.note_id);
}) // end the notviewctrl

// plants controllers
.controller('PlantsCtrl', function($scope, $state, Plants, Camera) {
  $scope.plants = Plants.all($scope);

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
  Plants.get($stateParams.plant_id).then(function(plant) {
    $scope.plant = plant;
  });
}) // end the plantviewctrl

// equipment view controller
.controller('EquipmentCtrl', function($scope, Equipment) {
  $scope.equipment = Equipment.all($scope);
	 
	// update view
  $scope.refresh = function($scope) {
    $scope.equipment = Equipment.all($scope);
    $scope.$broadcast('scroll.refreshComplete');
	}	
  // delete a notification
  $scope.remove = function(equipment) {
    Equipment.remove(equipment);
  } // end remove method
})
// end the equipment view controller
.controller('EquipmentViewCtrl', function($scope, $stateParams, Equipment) {
  $scope.equipment = Equipment.get($scope, $stateParams.equipment_id);
  
  $scope.lol = function() {
    console.log('equipment is');
    console.log($scope.equipment)
  }
}) // end the plantviewctrl


;
