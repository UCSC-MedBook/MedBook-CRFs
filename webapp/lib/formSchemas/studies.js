Meteor.startup(function() {
  CRFprototypes.studies = {
    "cbio_id" : { optional: true, type: 'Number', decimal: true },
  	"id" : { optional: true, type: 'String'},
  	"type_of_cancer_id" :  { optional: true, type: 'String'},
  	"name" :  { optional: true, type: 'String'},
  	"short_name" :  { optional: true, type: 'String'},
  	"description" :  { optional: true, type: 'String'},
  	"public" : { optional: true, type: 'Number', decimal: true },
  	"pmid" :  { optional: true, type: 'String'},
  	"citation" :  { optional: true, type: 'String'},
  	"collaborations" :  { optional: true, type: '[String]'},
  	"tables" :  { optional: true, type: [String]},
  };

  CRFfieldOrder.studies = [
    "cbio_id",
  	"id",
  	"type_of_cancer_id",
  	"name",
  	"short_name",
  	"description",
  	"public",
  	"pmid",
  	"citation",
  	"collaborations",
  	"tables",
  ];

});
