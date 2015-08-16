 Meteor.startup(function() {
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
     }});

});
