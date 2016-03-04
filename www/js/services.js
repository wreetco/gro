angular.module('starter.services', [])

.factory('Notifications', function($http, $q) {
  // Might use a resource here that returns a JSON array
  return {
    all: function() {
      console.log('s.Notifications.all');
      // make a promise 
      var d = $q.defer();
      // get the data
			$http.get('https://grast.wreet.co/56b55a2de449852a75000000/notifications').success(function(data, status) {
				d.resolve(data);
    	});
    	// return to the promise
    	return d.promise;
  	},
    remove: function($scope, notification) {
      notifications.splice(notifications.indexOf(notification), 1);
    }
	}
})

// notes factory yall
.factory('Notes', function($q, $http) {

  return {
    all: function($scope) {
      $http.get('https://grast.wreet.co/56b55a2de449852a75000000/notes').success(function(data, status) {
  			$scope.notes = data;
  			console.log('we did it, hopefully');
  			console.log(data);
    	});
    },
    remove: function(note) {
      notes.splice(notes.indexOf(note), 1);
    },
    get: function($scope, note_id) {
      $http.get("https://grast.wreet.co/56b55a2de449852a75000000/notes").success(function(data, status) {
        for (var i = 0; i < data.length; i++) {
          if (data[i]._id.$oid == note_id) {
            $scope.note = data[i];
          }
        }
      });
    },
    save: function(note) {
      var d = $q.defer();
      // post the note
      /*
      $timeout(function() {
        d.resolve('sup brad');
      }, 2000)
      */
      var req = JSON.stringify({
        "note": note
      });

      console.log('note');
      console.log(req);

      $http.post("http://192.168.1.140:4567/567893cec6f3605725000001/notes/add", req).success(function(data, status) {
        d.resolve({
          "data": data,
          "status": status
        });
      }); // end note post

      // send back the promise
      return d.promise;
    } // end save method
  }

})
// end it

// plants factory yall
.factory('Plants', function($q, $http, Notifications) {

  return {
    all: function($scope) {
      $http.get("https://grast.wreet.co/56b55a2de449852a75000000/plants").success(function(data, status) {
        var plants = [];
        var plants_noformat = [];
        var row = [];
        for (var i = 0; i < data.length; i++) {
          plants_noformat.push(data[i]);
          if (i % 2 != 0) {
            row.push(data[i]);
            plants.push(row);
            row = [];
          }
          else {
            row.push(data[i]);
          }
        }
        // now that we have a list of plants lets get the notifications for each
        Notifications.all().then(function(notifications) {
          // we need to go through each plant, and collect their notifications 
          console.log(notifications);
          for (plant of plants_noformat) {
            // each one needs an array of them
            plant.notifications = [];
            for (n of notifications) {
              if (!n.plant_id)
                continue;
              if (n.plant_id.$oid === plant._id.$oid) 
                plant.notifications.push(n);
              // done 
            }
          } // end plant iteration
        }); // end get notifications
        $scope.plants = plants;
        console.log('dfd');
      });
    }, // end all method
    
    remove: function(plant) {
      plants.splice(plants.indexOf(plant), 1);
    },
    get: function(plant_id) {
      console.log('s.Plants.get');
      var d = $q.defer();
      var plant;
      $http.get("https://grast.wreet.co/56b55a2de449852a75000000/plants/" + plant_id).success(function(data, status) {
        Notifications.all().then(function(notifications) {
          // we need to go through each plant, and collect their notifications 
          data.notifications = [];
          for (n of notifications) {
            if (!n.plant_id)
              continue;
            if (n.plant_id.$oid == plant_id) 
              data.notifications.push(n);
            // done 
          }

        }); // end get notifications
        d.resolve(data);
      });
      return d.promise;
    },
    
    save: function(plant) {
      var d = $q.defer();
      // post the plant
      /*
      $timeout(function() {
        d.resolve('sup brad');
      }, 2000)
      */
      var req = JSON.stringify({
        "plant": plant
      });

      console.log('plant');
      console.log(req);

      $http.post("http://192.168.1.140:4567/567893cec6f3605725000001/plants/add", req).success(function(data, status) {
        console.log(data);
      }); // end note post


      // send back the promise
      return d.promise;
    } // end save
  }

}) // end plants service

.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      return q.promise;
    }
  }
}])

// journals 
.factory('Journals', function($http, $q) {
  
  return {
    all: function() {

  	}, // end all
  	
  	getPlantJournals: function(plant_id) {
  	  var d = $q.defer();
  	  $http.get("https://grast.wreet.co/56b55a2de449852a75000000/" + plant_id + "/journals").success(function(data, status) {
  	    d.resolve(data);
  	  });
  	  return d.promise;
  	} // end getPlantJournals
	} // end return
})
// end journals




// end it
;
