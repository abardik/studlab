$window = $(window);
$document = $(document);


Deps.autorun(function() {
	var title = Session.get('pageTitle');
	if ( title ) document.title = title;
});


Deps.autorun(function() {
	if ( Meteor.userId() ) Meteor.subscribe('user', Meteor.userId());
});
