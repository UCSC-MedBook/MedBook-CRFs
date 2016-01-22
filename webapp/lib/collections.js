Collections.CRFs = new Meteor.Collection("CRFs");
Collections.Metadata = new Meteor.Collection("Metadata");
Collections.studies = new Meteor.Collection('studies');


Collections.CRFs.allow({
    insert: function (userId, doc) {
	console.log("allow insert called");
	// the user must be logged in, and the document must be owned by the user
	return true || (userId && doc.owner === userId);
    },
    update: function (userId, doc, fields, modifier) {
	console.log("allow update called");
	// can only change your own documents
	return true || doc.owner === userId;
    },
    remove: function (userId, doc) {
	console.log("allow remove called");
	// can only remove your own documents
	return true || doc.owner === userId;
    } //,
    // fetch: ['owner']
});

/*
Collections.CRFs.before.insert(function (userId, doc) { console.log("before insert called", userId, doc); });
Collections.CRFs.before.update(function (userId, selector, modifier, options) { console.log("before update called", doc); });
*/
// Collections.CRFs.before.upsert(function (userId, selector, modifier, options) { console.log("before upsert called", doc); });
