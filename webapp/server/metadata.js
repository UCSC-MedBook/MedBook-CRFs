

Meteor.startup(function() {
    Meteor.publish("metadata", function() {
	var cursor = Collections.CRFmetadataCollection.find() 
	console.log("CRFmetadataCollection", cursor.count())
	return cursor;
    });
});
