Meteor.methods({
   "CRF/follow":  function(CRF, Study_ID) {
       var follow = {
	  userId: this.userId,
          email: Meteor.users.findOne({_id: this.userId}).defaultEmail(),
          CRF: CRF,
          Study_ID: Study_ID,
       };
       var ret = Collections.Followers.insert(follow);
       console.log("CRF/follow",  CRF, Study_ID, ret);
   },

   "CRF/unfollow":  function(CRF, Study_ID) {
       var follow = {
	  userId: this.userId,
          email: Meteor.users.findOne({_id: this.userId}).defaultEmail(),
          CRF: CRF,
          Study_ID: Study_ID,
       };
       var ret = Collections.Followers.remove(follow);
       console.log("CRF/unfollow",  CRF, Study_ID, ret);
   },
});

Meteor.startup(function() {
    var ted = Meteor.users.findOne({username:"ted"});
    Collections.Followers.upsert({CRF: "*",  Study_ID: "*"},
	{CRF: "*",  Study_ID: "*", userId: ted._id, email: ted.defaultEmail() });
});

// Summarize the contents of the change and tell the followers
NotifyFollowers = function(userId, doc, change) {
   var who = Meteor.users.find({_id: userId});
   if (who == null)
      throw new Error("Unknown user modified", doc);

   var summary = "The record with ";
   var searchKey = null;
   ["CRF", "Study_ID", "Patient_ID", "Specimen_ID", "Sample_ID"].map(function(field) {
      if (field in doc) {
          summary += field + "=" + doc[field] + ", ";
	  if (searchKey == null && field.match(/_ID$/))
	      searchKey = doc[field];
      }
   });
   var url =  process.env.ROOT_URL +  doc.Study_ID + "/" + doc.CRF + "/";
   if (searchKey)
       url += "?q=" + searchKey;
   summary += "was " + change  + ". To see the change click <a href='" + url + "' >" + url + "</a>";

   var followers = Collections.Followers.find(
      {$or : [
          {CRF: "*",  Study_ID: "*"},
          {CRF: "*",  Study_ID: doc.Study_ID},
          {CRF: doc.CRF, Study_ID: doc.Study_ID}
      ]}
   ).fetch().map(function(follower) {
      return follower.email;
   });
   if (followers.length > 0)
       sendEmail(followers, "MedBook CRF Change Notification", summary);
}

sendEmail = function(to, subject, html) {
    console.log("sendEmail", to, subject,html);
    Email.send({
      to: to.join(","),
      from: "no-reply@medbook.ucsc.edu",
      subject: subject,
      html: html
    });
}

sendEmailTest = function() {
    console.log("before email send");
    debugger
    Email.send({
      to: "tedgoldstein@gmail.com",
      from: "medbook@medbook.ucsc.edu",
      subject: "Example Email",
      html: "<p><strong>This will render as bold text</strong>, but this will not.</p>"
    });
    console.log("after email send");
}

Meteor.publish("Following", function(query) {
   query.userId = this.userId;
   var cursor = Collections.Followers.find(query);
   console.log("publish Following", query, cursor.count());
   return cursor;
});

