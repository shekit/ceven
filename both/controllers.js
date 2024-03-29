SplashController = RouteController.extend({
  layoutTemplate: 'splashLayout',
  template: 'splash',
  action: function() {
    this.render('splash');
    Meteor.setTimeout(function() {
      Router.go('login');
    }, 2000);
  }
});

MessagesIndexController = RouteController.extend({
  data: function() {
    return {
      messages: Messages.find({})
    };
  }
});

MessagesShowController = RouteController.extend({
  data: function() {
    return {
      message: Messages.findOne({_id: this.params._id})
    };
  }
});

// LoginController = RouteController.extend({
//   data: function() {
//     return{
//       message: "Hello there"
//     };
//   }
// });
