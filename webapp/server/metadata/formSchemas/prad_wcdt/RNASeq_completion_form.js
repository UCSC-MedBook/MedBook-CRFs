LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "RNASeq Completion Form",
  specificity: "patient",
  fields: [

    Patient_ID_Type,
    {
      "label": "QC reports",
      "type": "String"
    },
    {
      "label": "RIN score from UCSF",
      "type": "Number"
    },
    {
      "label": "date completed",
      "type": "Date",
    },
    {
      "label": "date received",
      "type": "Date",
    },
    {
      "allowedValues": [
        "Illumina TruSeq Non-stranded",
        "Illumina TruSeq stranded",
        "NuGen non-stranded",
        "NuGen stranded",
        "Clone Tech stranded",
        "Clone Tech non-stranded"
      ],
      "label": "library prep used",
      "max": 200,
      "type": "Select"
    },
    {
      "label": "library prep notes",
      "type": "String"
    },
    {
      "label": "location of fastq file",
      "type": "String"
    }
  ]

})
