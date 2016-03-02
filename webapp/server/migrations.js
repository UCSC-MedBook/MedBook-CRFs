Meteor.startup( function() {
    console.log("initialize Migrations");


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

    Migration("Rename core fields 20160205 C", function() {
        var n = 0;
	Collections.CRFs.find({ CRF: 'Tissue_Specimen_form',
	    'Cores.0.ID': { $exists: 1 } }).forEach(function(item) {    
		for(i = 0; i != item.Cores.length; ++i) {
		    item.Cores[i].Core_ID = item.Cores[i].ID;
		    delete item.Cores[i].ID;

		    item.Cores[i].Core_State = item.Cores[i].Core;
		    delete item.Cores[i].Core;
		}

		Collections.CRFs.update({_id: item._id}, item);
		n++;
	    });
	console.log("n=", n );
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

      Migration("expression2 to gene_expression 20160221", function() {
         var gene_expression = new Meteor.Collection("gene_expression");
         gene_expression._ensureIndex({gene_label: 1, sample_label: 1});

          Expression.find().forEach(function(doc) {
	    Object.keys(doc.samples).map(function(sample_label) {
	       var log2 = doc.samples[sample_label].rsem_quan_log2;
	       var log = log2 * Math.LN2;
	       var counts = Math.exp(log) - 1; // approximate counts
	       var data = {
		    gene_label: doc.gene,
		    sample_label: sample_label,
		    study_label: doc.Study_ID,
		    collaborations: doc.Collaborations,
		    values: {
			"quantile_counts_log" : log2,
			"quantile_counts" : counts,
		    }
		};
		var old = gene_expression.findOne( {gene_label: doc.gene, sample_label: sample_label});
		if (old == null) {
		    gene_expression.insert(data);
		}

	    }) // keys.map
	}) //expression2.foreach
     }); // Migration

     function read_TCGA_Clinical_Matrix(filename, Study_ID, CRF) {

	 fs = Npm.require("fs");
	 console.log("filename", filename);
	 var lines = fs.readFileSync(filename, "utf8").split("\n")
	 var array = lines.map(function(line) { return line.split("\t")});
	 var header = array[0];

	 var count = 0;
	 for (var i = 1; i < array.length; i++) {
	     var Sample_ID = array[i][0];
	     var Patient_ID = Sample_ID.substring(0,12);
	     var doc = { Patient_ID: Patient_ID, Study_ID: Study_ID, CRF: CRF };

	     for (var j = 0; j < header.length; j++) 
	         doc[header[j]] = array[i][j];
	     
             var ret = Collections.CRFs.direct.upsert({ Sample_ID: doc.Sample_ID, CRF: doc.CRF }, doc);
	     if (ret.numberAffected != 1) {
		 console.log("failed to upsert", doc);
		 throw new Error("failed to upsert", String(doc));
	     }
	     count++;
	     if ((count % 100) == 0)
		 console.log("progress", count, "/", array.length);
	 }
	 return count;
     }

     Migration("Ingest TCGA PANCAN 20160302", function() {
	 var CRF = "TCGA_Clinical_Info";
	 var filename = process.env.MEBBOOK_APP_DATA+ "/TCGA_PANCAN_clinicaMatrix.tsv";
	 var count = read_TCGA_Clinical_Matrix(filename, "tcga", "TCGA_Clinical_Info");
	 console.log("Ingest TCGA PANCAN ingest", count);
	 throw new Error("not done");
     }); // Migration
});
