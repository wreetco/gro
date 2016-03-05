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

.controller('AccountCtrl', function($scope) {
  // handle the grow key setting

}) // end accountctrl

.controller('ScheduleCtrl', function($scope) {
  // scheduling control

}) // end schedulectrl

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
.controller('PlantsCtrl', function($scope, $state, Plants, Camera, Journals) {
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
  $scope.new_plant = {images: []};
  $scope.savePlant = function() {
    console.log('newplant');
    console.log($scope.new_plant);
    /*Plants.save($scope.new_plant).then(function(res) {
      console.log(res);
      $state.go('tab.plants');
    });
    */

    for (var b = 0; b < $scope.new_plant.images.length; b++) {
      Journals.addJournalPhoto(0, $scope.new_plant.images[b]).then(function(res) {
        console.log('from the journal fucked up thing in the controller');
        console.log(res);
      });
    } // end image iteration

  } // end savePlant

  // plants need a photo
  $scope.takePhoto = function(brad_index) {
    var options = {
      quality : 75,
      targetWidth: 1920,
      targetHeight: 1080,
    };
    Camera.getPicture(options).then(function(img_url) {
      var image = document.getElementById('brad[' + brad_index + ']');
      image.src = img_url;
      // put it in the array
      $scope.new_plant.images.push(img_url);
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
