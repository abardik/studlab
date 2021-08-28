Template.scienceSelect.rendered = function() {
	var tmpl = this;
	var sources = [];
	$.each(getT9nList('scienceChapters'), function(i, v) {
		sources.push({
	    displayKey: 'text',
			source: substringMatcher(getSciences(i)),
			templates: {
				empty: '<div class="empty">'+t9n('Not found')+'</div>',
				header: '<div class="header">'+v+'</div>'
				//suggestion: UI.render('{{#if value}}<p>{{value}}</p>{{else}}<div class="clearfix"><strong class="col-xs-12">{{text}}</strong></div>{{/if}}')
			}
		});
	});
	tmpl.$('.sciences').typeahead({
		hint: true,
		highlight: true,
		minLength: 0
	},
	sources);
	initTypeahead(tmpl);
}


Template.languageSelect.rendered = function() {
	var tmpl = this;
	tmpl.$('.languages').typeahead({
		hint: true,
		highlight: true,
		minLength: 0
	},
	{
    displayKey: 'text',
		source: substringMatcher(getT9nList('languages')),
		templates: {
			empty: '<div class="clearfix"><div class="col-xs-12">'+t9n('Not found')+'</div></div>'
		}
	});
	initTypeahead(tmpl);
}


Template.newOrder.events({

	'submit form': function(e) {
		e.preventDefault();
		var form = $(e.target);
		var order = {
			title: form.find('[name=title]').val(),
			message: form.find('[name=message]').val()
		};
		Meteor.call('newOrder', order, function(error, id) {
			if (error) {
				Errors.throw(error.reason);
				//if (error.error==302) Router.go('order', {_id: error.details});
			}
			else {
				Router.go('orderPage', {_id: id});
			}
		});
	},

	'click .cancel': function(e) {
		e.preventDefault();
		Router.go('dashboard');
	}

});
