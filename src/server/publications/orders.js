Meteor.publish('orders', function(userId, filter, options) {
	if ( !filter ) filter = {};
	if ( userId ) {
		var user = Meteor.users.findOne(userId);
		if ( !user ) return false;
		if ( user.role==ROLE_CUSTOMER ) _.extend(filter, { customerId: userId });
		else _.extend(filter, { authorId: userId });
	}
	return Orders.find(filter, _.extend(options, {
		fields: {
			comments: 0,
			offers: 0
		}
		//transform: function(doc) {
		//	doc.commentsCount = doc.comments.length;
		//	doc.offersCount = doc.offers.length;
		//	return doc;
		//}
	}));
});


Meteor.publish('order', function(id) {
	return id && Orders.find(id);
});
