var OnBeforeActions;

OnBeforeActions = {

	loginRequired: function(pause) {
		if(!Meteor.userId()){
			this.render('login');
			return pause();
		}
	}
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
	only: ['messages.index', 'messages.show']

});