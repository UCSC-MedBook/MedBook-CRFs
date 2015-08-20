Meteor.startup(function() {

    CRFfieldOrder.SimpleSchemaElement = [
      "Field_Name",
      "Field_Label",
      "Field_Type"
    ];


    CRFfieldOrder.MetaForm = [
       "Form_Name",
       "Fields",
    ];

    CRFprototypes.MetaForm = {
      Form_Name: { 
	  type: "String"
      },
      Fields: {
	  type: [Object]
      },

	"Fields.$.Field_Name": {
	  type: "String",
	},
	"Fields.$.Field_Label": {
	   type: "String",
	   optional: true,
	},
	"Fields.$.Field_Type": {
	   type: "String",
	   allowedValues: [
	    "String",
	    "Number",
	    "Boolean",
	    "Date",
	    "Object",
	    "[String]",
	    "[Number]",
	    "[Boolean]",
	    "[Object]",
	    "[Date]"
	   ]
	},

	"Fields.$.Optional": {
	   type: "Boolean",
	   allowedValues: [ "true", "false"]
	},

    }
});



