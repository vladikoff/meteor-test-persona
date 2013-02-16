if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to app.";
  };

  Template.hello.events({
    'click .click' : function () {
      Meteor.loginWithPersona({}, function() {
        console.log('logged in!');
      });
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
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

  // Support for playing D&D: Roll 3d6 for dexterity
  
  Accounts.onCreateUser(function(options, user) {
    console.log('creating user');
    console.log(user); 
    user.profile = {};
    user.profile.email = user.services.persona.email; 
    console.log('User email is ' + user.profile.email);  
    return user;
  });

/*
  Meteor.publish('users', function() {
    return Meteor.users.find({});
  });
*/
}

