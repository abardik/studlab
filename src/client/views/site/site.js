Template.site.rendered = function() {
	$('body').attr('class', 'site-layout');
}


Template.site.events({

	'click a': function(e, tmpl) {
		var hash = e.currentTarget.href.split('#')[1];
		if ( hash ) {
			//e.preventDefault();
			$('html, body').animate({
				scrollTop: $('#'+hash).offset().top
			}, 600);
		}
	}

});
