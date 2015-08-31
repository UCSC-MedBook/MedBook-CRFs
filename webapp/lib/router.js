Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  /*var user = Meteor.user();
  if (user && user.profile && user.profile.collaborations && user.profile.collaborations.indexOf("WCDT")) {
      this.next();
      return;
  }
  this.render('signin');*/

  if(!Meteor.user()){
    this.render('signin');
  }else{
    this.next();
  }

});

Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('studies'),
    ];
  }
});


/*Router.route('/',{
  template: 'CRFsItem',
  name: "homeRoute",
  onAfterAction: function(){
    console.log("homeRoute");
  }
});*/


Router.map(function() {
  // this.route('join');
  this.route('signin');

  this.route('CRFsShow', {
    path: '/CRF/:_study/:_crfName/',
    onBeforeAction: function() {
      Session.set("CurrentStudy", this.params._study);
      Session.set("currentForm", this.params._crfName);
      Session.set("PreferredTableOrder", personalPreferredTableOrder());

      Session.set("CRF_filter", this.params._row)
      this.next();
    },
    waitOn: function() {
      return Meteor.subscribe('myForms', this.params._crfName, currentStudy());
    },
    data: function() {
      return this.params;
    }
  });

  this.route('pleaseSelectStudy', {
    path: '/CRF/',
  });

  this.route('dashboard', {
    path: '/CRF/:_crfName',
  });
});

if (Meteor.isClient) {
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}
