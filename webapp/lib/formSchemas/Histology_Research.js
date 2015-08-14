Meteor.startup(function() {
  CRFprototypes.Histology_Research = {
    // "Patient_ID": Patient_ID_Type,
    "Sample_ID": Sample_ID_Type,
    "Mutated_Genes": _.clone(Mutated_GeneList_type),
    "Immunohistochemistry_Upregulated_Genes": _.clone(Mutated_GeneList_type),
    Histology_Call: { type: 'String',
      allowedValues: [
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
    },
    Adeno:        { type: 'String' },
    Small_Cell:   { type: 'String' },
    Trichotomy:   { type: 'String' },
  };

  CRFfieldOrder.Histology_Research =  [
    // "Patient_ID",
    "Sample_ID",
    /*"Mutated_Genes",
    "Immunohistochemistry_Upregulated_Genes",*/
    "Histology_Call",
    "Adeno",
    "Small_Cell",
    "Trichotomy",
  ];

});
