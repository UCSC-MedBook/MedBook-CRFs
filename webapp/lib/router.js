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

  this.route('CRFsPatient', {
    path: '/CRF/patient/:_patient',
    onBeforeAction: function() {
      var patient_crfName = this.params._patient;
      this.state.set("Current_Patient_ID", patient_crfName);
      Meteor.subscribe('patient', patient_crfName);
      this.next();
    },
    data: function() {
      var manyCursors = []
      Object.keys(Collections).map(function(collName) {
          var coll = Collections[collName];
          var patient_crfName = Session.get("Current_Patient_ID");
          var cursor = coll.find({
              $or: [
                  {Patient_ID: patient_crfName},
                  {Sample_ID: { $regex: "^" + patient_crfName + ".*"}}
              ]});
          console.log("subscribe patient", patient_crfName, collName);
          manyCursors.push(cursor);
      });
      return manyCursors;
    }
  });

  this.route('CRFsShowThis', {
    template: 'CRFsShow',
    path: '/CRF/lists/:_crfName/:_row',
    onBeforeAction: function() {
      Session.set("PreferredTableOrder", personalPreferredTableOrder());
      this.next();
    },
    waitOn: function() {
      return Meteor.subscribe('myForms', this.params._crfName, currentStudy());
    },
    data: function() {
      Session.set("CRF_filter", this.params._row)
      return this.params;
    }
  });


  this.route('CRFsShow', {
    path: '/CRF/lists/:_crfName',
    onBeforeAction: function() {
      Session.set("PreferredTableOrder", personalPreferredTableOrder());
      this.next();
    },
    waitOn: function() {
      return Meteor.subscribe('myForms', this.params._crfName, currentStudy());
    },
    data: function() {
      return this.params;
    }
  });


  this.route('home', {
    template: "dashboard",
    path: '/CRF/',
  });
});

if (Meteor.isClient) {
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}
