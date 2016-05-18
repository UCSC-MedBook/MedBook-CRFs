LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "Treatment Response Form",
  specificity: "patient",
  fields: [

    {
      "allowedValues": [
        "Naive",
        "Resistant"
      ],
      "label": "Prior Abi response",
      "optional": true,
      "type": "Select"
    },
    {
      "allowedValues": [
        "Yes",
        "No",
        "Unk"
      ],
      "label": "Prior enza response",
      "optional": true,
      "type": "Select"
    },
    {
      "allowedValues": [
        "Naive",
        "Resistant"
      ],
      "label": "Prior Enzalutamide response",
      "optional": true,
      "type": "Select"
    },
    {
      "allowedValues": [
        "Yes",
        "No",
        "Unk"
      ],
      "label": "Prior enza response",
      "optional": true,
      "type": "Select"
    },
    {
      "allowedValues": [
        "Abiraterone",
        "BIND-014",
        "Cabazitaxel",
        "Carbo/taxotere",
        "Carboplatin/taxotere",
        "Cisplatin/etoposide",
        "Enzalutamide",
        "Enzalutamide + radium-223",
        "Mitoxantrone",
        "Post-biopsy treatment",
        "Radium-223",
        "Taxotere",
        "Taxotere + MLN8237",
        "Unk"
      ],
      "label": "Post Biopsy treatment",
      "optional": true,
      "type": "Select"
    }
  ]

})
