Meteor.startup( function() {
    console.log("initialize Migrations");

    if (!('DataMigrations' in Collections)) {
        Collections.DataMigrations = new Meteor.Collection("DataMigrations");
    }

    function migrateCollection(collName, query) {

        var count = 0;
        var countInserted = 0;
        var coll = new Meteor.Collection(collName);
        Collections[collName] = coll;
        if (query == null)
            query = {};
        coll.find(query).forEach(function(doc) {
            count++;

            doc.Study_ID = query.Study_ID ? query.Study_ID : 'prad_wcdt'; // needs both
            doc.CRF = collName;
            delete doc["_id"];

            if (Collections.CRFs.findOne({ Patient_ID: doc.Patient_ID, Sample_ID: doc.Sample_ID, CRF: doc.CRF }) == null) {
                var ret = Collections.CRFs.insert(doc);
                if (ret) {
                    countInserted++;
                }
            }

        });
        console.log("migration", collName, count, countInserted, query);
    };


    Migration = function(migrationName, func) {
        var migration = Collections.DataMigrations.findOne({name: migrationName});
        if (migration == null) {
            console.log("migrating", migrationName);
	    try {
		func();
                Collections.DataMigrations.insert({name: migrationName});
                console.log("migrating", migrationName, "success");
	    } catch (error) {
                console.log("migrating", migrationName, "FAIL", error);
	    }
        }
    }

    /* DANGEROUS 
    Migration('CRFunification 20151107-A', function() {
        Collections.CRFs.remove({});
        console.log("Migration before CRFs", Collections.CRFs.find().count());
        for (var i = 0; i < prad_wcdt_unique_crfs.length; i++)
            migrateCollection(prad_wcdt_unique_crfs[i]);
        migrateCollection("Clinical_Info", {Study_ID: "prad_tcga"});
        console.log("Migration after CRFs", Collections.CRFs.find().count());
        ingestOncore();
    });
    */
    Migration('Add BL 20160131-D', function() {
        var n = 0;
	Specimen_IDs  = [];

        Collections.CRFs.find({CRF: "Tissue_Specimen_form", Patient_ID: /DTB.*/ }).forEach(
	  function (doc) {
	    var Specimen_ID = doc.Patient_ID + "BL";
	    Specimen_IDs.push(Specimen_ID);
	    n += Collections.CRFs.update({_id: doc._id},
	        {$set: {Specimen_ID: Specimen_ID, Study_ID: "prad_wcdt" }});
	});
        var updateResult = Collections.studies.update(
           { id: "prad_wcdt" },
	   { $addToSet: { Specimen_IDs: { $each: Specimen_IDs } } }
         );
	console.log('Add BL n=', n);
    });

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

});
