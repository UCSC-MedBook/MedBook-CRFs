Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  var user = Meteor.user();
  if (user && user.profile && user.profile.collaborations && user.profile.collaborations.indexOf("WCDT")) {
      this.next();
      return;
  }
  this.render('signin');

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
      Meteor.subscribe('publicLists'),
      Meteor.subscribe('privateLists')
    ];
  }
});

Router.map(function() {
  // this.route('join');
  this.route('signin');

  this.route('CRFsShow', {
    path: '/CRF/lists/:_id',
    // subscribe to CRFs before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function() {
      this.CRFsHandle = Meteor.subscribe('CRFs', this.params._id);
      Meteor.subscribe('collaboration', this.params._id)
      this.next();
    },
    data: function() {
      return CRFmetadataCollection.findOne(this.params._id);
    }
  });
  
  this.route('home', {
    path: '/CRF/',
    action: function() {
      Router.redirect('CRFsShow', CRFmetadataCollection.findOne());
    }
  });
});

if (Meteor.isClient) {
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}
