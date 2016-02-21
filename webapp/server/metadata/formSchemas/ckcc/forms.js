LoadMetadata("ckcc", {
    "Form_Name": "CKCC Patient Enrollment",
    "Fields": [
      {
        "type": "String",
        "Field_Name": "Patient_ID"
      },
      {
        "type": "String",
        "Field_Name": "Medical Facility",
        "allowedValues": [
          "CHOC",
          "Stanford",
          "UCSF"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Protocol Name"
      },
      {
        "type": "Number",
        "Field_Name": "Protocol Number",
      },
      {
        "type": "String",
        "Field_Name": "Study design",
        "allowedValues": [
          "Prospective",
          "Retrospective"
        ]
      },
      {
        "type": "Date",
        "Field_Name": "Study Enrollment Start Date",
	"autoform": autoformDate,
      },
      {
        "type": "Date",
        "Field_Name": "Study Enrollment Stop Date",
	"autoform": autoformDate,
	optional: true
      },
      {
        "type": "String",
        "label": "(Exclusion)",
        "Field_Name": "Inclusion Criteria Met?",
        "allowedValues": [
          "Not yet determined",
          "Inclusion Met",
          "Exclusion Met"
        ]
      },
      {
        "type": "Date",
        "Field_Name": "Tissue initial consent form signed date",
	"autoform": autoformDate,
      },
      {
        "type": "Date",
        "Field_Name": "Genomics initial consent form signed date",
	"autoform": autoformDate,
      },
      {
        "type": "Date",
        "Field_Name": "Enrolled in genomics trial date",
	"autoform": autoformDate,
      },
      {
        "type": "String",
        "Field_Name": "Gender",
        "allowedValues": [
          "M",
          "F"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Race",
        "allowedValues": [
          "White",
          "Black/African American",
          "Asian",
          "American Inidian or Alaskan Native",
          "Native Hawaiian or Other Pacific Islander",
          "Other"
        ],
	optional: true
      },
      {
        "type": "String",
        "Field_Name": "Ethnicity",
        "allowedValues": [
          "Not Hispanic or Latino",
          "Hispanic or Latino",
          "Other",
          "Unavailable or not reported"
        ],
	optional: true
      }
    ]
});

LoadMetadata("ckcc", {
    "Form_Name": "Baseline Clinical History",
    "Fields": [
      Patient_ID_Type,
      {
        "type": "String",
        "Field_Name": "History and Physical"
      },
      {
        "type": "Date",
        "Field_Name": "Date of Birth",
	"autoform": autoformDate,
      },
      {
        "type": "Date",
        "Field_Name": "Date of Initial Diagnosis",
	"autoform": autoformDate,
      },
      {
        "type": "Number",
        "Field_Name": "Height",
      },
      {
        "type": "String",
        "Field_Name": "Height Unit",
        "allowedValues": [
          "inches",
          "centimeters"
        ]
      },
      {
        "type": "Number",
        "Field_Name": "Weight",
      },
      {
        "type": "String",
        "Field_Name": "Weight Unit",
        "allowedValues": [
          "kilos",
          "pounds"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Molecular testing on tumor prior to enrollment?",
        "allowedValues": [
          "Y",
          "N"
        ]
      },
      {
        "type": "String",
        "label": "(e.g brain stem, PNET etc)",
        "Field_Name": "Tumor Type "
      },
      {
        "type": "String",
        "Field_Name": "FISH"
      },
      {
        "type": "String",
        "label": "(IHC)",
        "Field_Name": "Immunohistochemistry "
      },
      {
        "type": "String",
        "Field_Name": "Mutation analysis"
      },
      {
        "type": "String",
        "label": "(pick all that apply)",
        "Field_Name": "Next Generation Sequence",
        "allowedValues": [
          "Tumor Whole Genome",
          "Exome",
          "RNA Sequencing",
          "Foundation 1",
          "UCSF 500",
          "SNP array",
          "Relevant treatments / hospitalizations prior to enrollment",
          "Other Gene Panel"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Current medications list"
      },
      {
        "type": "String",
        "Field_Name": "General impression of patient at intake"
      },
      {
        "type": "String",
        "Field_Name": "Comments"
      },
      {
        "type": "String",
        "label": "(pick all that apply)",
        "Field_Name": "Cancer Predisposition",
        "allowedValues": [
          "NF-1",
          "Schwannnomatosis",
          "Tuberous Sclerosis",
          "NF-2",
          "Li-Fraumeni syndrome"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Family History of Cancer?",
        "allowedValues": [
          "Y",
          "N",
          "Unknown"
        ]
      },
      {
        "type": "String",
        "label": "(example: Mother)",
        "Field_Name": "List Family Members",
        "allowedValues": [
          "Text Box"
        ]
      },
      {
        "type": "String",
        "label": "(refer to family members affected)",
        "Field_Name": "Specific Family History of Cancer",
        "allowedValues": [
          "Text Box"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Other Medical Conditions at time of diagnosis",
        "allowedValues": [
          "Text Box"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Pathology report",
        "allowedValues": [
          "Text Box"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Labs",
        "allowedValues": [
          "Text Box"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Diagnostics completed",
        "allowedValues": [
          "Text Box"
        ]
      },
      {
        "type": "String",
        "label": "(pick all that apply)",
        "Field_Name": "Relevant specimens",
        "allowedValues": [
          "Pathology report",
          "Operative report",
          "Surgery",
          "Other"
        ]
      }
    ]
  });
LoadMetadata("ckcc", {
    "Form_Name": "Diagnosis and Progression",
    "Fields": [
      Patient_ID_Type,
      {
        "type": "Date",
        "Field_Name": "Date of diagnosis",
	"autoform": autoformDate,
      },
      {
        "type": "String",
        "Field_Name": "Age at diagnosis "
      },
      {
        "type": "String",
        "Field_Name": "Age at diagnosis unit",
        "allowedValues": [
          "Years",
          "Months",
          "Days"
        ]
      },
      {
        "type": "Date",
        "Field_Name": "Date biological sample taken",
	"autoform": autoformDate,
      },
      {
        "type": "String",
        "Field_Name": "Specify sample type"
      },
      {
        "type": "String",
        "label": "(Allow for more than one sample to be identified and captured)",
        "Field_Name": "Accessioned sample "
      },
      {
        "type": "String",
        "Field_Name": "Diagnosis Type"
      },
      {
        "type": "String",
        "Field_Name": "Initial CNS Tumor"
      },
      {
        "type": "String",
        "Field_Name": "Recurrence"
      },
      {
        "type": "String",
        "Field_Name": "Unavailable"
      },
      {
        "type": "String",
        "Field_Name": "Progressive"
      },
      {
        "type": "String",
        "label": "(States type- Pick file to include: Pending diagnosis then a value pick file specific to that cancer will have to populate to further designate or indicate the type. Please refer to CBTCC/CHOP site)",
        "Field_Name": "Diagnosis "
      },
      {
        "type": "String",
        "Field_Name": "Bone cancer"
      },
      {
        "type": "String",
        "Field_Name": "Osteosarcoma"
      },
      {
        "type": "String",
        "Field_Name": "Ewing sarcoma"
      },
      {
        "type": "String",
        "Field_Name": "Brain"
      },
      {
        "type": "String",
        "Field_Name": "Other central nervous system tumor"
      },
      {
        "type": "String",
        "Field_Name": "Leukemia"
      },
      {
        "type": "String",
        "Field_Name": "Lymphoma"
      },
      {
        "type": "String",
        "Field_Name": "Lodgkin"
      },
      {
        "type": "String",
        "Field_Name": "Non-Hodgkin"
      },
      {
        "type": "String",
        "Field_Name": "Neuroblastoma"
      },
      {
        "type": "String",
        "Field_Name": "Rhabdomyosarcoma"
      },
      {
        "type": "String",
        "Field_Name": "Retinoblastoma"
      },
      {
        "type": "String",
        "label": "(nephroblastoma)",
        "Field_Name": "Wilms Tumor "
      },
      {
        "type": "String",
        "Field_Name": "Other"
      },
      {
        "type": "String",
        "label": "(Lists location i.e. Liver, Brainstem etc)",
        "Field_Name": "Disease Location "
      },
      {
        "type": "String",
        "Field_Name": "Note that a patient can have disease in multiple locations at time of collection"
      },
      {
        "type": "String",
        "Field_Name": "Metastatic Status (Lists either: Metastatic, non metastatic, locally invasive"
      },
      {
        "type": "Date",
        "label": "(Molecular test for each surgery and specimen collected. Abstracted from path report. Suggest including date performed/completed & place to load results hypelinked?)",
        "Field_Name": "Molecular Tests",
	"autoform": autoformDate,
      },
      {
        "type": "Date",
        "Field_Name": "FISH date",
	"autoform": autoformDate,
      },
      {
        "type": "Date",
        "label": "(IHC)",
        "Field_Name": "Immunohistocheimstry date",
	"autoform": autoformDate,
      },
      {
        "type": "Date",
        "Field_Name": "Mutation Analysis date",
	"autoform": autoformDate,
      },
      {
        "type": "String",
        "Field_Name": "Next Generation Sequencing"
      },
      {
        "type": "Date",
        "label": "(tumor /germline)",
        "Field_Name": "Whole Genome date",
	"autoform": autoformDate,
      },
      {
        "type": "Date",
        "Field_Name": "Exome date",
	"autoform": autoformDate,
      },
      {
        "type": "Date",
        "Field_Name": "RNA Sequencing date",
	"autoform": autoformDate,
      },
      {
        "type": "String",
        "Field_Name": "Gene Panel",
        "allowedValues": [
          "Foundation 1",
          "UCSF 500",
          "SNP array",
          "Other"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Metastatic Site",
        "allowedValues": [
          "Bone Marrow",
          "Lung(s)",
          "Brain"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Site of Progression",
        "allowedValues": [
          "Local",
          "Metastatic"
        ]
      },
      {
        "type": "String",
        "Field_Name": "Treatment Plan for current tumor"
      },
      {
        "type": "String",
        "Field_Name": "Chemo"
      },
      {
        "type": "String",
        "Field_Name": "Radiation"
      },
      {
        "type": "String",
        "Field_Name": "Radiation sites"
      },
      {
        "type": "String",
        "Field_Name": "Radiation sites"
      }
    ]
  });
LoadMetadata("ckcc",{
    "Form_Name": "Unanticipated Adverse Events (UAE)",
    "Fields": [
      Patient_ID_Type,
      {
        "type": "Number",
        "Field_Name": "Event Number"
      },
      {
        "type": "String",
        "Field_Name": "Event Name"
      },
      {
        "type": "String",
        "label": "(free text)",
        "Field_Name": "Event Description "
      },
      {
        "type": "Date",
        "Field_Name": "UAE Start Date",
	"autoform": autoformDate,
	optional: true
      },
      {
        "type": "Date",
        "Field_Name": "UAE Stop Date",
	"autoform": autoformDate,
	optional: true
      },
      {
        "type": "Date",
        "Field_Name": "UAE Ongoing as of date",
	"autoform": autoformDate,
	optional: true
      },
      {
        "type": "String",
        "Field_Name": "Related to Treatment?",
        "allowedValues": [
          "Y",
          "N",
          "UNK",
          "",
          "Y",
          "N",
          "UNK"
        ]
      },
      {
        "type": "String",
        "label": "(if any Provide Tx provided)",
        "Field_Name": "Event Treatment",
	optional: true,
      },
      {
        "type": "String",
        "label": "(eg. Event resolved without sequelae, death etc)",
        "Field_Name": "Outcome of event",
	optional: true,
      }
    ]
  });
LoadMetadata("ckcc", {
    "Form_Name": "Treatment",

    "Fields": [
      Patient_ID_Type,

      {
        "type": "String",
        "label": "(examples: Hospitalization, Radiation, Chemotherapy)",
        "Field_Name": "Name of Treatment",
        "allowedValues": [
          ""
        ],
	optional: true,
      },
      {
        "type": "Date",
        "Field_Name": "Admit date",
	"autoform": autoformDate,
	optional: true,
      },
      {
        "type": "Date",
        "Field_Name": "Discharge date",
	"autoform": autoformDate,
	optional: true,
      },
      {
        "type": "Date",
        "Field_Name": "Treatment date",
	"autoform": autoformDate,
	optional: true,
      },
      {
        "type": "String",
        "Field_Name": "Outcomes",
	optional: true,
      }
    ]
  });
LoadMetadata("ckcc", {
    "Form_Name": "Medications List",
    "Fields": [
      Patient_ID_Type,
      {
        "type": "String",
        "Field_Name": "Medication Name",
	optional: true,
      },
      {
        "type": "String",
        "Field_Name": "Dosage",
	optional: true,
      },
      {
        "type": "String",
        "Field_Name": "Route",
	optional: true,
      },
      {
        "type": "Date",
        "Field_Name": "Start Date",
	"autoform": autoformDate,
	optional: true,
      },
      {
        "type": "Date",
        "Field_Name": "Stop Date",
	"autoform": autoformDate,
	optional: true,
      },
      {
        "type": "String",
        "Field_Name": "Contraindications",
	optional: true,
      },
      {
        "type": "String",
        "Field_Name": "Comments",
	optional: true,
      }
    ]
});
LoadMetadata("ckcc",{
    "Form_Name": "Study Completion",
    "Fields": [
      Patient_ID_Type,
      {
        "type": "String",
        "Field_Name": "Withdrew?",
        "allowedValues": [
          "Y",
          "N"
        ],
	optional: true,
      },
      {
        "type": "Date",
        "Field_Name": "Patient study completion date",
	"autoform": autoformDate,
	optional: true,
      },
      {
        "type": "Date",
        "Field_Name": "Patient withdrew from study date",
	"autoform": autoformDate,
	optional: true,
      },
      {
        "type": "Date",
        "Field_Name": "Patient expire date",
	"autoform": autoformDate,
	optional: true,
      },
      {
        "type": "String",
        "Field_Name": "Cause of death",
	optional: true,
      },
      {
        "type": "String",
        "Field_Name": "ICD10 Code",
	optional: true,
      },
      {
        "type": "Date",
        "Field_Name": "Patient status unknown date",
	"autoform": autoformDate,
	optional: true,
      }
    ]
});
