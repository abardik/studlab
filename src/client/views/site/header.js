Template.siteHeader.helpers({

	currentPath: function(name) {
		return Router.current().route.name == name;
	},

	statistics: function() {
		return {
			studentsCount: 12789,
			authorsCount: 1237,
			ordersCount: 36549
		}
	}

});
