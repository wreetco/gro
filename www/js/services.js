angular.module('starter.services', [])

.factory('Notifications', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var notifications = [
    {
      title: "PH",
      created_date: "12/19/15 3:21PM",
      text: "Bradhdadi Thunderfuck Kush PH low - 6.0"
    },
    {
      title: "Moisture",
      created_date: "12/18/15 11:19AM",
      text: "B-Rad Headband soil is dry"
    }
  ]

  return {
    all: function() {
      return notifications;
    },
    remove: function(notification) {
      notifications.splice(notifications.indexOf(notification), 1);
    },
    get: function(notificationId) {
      for (var i = 0; i < notifications.length; i++) {
        if (notifications[i].id === parseInt(notificationId)) {
          return notifications[i];
        }
      }
      return null;
    }
  };
})

// notes factory yall
.factory('Notes', function($q, $http) {
  var notes = [
    {
      id: 1,
      title: 'This is a note LOL',
      created_date: '12/15/2015',
      text: 'Hello. I like to be a note. Don\'t put me outside.'
    },
    {
      id: 2,
      title: 'I live in Denver Duke!',
      created_date: '12/12/2015',
      text: 'No kitty that\'s a bad kitty that\'s my pot pie.'
    }
  ];

  return {
    all: function() {
     return notes;
    },
    remove: function(note) {
      notes.splice(notes.indexOf(note), 1);
    },
    get: function(note_id) {
      /*
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === parseInt(note_id)) {
          return notes[i];
        }
      }
      return null;
      */
      var d = $q.defer();

      $http.get("http://192.168.1.140:4567/567893cec6f3605725000001/notes").success(function(data, status) {
        d.resolve({
          "data": data,
          "status": status
        });
      });

      return d.promise;
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
.factory('Plants', function($q, $http) {
  var plants = [
    {
      id: 1,
      strain: 'B-Rad Dadband Kitty Edition',
      last_journal: '12/22/2015',
      img: 'https://www.thefix.com/cdn/farfuture/NFan5y-anO4zkD8EMMXNruRzLt5DTGbqhw4F2uxsCIw/mtime:1433708002/sites/default/files/styles/article/public/budding%20weed%20plant.jpg'
    },
    {
      id: 2,
      strain: 'Bradhdadi Thunderfuck Kush',
      last_journal: '12/12/2015',
      img: 'http://www.growweedeasy.com/sites/growweedeasy.com/files/nitogen-deficient-flowering.jpg',
      status: 'status-yellow'
    }
  ];

  return {
    all: function() {
      console.log('hit plants.all');
      $http.get("http://grast.wreet.co/56b55a2de449852a75000000/plants").success(function(data, status) {
        console.log('we did it');
        console.log(data);
      });
    }, // end all method
    
    remove: function(plant) {
      plants.splice(plants.indexOf(plant), 1);
    },
    get: function(plant_id) {
      for (var i = 0; i < plants.length; i++) {
        if (plants[i].id === parseInt(plant_id)) {
          return plants[i];
        }
      }
      return null;
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


// end it







;
