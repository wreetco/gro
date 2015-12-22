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

.controller('NotesCtrl', function($scope, Notes) {
  $scope.notes = Notes.all();

  $scope.remove = function(note) {
    Notes.remove(note);
  }

})

// note view control
.controller('NoteViewCtrl', function($scope, $stateParams, Notes) {
  $scope.note = Notes.get($stateParams.note_id);
})



;
