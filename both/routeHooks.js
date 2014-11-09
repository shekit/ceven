var OnBeforeActions;

OnBeforeActions = {

	loginRequired: function() {
		if(!Meteor.userId()){
			this.render('login');
		}else {
			this.next();
		}
	}
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
	only: ['messages.index', 'messages.show', 'wrapper']

});