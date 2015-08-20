 Meteor.startup(function() {
     Collections.studies.upsert({id: "admin"}, {$set: { 
	"cbio_id" : "?",
	"id" : "admin",
	"type_of_cancer_id" : "many",
	"name" : "admin",
	"short_name" : "admin",
	"description" : "",
	"public" : false,
	"pmid" : "NULL",
        "citation" :  "admin",
        "collaborations" :  ["admin"],
	"tables": [],
     }});

     Collections.studies.upsert({id: "prad_wcdt"}, {$set: { 
	"cbio_id" : "112",
	"id" : "prad_wcdt",
	"type_of_cancer_id" : "prad",
	"name" : "West Coast Prostate Cancer Dream Team",
	"short_name" : "WCDT",
	"description" : "Castration Resistant Prostate Cancer",
	"public" : false,
	"pmid" : "NULL",
        "citation" :  "unpublished",
        "collaborations" :  ["WCDT"],
	"tables": [],
     }});

     Collections.studies.upsert({id: "prad_tcga"}, {$set: { 
	"cbio_id" : "?",
	"id" : "prad_tcga",
	"type_of_cancer_id" : "prad",
	"name" : "NIH TCGA Prostate Cancer",
	"short_name" : "Prad TCGA",
	"description" : "Large NIH study of Prostate Cancer",
	"public" : true,
	"pmid" : "NULL",
        "citation" :  "Schultz 2015",
        "collaborations" :  ["public"],
	"tables": [],
     }});

     Collections.studies.upsert({id: "ckcc"}, {$set: { 
	"cbio_id" : "?",
	"id" : "ckcc",
	"type_of_cancer_id" : "many",
	"name" : "Califoria Kids Cancer Comparison",
	"short_name" : "CKCC",
	"description" : "",
	"public" : false,
	"pmid" : "NULL",
        "citation" :  "unpublished",
        "collaborations" :  ["ckcc"],
	"tables": [],
     }});

     Collections.studies.upsert({id: "treehouse"}, {$set: { 
	"cbio_id" : "?",
	"id" : "treehouse",
	"type_of_cancer_id" : "many",
	"name" : "Treehouseproject",
	"short_name" : "treehouse",
	"description" : "",
	"public" : false,
	"pmid" : "NULL",
        "citation" :  "unpublished",
        "collaborations" :  ["treehouse"],
	"tables": [],
     }});


     function maintainReferentialIntegrity() {
	  console.log("maintainReferentialIntegrity");
	  CRFmetadataCollection.find({study: {$exists: 1}}).forEach( function (table) {
	     if (table.study && table.study.length > 0) {
		  var n = Collections.studies.update({id: table.study}, {$addToSet: {tables: table.name}});
		  console.log("maintainReferentialIntegrity", table.study, table.name, n);
	     }
	  });
     }
     maintainReferentialIntegrity();


});
