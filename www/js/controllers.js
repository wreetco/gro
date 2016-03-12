angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Plants, SessionService) {
  SessionService.store('grow_id', '56e32ac8e4498504a5000000');
  $scope.plants = Plants.all($scope, SessionService.get('grow_id'));
})

.controller('NotificationsCtrl', function($scope, Notifications, SessionService) {
  Notifications.all(SessionService.get('grow_id')).then(function(notifications) {
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
.controller('NotesCtrl', function($scope, $state, Notes, SessionService) {
  // do them, do them now
  Notes.all(SessionService.get('grow_id')).then(function(res) {
    $scope.notes = res;
  });

  $scope.remove = function(note) {
    Notes.remove(note);
  } // end remove

  $scope.new_note = {};
  $scope.saveNote = function(note) {
    Notes.save(SessionService.get('grow_id'), $scope.new_note).then(function(res) {
      console.log('NotesCtrl.saveNote');
      console.log(res);
    });
  } // end save

}) // end notesCtrl

// note view control
.controller('NoteViewCtrl', function($scope, $stateParams, Notes, SessionService) {
  $scope.note = Notes.get($scope, SessionService.get('grow_id'), $stateParams.note_id);
}) // end the notviewctrl

// plants controllers
.controller('PlantsCtrl', function($scope, $state, Plants, Camera, Journals, SessionService) {
  $scope.plants = Plants.all($scope, SessionService.get('grow_id'));
  // update view
  $scope.refresh = function() {
    $scope.plants = Plants.all($scope, SessionService.get('grow_id'));
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
    Plants.save(SessionService.get('grow_id'), $scope.new_plant).then(function(res) {
      console.log(res);
      for (var b = 0; b < $scope.new_plant.images.length; b++) {
        Journals.addJournalPhoto(SessionService.get('grow_id'), res.plant_id, res.journal_id, $scope.new_plant.images[b]).then(function(res) {
          console.log('from the journal fucked up thing in the controller');
          console.log(res);
        });
      } // end image iteration
    });
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

  $scope.range = function(n) {
    return new Array(n);
  };

}) // end plantsctrl

// plant view control
.controller('PlantViewCtrl', function($scope, $stateParams, Plants, SessionService) {
  Plants.get(SessionService.get('grow_id'), $stateParams.plant_id).then(function(plant) {
    console.log(plant);
    $scope.plant = plant;
  });
}) // end the plantviewctrl

// equipment view controller
.controller('EquipmentCtrl', function($scope, Equipment, SessionService) {
  $scope.equipment = Equipment.all($scope, SessionService.get('grow_id'));

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
