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
      Meteor.subscribe('publicLists'),
      Meteor.subscribe('privateLists')
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
      var patient_id = this.params._patient;
      this.state.set("Current_Patient_ID", patient_id);
      Meteor.subscribe('patient', patient_id);
      this.next();
    },
    data: function() {
      var manyCursors = []
      CRFs.map(function(collName) {
          var coll = CRFcollections[collName];
          var patient_id = Session.get("Current_Patient_ID");
          var cursor = coll.find({
              $or: [
                  {Patient_ID: patient_id},
                  {Sample_ID: { $regex: "^" + patient_id + ".*"}}
              ]});
          console.log("subscribe patient", patient_id, collName);
          manyCursors.push(cursor);
      });
      return manyCursors;
    }
  });


  this.route('CRFsShow', {
    path: '/CRF/lists/:table',
    // subscribe to CRFs before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function() {
      Session.set("PreferredTableOrder", personalPreferredTableOrder());

      this.CRFsHandle = Meteor.subscribe('CRFs', this.params.table);
      Meteor.subscribe('collaboration', this.params.table)
      this.next();
    },
    data: function() {
      return CRFmetadataCollection.findOne(this.params.table);
    }
  });

  this.route('CRFsShowThis', {
    template: 'CRFsShow',
    path: '/CRF/lists/:table/:_row/',
    // subscribe to CRFs before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function() {
      Session.set("PreferredTableOrder", personalPreferredTableOrder());

      this.CRFsHandle = Meteor.subscribe('CRFs', this.params.table);
      Meteor.subscribe('collaboration', this.params.table)
      this.next();
    },
    data: function() {
      var item = CRFcollections[this.params.table].findOne({_id: this.params._row});
      console.log("Show This", this.params.table, item);
      Session.set("CurrentDoc", item)
      return CRFmetadataCollection.findOne(this.params.table);
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
