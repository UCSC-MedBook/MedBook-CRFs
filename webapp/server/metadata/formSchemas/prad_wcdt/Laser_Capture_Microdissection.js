LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "Laster Capture Microdissection",
  specificity: "sample",
  fields: [

    {
      "allowedValues": CoreAllowedValues,
      "label": "Core",
      "max": 200,
      "type": "select"
    },
    {
      //    "autoform": {
      //	"afFieldInput": {
      //		    "type": "bootstrap-datepicker",
      //		    "timezoneId": "America/Los_Angeles"
      //		}
      //    },
      "label": "Completion Date",
      "type": "Date",
      "autoform": autoformDate,
    },
    {
      "label": "SlideNumber",
      "max": 10,
      "min": 1,
      "type": "Number"
    },
    {

      "label": "Estimated total capture area: [1-20] (float) mm^2",
      "max": 20,
      "min": 1,
      "type": "Number"
    },
    {

      "label": "Lysates [1-4]",
      "max": 4,
      "min": 1,
      "type": "Number"
    },
    {
      "label": "Lysate volume: [50-200] microliters",
      "max": 200,
      "min": 50,
      "type": "Number"
    },
    {
      "allowedValues": [
        "RNA analysis",
        "DNA analysis",
        "aCGH analysis"
      ],
      "label": "Downstream use",
      "max": 200,
      "type": "select"
    }
  ]

})
