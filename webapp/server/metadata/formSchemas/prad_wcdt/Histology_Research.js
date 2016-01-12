LoadMetadata("prad_wcdt",{

    "Form_Name": "Histology_Research",
    "Fields": [
	Sample_ID_Type,
	/*
	 * OLD Names
	 *
	{
	    "Field_Name": "Histology_Call", // Histology_Call_prev
	    "allowedValues": [
		"Adeno",
		"Small Cell",
		"IAC/Adeno",
		"IAC",
		"Indeterminate",
		"Intermediate",
		"IAC/SC",
		"Adeno/SC",
		"Unavailable",
		"QNS"
	    ],
	    "type": "String"
	},
	*/

	/*
	 * NEW Names
	 */

	{
	    "Field_Name": "Histology_Call",
	    "allowedValues": [
		"Adeno", // (Adenocarcinoma)",
		"SCNC", // (Small cell/neuroendocrine prostate cancer)",
		"IAC", // (Intermediate Atypical Carcinoma)",
		"SCNC+IAC", // (Mixed population: Small cell/neuroendocrine + Intermediate atypical carcinoma)",
		"SCNC+Adeno", // (Mixed population: Small cell/Neuroendocrine + Adenocarcinoma)",
		"Adeno+IAC", // (Mixed Population: Adenocarcinoma + Intermediate atypical carcinoma)",
		"Cytology mixed", // (Cytology/Architecture mixture)",
		"Unavailable",
		"QNS (Insufficient tissue to characterize)",
	    ],
	    "type": "String"
	},

	{
	    "Field_Name": "Adeno",
	    "type": "String"

	},

	{
	    "Field_Name": "Small_Cell",
	    "type": "String"
	},
	{
	    "Field_Name": "Trichotomy",
	    "type": "String"
	},

    ]

})
