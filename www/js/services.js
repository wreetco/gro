angular.module('starter.services', [])

.factory('Notifications', function($http, $q) {
  // Might use a resource here that returns a JSON array
  return {
    all: function(grow_id) {
      // get all of it
			// make a promise
      var d = $q.defer();
			if (!grow_id) {
				d.resolve('not ready to get notifications');
				return d.promise;
			}
      console.log('Notifications.all');
      console.log('gid: ' + grow_id);
      // get the data
			$http.get('https://grast.wreet.co/' + grow_id + '/notifications').success(function(data, status) {
				d.resolve(data);
    	});
    	// return to the promise
    	return d.promise;
  	},
    remove: function(grow_id, notification) {
      var d = $q.defer();
      $http.delete('https://grast.wreet.co/' + grow_id + '/notifications/' + notification._id.$oid).success(function(data, status) {
        console.log('resuleving the promise brah');
        d.resolve(data);
      });
      return d.promise;
    }
	}
})

// notes factory yall
.factory('Notes', function($q, $http) {

  return {
    all: function(grow_id) {
      console.log('Notes.all');
      var d = $q.defer();
      $http.get('https://grast.wreet.co/' + grow_id + '/notes').success(function(data, status) {
        d.resolve(data);
    	});
      return d.promise;
    },
    remove: function(grow_id, note) {
      console.log('note.remove');
      console.log(note);
      var d = $q.defer();
      $http.delete("https://grast.wreet.co/" + grow_id + "/notes/" + note._id.$oid).success(function(data, status) {
        console.log('we got all up in that block so whoa');
        d.resolve(data);
      });
      return d.promise;
    },
    get: function($scope, grow_id, note_id) {
      $http.get("https://grast.wreet.co/" + grow_id + "/notes").success(function(data, status) {
        for (var i = 0; i < data.length; i++) {
          if (data[i]._id.$oid == note_id) {
            $scope.note = data[i];
          }
        }
      });
    },
    save: function(grow_id, note) {
      var d = $q.defer();
      // post the note

      var req = JSON.stringify({
        "note": note
      });

      console.log('note');
      console.log(req);

      $http.post("https://grast.wreet.co/" + grow_id + "/notes/add", req).success(function(data, status) {
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
    all: function($scope, grow_id) {
			var d = $q.defer();
      $http.get("https://grast.wreet.co/" + grow_id + "/plants").success(function(data, status) {
        var plants = [];
        var plants_noformat = [];
        var row = [];
        for (var i = 0; i < data.length; i++) {		
          plants_noformat.push(data[i]);
          if (i == data.length - 1) {
            row.push(data[i]);
            plants.push(row);
            break;
          }
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
					$scope.plants = plants;
					$scope.plants_noformat = plants_noformat;
					d.resolve(plants_noformat);
        }); // end get notifications
      });
			return d.promise;
    }, // end all method

    remove: function(grow_id, plant_id) {
      console.log('Plants.remove');
      var d = $q.defer();
      // do the delete
      $http.delete("https://grast.wreet.co/" + grow_id + "/plants/" + plant_id).success(function(data, status) {
        console.log('deleted plant');
        d.resolve(data);
      });
      // give the promise back
      return d.promise;
    },
    get: function(grow_id, plant_id) {
      console.log('s.Plants.get');
      var d = $q.defer();
      var plant;
      $http.get("https://grast.wreet.co/" + grow_id + "/plants/" + plant_id).success(function(data, status) {
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

    save: function(grow_id, plant) {
      var d = $q.defer();
      // post the plant

      var req = JSON.stringify({
        "plant": plant
      });

      $http.post("https://grast.wreet.co/" + grow_id + "/plants/add", req).success(function(data, status) {
        console.log(data);
        d.resolve(data);
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

// equipment factory yall
.factory('Equipment', function($q, $http) {
	return {
    all: function($scope, grow_id) {
      $http.get('https://grast.wreet.co/' + grow_id + '/equipment').success(function(data, status) {
  			$scope.equipment = data;
  			console.log('we did it, hopefully');
  			console.log(data);
    	});
    },

		remove: function(grow_id, equipment_id) {
    	console.log('Equipment.remove');
    	var d = $q.defer();
    	// do the delete
     	$http.delete("https://grast.wreet.co/" + grow_id + "/equipment/" + equipment_id).success(function(data, status) {
				console.log('we got all up in that block so whoa');
       	d.resolve(data);
     	});
     	// give the promise back
     	return d.promise;
   	},

    get: function($scope, grow_id, equipment_id) {
      $http.get('https://grast.wreet.co/' + grow_id + '/equipment/' + equipment_id).success(function(data, status) {
      	$scope.equipment = data;
      });
    },
    save: function(grow_id, equipment) {
      var d = $q.defer();
      // post the note
      /*
      $timeout(function() {
        d.resolve('sup brad');
      }, 2000)
      */
      var req = JSON.stringify({
        "equipment": equipment
      });

      console.log('equipment');
      console.log(req);

      $http.post('https://grast.wreet.co/' + grow_id + '/equipment/add', req).success(function(data, status) {
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


// journals
.factory('Journals', function($http, $q) {

  return {
    all: function() {

  	}, // end all

  	getPlantJournals: function(grow_id, plant_id) {
  	  var d = $q.defer();
  	  $http.get('https://grast.wreet.co/' + grow_id + '/' + plant_id + "/journals").success(function(data, status) {
  	    d.resolve(data);
  	  });
  	  return d.promise;
  	}, // end getPlantJournals

    addJournalPhoto: function(grow_id, plant_id, j_id, path) {
      var d = $q.defer();
      var url = "https://grast.wreet.co/" + grow_id + "/" + plant_id + "/journals/" + j_id + "/add_photo";

      var options = new FileUploadOptions();
      options.fileKey = "brad";
      options.fileName = j_id + Math.floor((Math.random() * 100000) + 1);
      options.mimeType = "text/plain";

      var fail = function(e){console.log('Journals.addJournalPhoto: could not add photo' + e);};
      var ft = new FileTransfer();
      ft.upload(path, url,
      function(res) {
        d.resolve(res);
      },
      fail, options);

      return d.promise;
    } // end addJournalPhoto method


	} // end return
})
// end journals

// session service taken from 'Owen' http://stackoverflow.com/users/1933263/owen
.service('SessionService', [function () {
  var localStoreAvailable = typeof (Storage) !== "undefined";
  this.store = function (name, details) {
    console.log("SessionService.store: " + name + ", " + details);
    if (localStoreAvailable) {
      if (angular.isUndefined(details)) {
        details = null;
      } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
        details = angular.toJson(details);
      };
      sessionStorage.setItem(name, details);
    } else {
      //$cookieStore.put(name, details);
    };
  };

  this.persist = function(name, details) {
    if (localStoreAvailable) {
      if (angular.isUndefined(details)) {
        details = null;
      } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
        details = angular.toJson(details);
      };
      localStorage.setItem(name, details);
    } else {
      //$cookieStore.put(name, details);
    }
  };

  this.get = function (name) {
    if (localStoreAvailable) {
      return getItem(name);
    } else {
      //return $cookieStore.get(name);
    }
  };

  this.destroy = function (name) {
    if (localStoreAvailable) {
      localStorage.removeItem(name);
      sessionStorage.removeItem(name);
    } else {
      //$cookieStore.remove(name);
    };
  };

  var getItem = function (name) {
    var data;
    var localData = localStorage.getItem(name);
    var sessionData = sessionStorage.getItem(name);

    if (sessionData) {
      data = sessionData;
    } else if (localData) {
      data = localData;
    } else {
      return null;
    }

    if (data === '[object Object]') { return null; };
    if (!data.length || data === 'null') { return null; };

    if (data.charAt(0) === "{" || data.charAt(0) === "[" || angular.isNumber(data)) {
      return angular.fromJson(data);
    };

    return data;
  };
  return this;
}])
// end session storage

// modal factory
.factory('ModalService', function($ionicModal, $q) {

  return {
    // make a nice modal for the scope
    getModal: function($scope, template_url) {
      var d = $q.defer();
      $ionicModal.fromTemplateUrl(template_url, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        d.resolve($scope.modal);
      });
      return d.promise;
    }// end getModal method
	} // end return
})
// end modal area

.factory('PopupService', function($ionicPopup, $q) {
  return {
    confirm: function(ptitle, template_string) {
      var popup = $ionicPopup.confirm({
        title: ptitle,
        template: template_string
      });
      return popup;
    }, // end confirm method
  	alert: function(ptitle, template_string) {
			var popup = $ionicPopup.alert({
				title: ptitle,
				template: template_string
			});
			return popup;
		}
	} // end that return brardbrah
}) // end popup service

// equipment factory yall
.factory('Schedule', function($q, $http) {
	return {
    all: function($scope, grow_id) {
      $http.get('https://grast.wreet.co/' + grow_id + '/events').success(function(data, status) {
  			$scope.schedule = data;
  			console.log('we did it, hopefully');
  			console.log(data);
    	});
    },

		remove: function(grow_id, schedule_id) {
    	console.log('Schedule.remove');
    	var d = $q.defer();
    	// do the delete
     	$http.delete("https://grast.wreet.co/" + grow_id + "/events/" + schedule_id).success(function(data, status) {
				console.log('we got all up in that block so whoa');
       	d.resolve(data);
     	});
     	// give the promise back
     	return d.promise;
   	},

    get: function($scope, grow_id, schedule_id) {
      $http.get('https://grast.wreet.co/' + grow_id + '/events/' + schedule_id).success(function(data, status) {
      	$scope.schedule = data;
      });
    },
		//UIFASHNIUASNDFAUIHFOIANFOIASNIOCNASIODNAJBD JIAB CJIKASBNCJKAISN JKCBA SJK
    save: function(grow_id, schedule) {
      var d = $q.defer();

      var req = JSON.stringify({
        "schedule": schedule
      });

      console.log('schedule');
      console.log(req);

      $http.post('https://grast.wreet.co/' + grow_id + '/events/add', req).success(function(data, status) {
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

// end it
;
