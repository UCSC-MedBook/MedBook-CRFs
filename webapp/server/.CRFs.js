SecurityCRF = function(userId, doc) {

  var user = Meteor.users.findOne({_id: userId});
  if (user == null) {
    console.log("Security CRF:", userId, "unknown user");
    return false;
  }

  var study = Collections.Studies.findOne({id:doc.Study_ID});
  if (study == null || study.collaborations == null || study.collaborations.length != 1) {
    console.log("SecurityCRF", userId, "bad study");
    return false;
  }
  var collaboration = Collaborations.findOne({name: study.collaborations[0], administrators: user.defaultEmail() });

  if (collaboration == null) {
     msg = "Security CRF:" +  userId + " " +  user.defaultEmail() + " not an administrator of collaboration " + " " + study.collaborations[0]
   + " which is requried by " + study.id;
     console.log(msg);

     throw new Error(msg);
     return false;
  }
  return true
};


Collections.CRFs.allow({
  insert: SecurityCRF,
  update: SecurityCRF,
  remove: SecurityCRF,
  fetch: ['collaborations']
});

Collections.CRFs.after.insert(function (userId, doc) {
    var transactionRecord = {
	date: Date.now(),
	type: "insert",
        userId: userId,
	doc: doc
    }
    Collections.AuditTrail.insert(transactionRecord);
    NotifyFollowers(userId, doc, "inserted");
});


Collections.CRFs.after.update(function (userId, fieldNames, modifier, options) {

    function noDollar(obj) {
	Object.keys(obj).map(function(key) {
	   if (typeof(obj[key]) == "object")
	       noDollar(obj[key]);

	   if (key[0] == '$') {
	       var keyNoDollar = key.substring(1);
	       obj[keyNoDollar] = obj[key];
	       delete obj[key];
	   }
	})
    }

    noDollar(options);

    var transactionRecord = {
	date: Date.now(),
	type: "update",
        userId: userId,
        fieldNames: fieldNames,
	modifier: modifier,
	previous: this.previous,
	options: options,
    }
    Collections.AuditTrail.insert(transactionRecord);
    NotifyFollowers(userId, this.previous, "updated");
});

Collections.CRFs.after.remove(function (userId, doc) {
    var transactionRecord = {
	date: Date.now(),
	type: "removed",
        userId: userId,
	doc: doc
    }
    Collections.AuditTrail.insert(transactionRecord);
    NotifyFollowers(userId, doc, "removed");
});




// Collections.Studies.allow({
//     insert: function (userId, doc) {
// 	console.log("studies allow insert called");
// 	if (doc.collaborations == null || doc.collaborations.length != 1)
// 	    return false;
// 	var user = Meteor.users.findOne({_id: userId});
// 	var collaboration = Collaborations.findOne({name: doc.collaborations[0], administrators: user.defaultEmail() });
// 	if (collaboration == null)
// 	   return false;
// 	return true
//     },
//
//     update: function (userId, doc, fields, modifier) {
// 	var study = Collections.Studies.findOne({_id:doc._id});
// 	if (study.name != doc.name)
// 	     return false;
// 	if (study.collaborations == null || study.collaborations.length != 1)
// 	    return false;
// 	var user = Meteor.users.findOne({_id: userId});
// 	debugger
// 	var collaboration = Collaborations.findOne({name: doc.collaborations[0], administrators: user.defaultEmail() });
// 	if (collaboration == null)
// 	   return false;
// 	return true
//     },
//     remove: function (userId, doc) {
// 	return false;
//     } //,
//     // fetch: ['owner']
// });
