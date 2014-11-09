Router.configure({
  layoutTemplate: 'appLayout'
});

Router.route('/', {
  name: 'splash',
  controller: 'SplashController'
});

Router.route('/login', {
	name: 'login'
});

Router.route('/messages', {
  name: 'messages.index'
});

Router.route('/messages/:_id', {
  name: 'messages.show'
});

Router.route('/news', {
	name: 'wrapper'
});

Router.route('/streak', {
	name: 'thankYou'
});

Router.route('/digests', {
	name: 'digestList',
	template: 'digestList'
});

Router.route('/digests/add', {
	name: 'digestAdd',
	template: 'digestAdd'
});

Router.route('/digests/:_id', {
	name: 'digestDetail',
	template: 'digestDetail',
	data: function() {
		var digestId = this.params._id;
		return Digests.findOne(digestId);
	}
});

Router.route('/articles', {
	name: 'articleList',
	template: 'articleList'
});

Router.route('/categories', {
	name: 'categoryList',
	template: 'categoryList'
});

Router.route('/categories/add', {
	name: 'categoryAdd',
	template: 'categoryAdd'
});

Router.route('/categories/:_id', {
	name: 'categoryDetail',
	template: 'categoryDetail',
	data: function() {
		var categoryId = this.params._id;
		return Categories.findOne(categoryId);
	}
});


