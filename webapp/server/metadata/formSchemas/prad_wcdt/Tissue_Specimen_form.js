LoadMetadata("prad_wcdt",{
    "Form_Name": "Tissue_Specimen_form",
    "Fields": [

	Patient_ID_Type,
	{
	    "Field_Name": "Timepoint",
	    "allowedValues": [
		"Baseline",
		"Progression",
		"Progression2",
		"Progression3",
		"Progression4"
	    ],
	    "label": "Timepoint",
	    "type": "String"
	},
	{

	    "Field_Name": "Specimen_ID",
	    "label": "Specimen ID",
	    "optional": false,
	    "type": "String",

		 value: function () {
		    alert(1);
		    /*
		    if (this.isInsert) {
			return new Date;
		    } else if (this.isUpsert) {
			return {$setOnInsert: new Date};
		    } else {
			this.unset();
		    }
		    */
		}

	},

	{
	    "Field_Name": "Procedure_Date",
	    "label": "Procedure Date",
	    "type": "Date",
	    "autoform": autoformDate
	},
	{
	    "Field_Name": "Attending_Radiologist",
	    "label": "Attending Radiologist",
	    "optional": true,
	    "type": "String"
	},
	{
	    "Field_Name": "CRC_at_Collection",
	    "label": "CRC at Collection",
	    "optional": true,
	    "type": "String"
	},
	{
	    "Field_Name": "Number_of_Cores",
	    "decimal": true,
	    "label": "Number of Cores Collected",
	    "type": "Number"
	},

        {
	    "Field_Name": "Cores.$.Core_ID",
	    "type": "String",
	},

        {
	    "Field_Name": "Cores.$.Core_State",
	    "type": "String",
	},

	{
	    "Field_Name": "Fixed_Core_Ship_Date",
	    "autoform": autoformDate,
	    "label": "Fixed Core Ship Date",
	    "optional": true,
	    "type": "Date",
	    "autoform": autoformDate,
	},
	{
	    "Field_Name": "Freezer",
	    "label": "Frozen Core Storage",
	    "max": 200,
	    "optional": true,
	    "type": "String"
	},
	{
	    "Field_Name": "Box_ID",
	    "label": "Box ID",
	    "optional": true,
	    "type": "String"
	},
	{
	    "Field_Name": "Core_Notes",
	    "label": "Core Notes",
	    "optional": true,
	    "type": "String",
	     autoform: {
	      type: "textarea",
	      rows: 10
	    }

	},
	{
	    "Field_Name": "TimepointNotes",
	    "label": "Timepoint Notes*",
	    "max": 2000,
	    "optional": true,
	    "type": "String"
	}
    ]

})
