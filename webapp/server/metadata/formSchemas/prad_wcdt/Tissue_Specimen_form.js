LoadMetadata({
  collaborations: [ "WCDT" ],
  name: "Tissue Specimen Form",
  specificity: "patient",
  fields: [


    Patient_ID_Type,
    {
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

      "label": "Specimen ID",
      "optional": false,
      "type": "String",

      value: function () {
        alert(1);
        /*
        if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
      return {$setOnInsert: new Date};
    } else {
    this.unset();
  }
  */
}

},

{
  "label": "Procedure Date",
  "type": "Date",
  "autoform": autoformDate
},
{
  "label": "Attending Radiologist",
  "optional": true,
  "type": "String"
},
{
  "label": "CRC at Collection",
  "optional": true,
  "type": "String"
},
{
  "decimal": true,
  "label": "Number of Cores Collected",
  "type": "Number"
},

{
  "label": "Cores.$.Core_ID",
  "type": "String",
},

{
  "label": "Cores.$.Core_State",
  "type": "String",
},

{
  "label": "Fixed Core Ship Date",
  "optional": true,
  "type": "Date",
},
{
  "label": "Frozen Core Storage",
  "max": 200,
  "optional": true,
  "type": "String"
},
{
  "label": "Box ID",
  "optional": true,
  "type": "String"
},
{
  "label": "Core Notes",
  "optional": true,
  "type": "String",
  //autoform: {
//    type: "textarea",
//    rows: 10
//  }

},
{
  "label": "Timepoint Notes*",
  "max": 2000,
  "optional": true,
  "type": "String"
}
]

})
