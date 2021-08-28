Template.notifications.events({

  'click .clear-notifications': function() {
    Meteor.call('clearNotifications');
  }

});


Template.notification.events({

  'click li > a': function(e) {
  	if ( !e.target.href || e.target==e.currentTarget ) Meteor.call('removeNotification', this._id);
  }

});
