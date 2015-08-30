Meteor.startup(function() {
    if (Meteor.isServer) {

	if (!('DataMigrations' in Collections)) {
	    Collections.DataMigrations = new Meteor.Collection("DataMigrations");
	}

	var migrationName = 'CRFunification 20150830' 
	var migration = Collections.DataMigrations.findOne({name: migrationName});

	if (migration == null) {
	    prad_wcdt_crfs.map(function(collName) {
		var count = 0;
		var coll = new Meteor.Collection(collName);
		coll.find({}).forEach(function(doc) {
		    count++;
		    doc.CRF = collName;
		    if (Collections.CRFs.findOne({_id: doc._id}) == null)
			Collections.CRFs.insert(doc);
		});
		console.log("migration", collName, count);
	    });
	    Collections.DataMigrations.insert({name: migrationName});

	} //if migration



	function maintain_prad_wcdt(field)  {
	    var fields = {};
	    fields[field] = 1;
	    var objectList = Collections.CRFs.find({ CRF: {$in: ["SU2C_Biopsy_V3", "Biopsy_Research", "Clinical_Info"] }}, { fields: fields}).fetch();
	    var aList = objectList.map(function(object) { return object[field]}).filter(function(element) { return element != null });
	    var sortedSet = _.union(aList).sort();


	    var updateResult = Collections.studies.update(
	       { id: "prad_wcdt" },
	       { $addToSet: { tags: { $each: sortedSet } } }
	     );
	    console.log("maintain_prad_wcdt", field, sortedSet, updateResult);

	  };
	  maintain_prad_wcdt("Patient_ID");
          maintain_prad_wcdt("Sample_ID");
    }

});
