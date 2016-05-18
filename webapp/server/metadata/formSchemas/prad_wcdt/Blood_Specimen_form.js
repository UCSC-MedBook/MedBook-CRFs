LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "Blood Specimen form",
  specificity: "patient",
  fields: [
    {
      "label": "Timepoint",
      "allowedValues": [
        "Baseline",
        "3 Months",
        "Progression",
        "Progression2",
        "Progression3"
      ],
      "label": "Collection Timepoint",
      "type": "selection"
    },
    {
      "label": "Draw Date",
      "type": "Date",
      "autoform": autoformDate,
    },
    {
      "label": "CRC at Collection",
      "optional": true,
      "type": "String"
    }
  ]
});
