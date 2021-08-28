Router.configure({
	//layoutTemplate: 'account',
	//loadingTemplate: 'loading',
});


Router.map(function() {


/* САЙТ */

	this.route('home', {
		path: '/',
		layoutTemplate: 'site',
		//template: 'home',
		//disableProgress: true,
		title: t9n('Homepage')
	});

	this.route('privacy', {
		path: '/privacy',
		layoutTemplate: 'site',
		title: t9n('privacyPolicy')
	});

	this.route('terms', {
		path: '/terms',
		layoutTemplate: 'site',
		title: t9n('terms')
	});

	this.route('contacts', {
		path: '/contacts',
		layoutTemplate: 'site',
		title: t9n('Our Contacts')
	});


/* ЛИЧНЫЙ КАБИНЕТ */

	this.route('dashboard', {
		path: '/dashboard/:tab?/:ext?',
		layoutTemplate: 'account',
		title: t9n('signIn'),
		controller: UserController
	});

	this.route('userPage', {
		path: '/user/:_id/:tab?/:ext?',
		layoutTemplate: 'account',
		template: 'dashboard',
		title: t9n('User'),
		controller: UserController
	});

	this.route('rating', {
		path: '/rating',
		layoutTemplate: 'account',
		title: t9n('Authors Rating')
		//controller: RatingController
	});


/* ЗАКАЗЫ */

	this.route('ordersList', {
		path: '/orders',
		layoutTemplate: 'account',
		title: t9n('Orders'),
		controller: OrdersController
	});

	this.route('orderPage', {
		path: '/order/:_id/:tab?',
		layoutTemplate: 'account',
		title: t9n('Order'),
		controller: OrderController
	});

	this.route('editOrder', {
		path: '/order/:_id/edit',
		layoutTemplate: 'account',
		title: t9n('Edit Order'),
		controller: OrderController
	});


});


var requireLogin = function(pause) {
	AccountsEntry.signInRequired(this);
}


var requireGuest = function(pause) {
	if ( Meteor.user()) {
		Router.go('dashboard');
		pause();
	}
}


var clearErrors = function() {
	Errors.clearSeen();
}


var changeTitle = function() {
	Session.set('pageTitle', Router.current().route.options.title || t9n('Site Name'));
	if ( !document.location.hash ) $('html, body').animate({ scrollTop: 0 }, 1);
}


Router.onBeforeAction(requireLogin, {except: ['home', 'privacy', 'terms', 'contacts', 'entrySignIn', 'entrySignUp', 'entryForgotPassword', 'entryResetPassword']});
Router.onBeforeAction(requireGuest, {only: ['entrySignIn', 'entrySignUp', 'entryForgotPassword', 'entryResetPassword']});
Router.onBeforeAction(clearErrors);

Router.onAfterAction(changeTitle);


if ( Meteor.isClient ) {
	var tmpl = 'site';
	Router.routes['entrySignIn'].options['layoutTemplate'] = tmpl;
	Router.routes['entrySignIn'].options['title'] = t9n('signIn');
	Router.routes['entrySignUp'].options['layoutTemplate'] = tmpl;
	Router.routes['entrySignUp'].options['title'] = t9n('createAccount');
	Router.routes['entryForgotPassword'].options['layoutTemplate'] = tmpl;
	Router.routes['entryForgotPassword'].options['title'] = t9n('forgotPassword');
	Router.routes['entryResetPassword'].options['layoutTemplate'] = tmpl;
	Router.routes['entryResetPassword'].options['title'] = t9n('resetYourPassword');
	Router.routes['entrySignOut'].options['layoutTemplate'] = '';
	Router.routes['entrySignOut'].options['title'] = t9n('signout');
}
