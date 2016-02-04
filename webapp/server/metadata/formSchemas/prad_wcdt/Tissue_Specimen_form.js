LoadMetadata("prad_wcdt",{
    "Form_Name": "Tissue_Specimen_form",
    "Fields": [

	Patient_ID_Type,
	{

	    "Field_Name": "Specimen_ID",
	    "label": "Specimen ID",
	    "optional": false,
	    "type": "String"
	},

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
	    "Field_Name": "Cores",
	    "label": "Cores",
	    "optional": false,
	    "type": "Array",
	},
        {
	    "Field_Name": "Cores.$",
	    "label": "Test",
	    "optional": false,
	    "type": "Object",
	    "autoform": { afFieldInput: { type: 'bootstrap-TestType', 
	        subdocument: "Tissue_Specimen_core",
	    } }
	},
    ]
});


LoadMetadata("prad_wcdt",{
    "Form_Name": "Tissue_Specimen_core",
    Fields: [
	{
	    "Field_Name": "Cores",
	    "optional": true,
	    "type": [
		null
	    ]
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
	    "type": "String"
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
