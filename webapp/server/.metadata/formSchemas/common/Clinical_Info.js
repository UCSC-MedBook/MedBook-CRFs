LoadMetadata({
  collaborations: [ "UCSC Forms" ],
  name: "Clinical_Info",
  specificity: "sample",
  fields: [
    {
	    "label": "Prior Treatments",
	    "optional": true,
	    "type": "[String]",
  	},
    {
	    "label": "Biopsy Date",
	    "optional": true,
	    "type": "Date",
  	},
    {
	    "label": "Subsequent Treatments",
	    "optional": true,
	    "type": "[String]",
  	},
    {
      "label": "Biopsy site",
	    "allowedValues": [
    		"Adrenal",
    		"Bladder",
    		"Bone",
    		"Brain",
    		"Liver",
    		"Lung",
    		"Lymph node",
    		"Soft tissue",
    		"Other"
	    ],
	    "optional": true,
	    "type": "String",
  	},

    // some fields missing, to be filled in later
    {
	    "label": "Age",
	    "optional": true,
	    "type": "Number", // "Decimal" if {"decimal": true}
	   },
  ],
});
