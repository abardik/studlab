isHandheld = function() {
	try {
		document.createEvent('TouchEvent');
		return true;
	}
	catch(e) {
		return false;
	}
}


getT9nList = function(list) {
	return list ? t9nLists[T9n.getLanguage()][list] : [];
}


getT9nListItem = function(list, value) {
	return (list && value) ? t9nLists[T9n.getLanguage()][list][value] : null;
}


getSciences = function(chapter) {
	var items = {};
	var found = chapter ? false : true;
	$.each(getT9nList('sciences'), function(value, text) {
		if ( !text ) {
			if ( found ) return false;
			found = value==chapter;
			return;
		}
		if ( found ) items[value] = text;
	});
	return items;
}


substringMatcher = function(strings) {
	return function findMatches(query, callback) {
		var matches = [];
		var substrRegex = new RegExp(query, 'i');
		$.each(strings, function(value, text) {
			if ( substrRegex.test(text) ) {
				matches.push({ value: value, text: text });
			}
		});
		callback(matches);
	};
};


initSidebar = function(template) {

	$('.sidebar-toggler').click(function () {
		var el = template.$(this);
		el.parent().toggleClass('minimized');
		if ( el.hasClass('expanded') ) el.attr('title', t9n('Hide sidebar'));
		else el.attr('title', t9n('Show sidebar'));
		el.toggleClass('fa-chevron-left').toggleClass('fa-chevron-right').toggleClass('expanded');
		$('html, body').toggleClass('sidebar-expanded');
		return false;
	});

	$('.big-sidebar .nav li > a').click(function() {
		$('.sidebar-toggler.expanded').click();
	});

}


scrollAndBlinkHash = function(template) {
	var hash = location.hash;
	if ( hash ) {
		var el = template.$(hash);
		if ( el.length ) {
			$('html, body').animate({
				scrollTop: el.offset().top
			}, 600, function() {
				el.mouseover(function() {
					$(this).unblink();
				}).blink({count: 20});
			});
		}
	}
}


initTypeahead = function(tmpl) {
	$('.tt-input').on('focus', function() {
		if ( !$(this).data('focused') ) {
			$(this).data('focused', true).data('placeholder', $(this).attr('placeholder')).attr('placeholder', '');
			$(this).data('ttTypeahead').input.trigger('queryChanged', $(this).val());
		}
	}).on('blur', function() {
		$(this).data('focused', false).attr('placeholder', $(this).data('placeholder'));
	}).on('typeahead:selected', function(e, item, dataset) {
		if ( !$(this).hasClass('typeahead') ) { // process only tags-input-typeahead
			var that = this;
			setTimeout(function() {
				$(that).data('ttTypeahead').input.trigger('queryChanged', '');
			}, 10);
		}
	});
}


