Template.scienceList.rendered = function() {
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
	tmpl.$('.sciences').tagsinput({
		freeInput: false,
		tagClass: 'label label-primary',
    itemValue: 'value',
    itemText: 'text',
		typeaheadoptions: {
			hint: true,
			highlight: true,
			minLength: 0
		},
		typeaheadjs: sources
	});
	initTypeahead(tmpl);
	if ( tmpl.data.profile.sciences ) {
		$.each(tmpl.data.profile.sciences, function(i, v) {
			tmpl.$('.sciences').tagsinput('add', { value: v, text: getT9nListItem('sciences', v) });
		});
	}
}


Template.languageList.rendered = function() {
	var tmpl = this;
	tmpl.$('.languages').tagsinput({
		freeInput: false,
		tagClass: 'label label-primary',
    itemValue: 'value',
    itemText: 'text',
		typeaheadoptions: {
			hint: true,
			highlight: true,
			minLength: 0
		},
		typeaheadjs: {
	    displayKey: 'text',
			source: substringMatcher(getT9nList('languages')),
			templates: {
				empty: '<div class="clearfix"><div class="col-xs-12">'+t9n('Not found')+'</div></div>'
			}
		}
	});
	initTypeahead(this);
	if ( tmpl.data.profile.languages ) {
		$.each(tmpl.data.profile.languages, function(i, v) {
			tmpl.$('.languages').tagsinput('add', { value: v, text: getT9nListItem('languages', v) });
		});
	}
}


Template.editProfile.events({

	'click .load-photo': browsePhoto,
	'change input[type=file]': uploadPhoto,
	'click .delete-photo': deletePhoto,

	'click .submit': function(e) {
		$(e.target).closest('form').submit();
	},

	'submit form[name=editProfile]': function(e) {
		e.preventDefault();
		var profile = Meteor.user().profile;
		var form = $(e.target);
		var data = form.serializeArray();
		$.each(data, function(i, v) {
			profile[v.name] = v.value;
		});
		if ( form.find('[name=sciences]').length ) {
			var sciences = [];
			$.each(form.find('[name=sciences]').tagsinput('items'), function(i, v) {
				sciences.push(v.value);
			});
			profile.sciences = sciences;
		}
		if ( form.find('[name=languages]').length ) {
			var sciences = [], languages = [];
			$.each(form.find('[name=languages]').tagsinput('items'), function(i, v) {
				languages.push(v.value);
			});
			profile.languages = languages;
		}
		Meteor.users.update(Meteor.userId(), {
			$set: {
				profile: profile
			}
		}, {}, function(err, num) {
			if (err) {
				Errors.throw(err.reason);
			}
			else {
				Router.go('dashboard');
			}
		});
	}

});
