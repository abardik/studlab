Template.bigSidebar.rendered = function() {
	initSidebar(this);
}


Template.dashboardReviews.rendered = function() {
	scrollAndBlinkHash(this);
}


Template.dashboard.helpers({

	setTitle: function(data) {
		var tab = data.dataTab || 'profile';
		Session.set('pageTitle', t9n(tab.charAt(0).toUpperCase() + tab.slice(1)) + (data.dataUser ? ' - ' + data.dataUser.profile.name : ''));
		return tab;
	}

});


browsePhoto = function(e, template) {
	template.$('input[type=file]').trigger('click');
}


uploadPhoto = function(e, template) {
	e.preventDefault();
	var file = $(e.target).get(0).files[0];
	var reader = new FileReader();
	reader.onload = function(e) {
		var img = new Image();
		img.onload = function() {
			var width = 200;
			var height = 200;
			var canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(this, 0, 0, width, height);
			var dataURL = canvas.toDataURL("image/jpeg");
			Meteor.users.update(Meteor.userId(), {
				$set: {
					'profile.photo': dataURL
				}
			}, {}, function(err, num) {
				delete ctx;
				delete canvas;
				delete img;
				delete reader;
				if (err) Errors.throw(err.reason);
			});
		}
		img.src = reader.result;
	}
	reader.readAsDataURL(file);
}


deletePhoto = function(e, template) {
	if ( confirm(t9n('Do you really want to delete this photo from your pofile?')) ) {
		Meteor.users.update(Meteor.userId(), {
			$set: {
				'profile.photo': null
			}
		}, {}, function(err, num) {
			if (err) Errors.throw(err.reason);
		});
	}
}


Template.dashboardProfile.events({

	'click .load-photo': browsePhoto,
	'change input[type=file]': uploadPhoto

});


Template.bigSidebar.events({

	'click .load-photo': browsePhoto,
	'change input[type=file]': uploadPhoto

});


UI.registerHelper('getUserPath', function() {
	return Router.current().route.name;
});


UI.registerHelper('getUserStars', function() {
	return Math.round(this.reviews ? this.rating/this.reviews.length : 0);
});


UI.registerHelper('showOrders', function() {
	return this._id==Meteor.userId() || this.role==ROLE_AUTHOR;
});


UI.registerHelper('getStatusName', function(status) {
	return t9n('status.'+status);
});


UI.registerHelper('getOrdersTitle', function(status) {
	return t9n('ordersByStatus.'+status);
});


UI.registerHelper('getOrdersCount', function(user, status) {
	return user.ordersCount ? user.ordersCount[status] : 0;
});


UI.registerHelper('isAuthor', function() {
	return this.role == ROLE_AUTHOR;
});


UI.registerHelper('getUserPhoto', function() {
	return this.userPhoto ? this.userPhoto : '/img/noavatar.png';
});


UI.registerHelper('getProfilePhoto', function() {
	return (this.profile && this.profile.photo) ? this.profile.photo : '/img/noavatar.png';
});
