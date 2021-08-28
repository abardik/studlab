Template.orderPage.helpers({

	setTitle: function(data) {
		var tab = data.dataTab || 'details';
		Session.set('pageTitle', t9n(tab.charAt(0).toUpperCase() + tab.slice(1)) + (data.dataOrder ? ' - ' + data.dataOrder.title : ''));
		return tab;
	}

});


Template.orderPage.rendered = function() {
	//initSidebar(this);
	scrollAndBlinkHash(this);
}
