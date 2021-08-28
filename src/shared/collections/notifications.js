Meteor.methods({

	removeNotification: function(id) {
		Meteor.users.update({_id: Meteor.userId()}, {
			$pull: {
				notifications: {
					_id: id
				}
			}
		});
	},

	clearNotifications: function() {
		Meteor.users.update({_id: Meteor.userId()}, {
			$set: {
				notifications: []
			}
		});
	},

});


if ( Meteor.isServer ) {

	createNotification = function(whom, notification, bulk) {
		notification['_id'] = Random.id();
		var selector = bulk ? ( whom ? { role: whom } : {} ) : { _id: whom };
		if ( Meteor.users.update(selector, {
			$push: {
				notifications: {
					$each: [
						notification
					]
					//TODO: push notification to start of the array
					//$sort: { submitted: -1 }
				}
			}
		}) ) {
			// TODO: send email to userId
		}
	}

}
