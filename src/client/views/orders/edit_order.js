Template.editOrder.events({

	'submit form': function(e) {
		e.preventDefault();
		var orderId = this._id;
		var properties = {
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}
		Orders.update(orderId, {$set: properties}, function(error) {
			if (error) {
				Errors.throw(error.reason);
			} else {
				Router.go('orderPage', {_id: orderId});
			}
		});
	},

	'click .cancel': function(e) {
		e.preventDefault();
		Router.go('ordersList');
	},

	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this post?")) {
			Orders.remove(this._id);
			Router.go('ordersList');
		}
	}

});
