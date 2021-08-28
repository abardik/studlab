Meteor.publish('user', function(id) {
	var hiddenFields = {
		'services': 0
	}
	// this.userId - logged in user
	if ( id != this.userId ) hiddenFields['notifications'] = 0;
	return Meteor.users.find(id, { fields: hiddenFields });
});
