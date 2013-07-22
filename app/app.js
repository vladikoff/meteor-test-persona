if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to this app.";
  };

  Template.hello.events({
    'click .login' : function () {
      Meteor.loginWithPersona({}, function() {
        // console.log('logged in!');
      });
    },
    'click .logout' : function () {
      Meteor.logout();
    }
  });



  Template.hello.users = function () {
    return Meteor.users.find().fetch();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });


  Accounts.onCreateUser(function(options, user) {
    console.log('creating user');
    console.log(user); 
    user.profile = {};
    user.profile.email = user.services.persona.email; 
    console.log('User email is ' + user.profile.email);  
    return user;
  });


}

