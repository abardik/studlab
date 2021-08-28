Orders = new Meteor.Collection('orders');


Orders.allow({

	update: ownsOrder,
	remove: ownsOrder

});


Orders.deny({

	update: function(userId, order, fields) {
		return (_.without(fields, 'title', 'message').length > 0);
	}

});


Meteor.methods({

	newOrder: function(properties) {
		var user = Meteor.user();
		if ( !user ) throw new Meteor.Error(401, "Пожалуйста, войдите в систему");

		if ( user.role!=ROLE_CUSTOMER ) throw new Meteor.Error(403, 'Вы не имеет права создавать заказы');

		if ( !properties.title ) throw new Meteor.Error(422, 'Пожалуйста, укажите тему');

		var order = _.extend(_.pick(properties, 'title', 'message'), {
			customerId: user._id,
			customerName: user.profile.name,
			authorId: null,
			authorName: null,
			submitted: new Date().getTime(),
			offers: [],
			comments: []
		});
		
		order._id = Orders.insert(order);
		if ( order._id ) {
			if ( Meteor.users.update(user._id, {
				$inc: {
					ordersCount: 1
				}
			}) ) {
				var notification = {
					userId: user._id,
					userName: user.profile.name,
					userPhoto: user.profile.photo,
					submitted: new Date().getTime(),
					url: Router.routes['orderPage'].path({_id: order._id}),
					text: t9n('create a new order')
				};
				createNotification(ROLE_AUTHOR, notification, true);
			}
		}
		return order._id;
	},


	newOrderComment: function(properties) {
		var user = Meteor.user();
		if ( !user ) throw new Meteor.Error(401, t9n('error.signInRequired'));

		var order = Orders.findOne(properties.orderId);
		if ( !order ) throw new Meteor.Error(422, t9n('error.orderNotFound'));

		if ( !properties.body ) throw new Meteor.Error(422, t9n('error.fillComment'));

		var comment = {
			_id: Random.id(),
			userId: user._id,
			userName: user.profile.name,
			userPhoto: user.profile.photo,
			message: properties.body,
			submitted: new Date().getTime()
		};
		
		if ( Orders.update({_id: properties.orderId}, {
			$push: {
				comments: {
					$each: [
						comment
					]
					//$sort: { submitted: -1 }
				}
			},
			$inc: {commentsCount: 1}
		}) ) {
			if ( Meteor.isServer ) {
				var notification = _.extend(_.pick(comment, 'userId', 'userName', 'userPhoto', 'submitted'), {
					url: Router.routes['orderPage'].path({_id: properties.orderId, tab: 'comments'}, {hash: comment._id}),
					text: t9n('leave a comment')
				});
				if ( order.customerId && comment.userId !== order.customerId ) createNotification(order.customerId, notification);
				if ( order.authorId && comment.userId !== order.authorId) createNotification(order.authorId, notification);
			}
		}

		return comment._id;
	},


	newOrderOffer: function(orderId) {
		var user = Meteor.user();
		if ( !user ) throw new Meteor.Error(401, "Пожалуйста, войдите в систему");

		Orders.update({
			_id: orderId,
			offerers: {$ne: user._id}
		}, {
			$addToSet: {offerers: user._id},
			$inc: {offersCount: 1}
		});

	}

});
