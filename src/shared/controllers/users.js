UserController = RouteController.extend({
	userId: '',
	tab: '',
	ext: '',
	waitOn: function() {
		var waiting = [];
		var filter = {};
		this.userId = this.params._id || Meteor.userId();
		if ( this.params.tab ) this.tab = this.params.tab;
		if ( this.params.ext ) this.ext = this.params.ext;
		if ( this.params._id && this.params._id!=Meteor.userId() ) {
			waiting.push(
				this.subscribe('user', this.userId)
			);
		}
		if ( this.tab=='orders' ) {
			if ( !this.ext || this.ext!='add' ) {
				if ( this.ext ) _.extend(filter, { status: this.ext });
				waiting.push(
					this.subscribe('orders', this.userId, filter, {
						sort: {submitted: -1}
						//limit: 5
					})
				);
			}
		}
		/*
		else if ( this.tab=='works' ) {
			waiting.push(
				this.subscribe('works', this.userId, filter, {
					sort: {submitted: -1}
					//limit: 5
				})
			);
		}
		else if ( this.tab=='settings' ) {
			//
		}
		*/
		return waiting;
	},
	data: function() {
		var data = {
			dataTab: this.tab,
			dataExt: this.ext,
			dataUser: Meteor.users.findOne(this.userId)
		}
		if ( this.tab=='orders' ) {
			_.extend(data, {
				dataOrders: Orders.find({}, {sort: {submitted: -1}})
			});
		}
		/*
		else if ( this.tab=='works' ) {
			_.extend(data, {
				dataWorks: Works.find({}, {sort: {submitted: -1}})
			});
		}
		else if ( this.tab=='settings' ) {
			//
		}
		*/
		return data;
	}
});
