Template.newReview.events({

	'focus [name=body]': function(e, template) {
		e.target.rows = 3;
		$('.list-form [type=submit]').parent().show();
	},
/*
	'blur [name=body]': function(e, template) {
		if ( !e.target.value ) {
			e.target.rows = 1;
			$('.list-form [type=submit]').parent().hide();
		}
	},
*/
	'click .rating .star': function(e, template) {
		var star = $(e.target);
		var score = star.data('score');
		star.closest('form').find('[name=score]').val(star.data('score'));
		star.closest('form').find('.rating .star').each(function(i, v) {
			var $v = $(v);
			if ( $v.data('score') <= score ) $v.addClass('active');
			else $v.removeClass('active');
		});
	},

	'submit form[name=comment]': function(e, template) {
		e.preventDefault();
		var form = $(e.target);
		var body = form.find('[name=body]');
		var score = form.find('[name=score]');
		var comment = {
			body: body.val(),
			score: parseInt(score.val()),
			userId: template.data._id
		};
		Errors.clear();
		Meteor.call('newReview', comment, function(error) {
			if (error) {
				Errors.throw(error.reason);
			} else {
				body.val('');
				body.attr('rows', 1);
				score.val(0);
				form.find('.rating .star').removeClass('active');
				$('.list-form [type=submit]').parent().hide();
			}
		});
		return false;
	}

});
