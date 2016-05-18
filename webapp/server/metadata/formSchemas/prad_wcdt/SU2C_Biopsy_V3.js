LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "SU2C Biopsy V3",
  specificity: "sample",
  fields: [


	{
	    "label": "Site",
	    "optional": true,
	    "type": "String"
	},
	{
	    "label": "Date_of_Procedure",
	    "optional": true,
	    "type": "Date",
	},
	{
	    "label": "Date_of_Procedure_Ext",
	    "optional": true,
	    "type": "String"
	},
	{
	    "label": "Visit_Date",
	    "optional": true,
	    "type": "Date",
	},
	{
	    "label": "List_all_anticancer_meds__including_steroids__taken_within_the_7_days_leading_up_to_biopsy",
	    "optional": true,
	    "type": "String"
	},
	{
	    "label": "If_Patient_took_a_Steroid_in_the_Last_7_Days__was_it_within_24_hours_of_Biopsy?",
	    "optional": true,
	    "type": "String"
	},
	{
	    label: "Was it a Tapered Dose?",
	    "optional": true,
	    "type": "String"
	},
	{
	    "label": "Day",
	    "optional": true,
	    "type": "Number"
	},
	{
	    "label": "Phase",
	    "optional": true,
	    "type": "String"
	},
	{
	    "label": "Segment",
	    "optional": true,
	    "type": "String"
	},
	{
	    "label": "Arm",
	    "optional": true,
	    "type": "String"
	}
    ]
})
