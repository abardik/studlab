Template.newComment.events({

	'focus [name=body]': function(e, template) {
		e.target.rows = 3;
		$('.comment-form [type=submit]').parent().show();
	},

	'blur [name=body]': function(e, template) {
		if ( !e.target.value ) {
			e.target.rows = 1;
			$('.comment-form [type=submit]').parent().hide();
		}
	},

	'submit form[name=comment]': function(e, template) {
		e.preventDefault();
		var $body = $(e.target).find('[name=body]');
		var comment = {
			body: $body.val(),
			orderId: template.data._id
		};
		Meteor.call('newOrderComment', comment, function(error, commentId) {
			if (error) {
				Errors.throw(error.reason);
			} else {
				$body.val('');
				$body.attr('rows', 1);
				$('.comment-form [type=submit]').parent().hide();
			}
		});
	}

});
