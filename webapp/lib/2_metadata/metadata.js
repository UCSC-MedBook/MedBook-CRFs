

Meteor.startup(function() {

    if (Meteor.isServer) {
	Meteor.publish("metadata", function() {
	    var cursor = CRFmetadataCollection.find() 
	    console.log("CRFmetadataCollection", cursor.count())
	    return cursor;
	});
    } else {
	Meteor.subscribe("metadata");
    }
});
