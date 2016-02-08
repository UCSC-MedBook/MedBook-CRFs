Template.Follow.helpers({
   following : function() {
       return true;
       return Collection.Followers.findOne( {
	   Study_ID: Session.get("CurrentStudy"),
	   CRF: (Session.get("CurrentForm") || "*")
       }) != null;
   }
});

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
   'mouseenter .follow' : function(evt, tpl){
      console.log(".following enter");
   },
   'mouseleave .follow' : function(evt, tpl){
      console.log(".follow leave");
   },
});
