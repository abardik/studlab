Template.ordersList.helpers({

	title: function() {
		var id = Router.current().params._id;
		return id ? (id==Meteor.userId() ? 'Мои заказы' : 'Чужие заказы') : 'Каталог заказов';
	}

});


Template.ordersItem.helpers({

	showAuthor: function(data) {
		return (Router.current().route.name=='ordersList') || (data && data.role==ROLE_CUSTOMER);
	},

	showCustomer: function(data) {
		return (Router.current().route.name=='ordersList') || (data && data.role==ROLE_AUTHOR);
	}

});
