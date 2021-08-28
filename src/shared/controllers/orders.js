OrdersController = RouteController.extend({
	increment: 5,
	sort: {submitted: -1},
	page: function() {
		return parseInt(this.params.page) || 1;
	},
	onBeforeAction: function() {
		var userId = this.params._id;
		var filter = {};
		var options = {
			sort: this.sort,
			skip: (this.page() - 1) * this.increment,
			limit: this.increment
		};
		this.subscribe('orders', userId, filter, options).wait();
	},
	data: function() {
		var orders = Orders.find({}, {sort: this.sort});
		return {
			orders: orders,
			prevPath: this.page()>1 ? this.route.path({_id: this.params._id}, {query: {page: this.page()-1}}) : null,
			nextPath: this.increment==orders.count() ? this.route.path({_id: this.params._id}, {query: {page: this.page()+1}}) : null
		};
	}
});
/*
BestOrdersListController = OrdersListController.extend({
	sort: {votes: -1, submitted: -1}
});
*/

OrderController = RouteController.extend({
	orderId: '',
	tab: '',
	waitOn: function() {
		this.tab = this.params.tab;
		this.orderId = this.params._id;
		var waiting = [
			this.subscribe('order', this.orderId)
		];
		return waiting;
	},
	data: function() {
		var data = {
			dataTab: this.tab,
			dataOrder: Orders.findOne(this.orderId)
		}
		return data;
	}
});
