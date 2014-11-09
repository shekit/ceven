

Template.registerForm.helpers({
	'register-status': function() {
		var errorStatus = Session.get('register');

		if(errorStatus == 'error'){
			return "error";
		}
	}
});

Template.loginForm.helpers({
	'register-status': function() {
		var errorStatus = Session.get('login');

		if(errorStatus == 'error') {
			return "error";
		}
	}
});

Template.login.events({
	'click .logout': function(event) {
		event.preventDefault();
		Meteor.logout();
	}

});

Template.login.helpers({
	'message':'hello there'
})



Template.registerForm.events({
	'submit form': function(event, template) {
		event.preventDefault();

		var emailVar = template.find("#register-email").value;
		var passwordVar = template.find("#register-password").value;

		emailVar = emailVar.trim().toLowerCase();

		Accounts.createUser({
			email: emailVar,
			password: passwordVar
		}, function(error){
			if(error) {
				Session.set('register', 'error');
				console.log(Session.get('register'));
			} else {
				Session.set('register','success');
				console.log(Session.get('register'));
				Router.go('wrapper');
			}
		});

		template.find("#register-email").value = '';
		template.find("#register-password").value = '';

		return false;
	}

});

Template.loginForm.events({
	'submit form': function(event, template) {

		event.preventDefault();

		var emailVar = template.find("#login-email").value;
		var passwordVar = template.find("#login-password").value;

		emailVar = emailVar.trim().toLowerCase();
		Meteor.loginWithPassword(emailVar, passwordVar, function(error){
			if(error) {
				Session.set('login', 'error');
				console.log(Session.get('login'));
			} else {
				Session.set('login', 'success');
				console.log(Session.get('login'));
				Router.go('wrapper');
			}
		});

		if(Session.get('login') == 'error') {
			template.find("#login-password").value = '';
		} else {
			template.find("#login-email").value = '';
			template.find("#login-password").value = '';
		}

		return false;
	}

});