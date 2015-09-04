

Meteor.startup(function() {
    Meteor.publish("metadata", function() {
	var cursor = Collections.Metadata.find() 
	console.log("Metadata", cursor.count())
	return cursor;
    });
});
