// Meteor Collection Pattern
Template.contextContentStudyChooser.helpers({
  studies: function () {
      return Collections.studies.find({}, {sort: ["name"]});
  }
});
Template.contextContentStudyChooser.events({
    "change #currentStudy": function (event) {
        var currentStudy = event.target.value;
	Session.set("CurrentStudy", currentStudy);
	Router.go("/CRF/"+currentStudy);
     }
});
  
