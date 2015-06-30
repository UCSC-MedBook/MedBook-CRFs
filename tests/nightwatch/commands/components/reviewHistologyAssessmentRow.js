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
      this
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Sample_ID")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(1) td:nth-child(1)")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(1) td:nth-child(2)")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(2) td:nth-child(1)")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(2) td:nth-child(2)")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(3) td:nth-child(1)")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(3) td:nth-child(2)")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(4) td:nth-child(1)")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(4) td:nth-child(2)")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(5) td:nth-child(1)")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(5) td:nth-child(2)")


        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Sample_ID", histologyAssessmentRecord.sampleId )

        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(1) td:nth-child(1)", "BlockImage")
        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(2) td:nth-child(1)", "BlockStatus")
        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(3) td:nth-child(1)", "Core")
        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(4) td:nth-child(1)", "ReferenceSlideImages")
        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(5) td:nth-child(1)", "ReferenceSlideNumber")

        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(1) td:nth-child(2)", histologyAssessmentRecord.blockImage)
        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(2) td:nth-child(2)", histologyAssessmentRecord.blockStatus )
        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(3) td:nth-child(2)", histologyAssessmentRecord.core )
        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(4) td:nth-child(2)", histologyAssessmentRecord.ReferenceSlideImages )
        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores table tbody tr:nth-child(5) td:nth-child(2)", histologyAssessmentRecord.referenceSlideNumber )

    }



  return this;
};
