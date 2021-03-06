// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
})

.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom'); // other values: top
}])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.notifications', {
      url: '/notifications',
      views: {
        'tab-notifications': {
          templateUrl: 'templates/tab-notifications.html',
          controller: 'NotificationsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.plants', {
    url: '/plants',
    views: {
      'tab-dash': {
        templateUrl: 'templates/plants-overview.html',
        controller: 'PlantsCtrl'
      }
    }
  })

  .state('tab.plant-show', {
    url: '/plants/:plant_id',
    views: {
      'tab-dash': {
        templateUrl: 'templates/plant_show.html',
        controller: 'PlantViewCtrl'
      }
    }
  })

  .state('tab.new-plant', {
    url: '/plant/new',
    views: {
      'tab-dash': {
        templateUrl: 'templates/plant_new.html',
        controller: 'PlantsCtrl'
      }
    }
  })

  .state('tab.schedule', {
    url: '/schedule',
    views: {
      'tab-dash': {
        templateUrl: 'templates/schedule.html',
        controller: 'ScheduleCtrl'
      }
    }
  })
	
	.state('tab.schedule-show', {
    url: '/schedule/:schedule_id',
    views: {
      'tab-dash': {
        templateUrl: 'templates/schedule_show.html',
        controller: 'ScheduleViewCtrl'
      }
    }
  })

  .state('tab.notes', {
    url: '/notes',
    views: {
      'tab-dash': {
        templateUrl: 'templates/notes.html',
        controller: 'NotesCtrl'
      }
    }
  })

  .state('tab.note-show', {
    url: '/notes/:note_id',
    views: {
      'tab-dash': {
        templateUrl: 'templates/note_show.html',
        controller: 'NoteViewCtrl'
      }
    }
  })

  .state('tab.new-note', {
    url: '/note/:note_new',
    views: {
      'tab-dash': {
        templateUrl: 'templates/note_new.html',
        controller: 'NotesCtrl'
      }
    }
  })

  .state('tab.equipment', {
    url: '/equipment',
    views: {
      'tab-dash': {
        templateUrl: 'templates/equipment.html',
        controller: 'EquipmentCtrl'
      }
    }
  })
	.state('tab.equipment-show', {
    url: '/equipment/:equipment_id',
    views: {
      'tab-dash': {
        templateUrl: 'templates/equipment_show.html',
        controller: 'EquipmentViewCtrl'
      }
    }
  })
	
	.state('tab.new-equipment', {
    url: '/plant/new',
    views: {
      'tab-dash': {
        templateUrl: 'templates/equipment_new.html',
        controller: 'EquipmentCtrl'
      }
    }
  })

  ; // end stateProvider

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
