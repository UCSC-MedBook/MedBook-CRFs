
// Initialize and migrate data

LoadMetadata = function(study, preload) {
    Meteor.startup(function() {
	// console.log("LoadMetadata(", study, preload, ")");
       

	var fo = _.pluck(preload.Fields, "Field_Name");
	var fs = _.clone(preload);
	var schema = {};
	fs.Fields.map(function(field) {
	   field = _.clone(field);
	   var name = field["Field_Name"];
	   delete field["Field_Name"];
	   schema[name] = field;
	});


	var n = Collections.Metadata.update({_id: preload.Form_Name},
	  {
	    _id: preload.Form_Name,
	    name: preload.Form_Name,
	    incompleteCount: 0,
	    schema: JSON.stringify(schema),
	    metadata: preload,
	    fieldOrder: fo,
	    study: study,
	  }
	  ,
	  {
	    upsert: true
	  })


	var ret = Collections.Studies.update({id: study}, {$addToSet: {tables: preload.Form_Name}});
	// console.log("ret", ret);
	if (ret == 0)
	   throw new Error("could not update " + study + " with " + preload.Form_Name);

    })
}



Meteor.startup(function() {
    Meteor.publish("metadata", function() {
	var cursor = Collections.Metadata.find() 
	console.log("Metadata", cursor.count())
	return cursor;
    });
});
