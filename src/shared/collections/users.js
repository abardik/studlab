Meteor.users.deny({

	update: function(userId, user, fields, modifier) {
		console.log(modifier['$set']['profile']);
		if ( modifier['$set']['profile'] && !modifier['$set']['profile']['name'] ) return true;
		//return (_.intersection(fields, ['role', 'rating', 'reviews', 'ordersCount', 'worksCount']).length > 0);
		return (_.without(fields, 'profile'/*, 'emails'*/).length > 0);
	}

});


Meteor.methods({

	newReview: function(properties) {
		var user = Meteor.user();
		if ( !user ) throw new Meteor.Error(401, t9n('error.signInRequired'));

		if ( properties.userId ) {
			if ( Meteor.users.findOne({ _id: properties.userId, reviews: { $elemMatch: { userId: user._id } } }) ) throw new Meteor.Error(422, t9n('error.reviewExists'));
		}
		else throw new Meteor.Error(403, t9n('error.userNotFound'));

		if ( !properties.body ) throw new Meteor.Error(422, t9n('error.fillComment'));
		if ( properties.score<1 || properties.score>5 ) throw new Meteor.Error(422, t9n('error.fillScore'));

		var review = {
			_id: Random.id(),
			userId: user._id,
			userName: user.profile.name,
			userPhoto: user.profile.photo,
			message: properties.body,
			score: parseInt(properties.score),
			submitted: new Date().getTime()
		};
		
		if ( Meteor.users.update({_id: properties.userId}, {
			$push: {
				reviews: {
					$each: [
						review
					]
					//$sort: { submitted: -1 }
				}
			},
			$inc: {
				reviewsCount: 1,
				rating: parseInt(properties.score)
			}
		}) ) {
			if ( Meteor.isServer ) {
				var notification = _.extend(_.pick(review, 'userId', 'userName', 'userPhoto', 'submitted'), {
					url: Router.routes['dashboard'].path({tab: 'reviews'}, {hash: review._id}),
					text: t9n('leave a review')
				});
				createNotification(properties.userId, notification);
			}
		}

		return review._id;
	}

});
