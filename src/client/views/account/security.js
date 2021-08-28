Template.editSecurity.events({

	'submit form[name=editSecurity]': function(e) {
		e.preventDefault();
		Errors.clear();
		var form = $(e.target);
		var oldpassword = form.find('[name=oldpassword]').val();
		var newpassword = form.find('[name=newpassword]').val();
		var confirmpassword = form.find('[name=confirmpassword]').val();
		if ( newpassword!='' ) {
			if ( newpassword==confirmpassword ) {
				Accounts.changePassword(oldpassword, newpassword, function(error) {
					if (error) {
						Errors.throw(T9n.get('error.accounts.'+error.reason));
					} else {
						Router.go('dashboard');
					}
				});
			}
			else Errors.throw(t9n('error.Please confirm your new password'));
		}
		else Errors.throw(t9n('error.Please provide your new password'));
		return false;
	}

});
