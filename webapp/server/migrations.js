// Initialize and migrate data
initializeMetadata = function() {
  console.log("initializeMetadata");

  function initializeCollectionCRF(collectionName, nthCollection) {
    // console.log("initializeCollectionCRF >  CRFinit", Object.keys(CRFinit), collectionName);

    /*
    var aCRFcollection = collectionName in Collections ? Collections[collectionName] : new Mongo.Collection(collectionName);
    Collections[collectionName] = aCRFcollection;
    if (Meteor.isServer)
    aCRFcollection.remove({});
    if (Meteor.isClient)
       window[collectionName] = aCRFcollection;
    */

    var fo = _.pluck(CRFinit[collectionName].Fields, "Field_Name");
    var fs = _.clone(CRFinit[collectionName]);
    var schema = {};
    fs.Fields.map(function(field) {
       field = _.clone(field);
       var name = field["Field_Name"];
       delete field["Field_Name"];
       schema[name] = field;
    });


      var n = Collections.Metadata.update({_id: collectionName},
      {
        _id: collectionName,
        name: collectionName,
        n: nthCollection,
        incompleteCount: 0,
        schema: schema,
	metadata: CRFinit[collectionName],
        fieldOrder: fo,
	study: this.study,
      }
      ,
      {
        upsert: true
      })


      // console.log("before", this.study, collectionName);
      Collections.studies.update({name: this.study}, {$addToSet: {tables: collectionName}});

    }

  _.each(admin_crfs, initializeCollectionCRF, {study: 'admin'}); 
  _.each(prad_wcdt_crfs, initializeCollectionCRF, {study: 'prad_wcdt'});
  _.each(common_crfs, initializeCollectionCRF, {study: 'common'}); 




	if (!('DataMigrations' in Collections)) {
	    Collections.DataMigrations = new Meteor.Collection("DataMigrations");
	}

	var migrationName = 'CRFunification 20150901-D' 
	var migration = Collections.DataMigrations.findOne({name: migrationName});

	if (migration == null) {
	    Collections.CRFs.remove({});
	    common_crfs.concat(prad_wcdt_crfs).map(function(collName) {

		var count = 0;
		var coll = new Meteor.Collection(collName);
		coll.find({}).forEach(function(doc) {
		    count++;

		    doc.study = 'prad_wcdt'; // needs both
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

	    var updateClause = {};
	    updateClause[field + 's'] = { $each: sortedSet };

	    var updateResult = Collections.studies.update(
	       { id: "prad_wcdt" },
	       { $addToSet: updateClause }
	     );
	    var final = Collections.studies.findOne( { id: "prad_wcdt" } );
	    // console.log("maintain_prad_wcdt", updateClause, sortedSet, updateResult, "\nfinal", final);

	  };
         maintain_prad_wcdt("Patient_ID");
         maintain_prad_wcdt("Sample_ID");

};
Meteor.startup( initializeMetadata );
