    /*var histologyResearchRecord = {
      sampleId: "",
      mutatedGenes: "",
      immunohistochemistry: "",
      histologyCall: "",
      adeno: "",
      smallCell: "",
      trichotomy: ""
    }*/


exports.command = function(histologyAssessmentRecord, rowIndex) {
  this
    .verify.elementPresent("table thead tr")
    .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ")")

    if(histologyAssessmentRecord){
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Sample_ID")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores")

      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Sample_ID", histologyAssessmentRecord.sampleId )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores", histologyAssessmentRecord.mutatedGenes )
      /*.verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores", histologyAssessmentRecord.immunohistochemistry )      
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores", histologyAssessmentRecord.histologyCall )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores", histologyAssessmentRecord.adeno )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores", histologyAssessmentRecord.smallCell )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores", histologyAssessmentRecord.trichotomy )      */
    }



  return this;
};
