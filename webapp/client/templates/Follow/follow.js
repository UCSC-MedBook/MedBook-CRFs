Template.Follow.helpers({
   following : function() {
       return Collections.Followers.findOne( {
	   Study_ID: Session.get("CurrentStudy"),
	   CRF: (Session.get("CurrentForm") || "*")
       }) != null;
   }
});

var timeStamp = 0;

Template.Follow.events({
   'mouseenter .following' : function(evt, tpl){
      console.log(".following enter");
      $(evt.target).removeClass("btn-info");
      $(evt.target).addClass("btn-danger");
      $(evt.target).text(" Unfollow ");
      evt.stopPropagation()
   },
   'mouseleave .following' : function(evt, tpl){
      console.log(".following leave");
      $(evt.target).removeClass("btn-danger");
      $(evt.target).addClass("btn-info");
      $(evt.target).text(" Following ");
      evt.stopPropagation()
   },
   'click .follow' : function(evt, tpl){
       if ((evt.timeStamp - timeStamp) < 1000) // prevent mouse click bounce
          return
       timeStamp = evt.timeStamp;
       Meteor.call("CRF/follow", Session.get("CurrentForm"), Session.get("CurrentStudy"));
   },
   'click .following' : function(evt, tpl){
       if ((evt.timeStamp - timeStamp) < 1000) // prevent mouse click bounce
          return
       timeStamp = evt.timeStamp;
       Meteor.call("CRF/unfollow", Session.get("CurrentForm"), Session.get("CurrentStudy"));
   },
});
