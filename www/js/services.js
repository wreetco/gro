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
.factory('Notes', function() {
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
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === parseInt(note_id)) {
          return notes[i];
        }
      }
      return null;
    }
  }

})
// end it








;
