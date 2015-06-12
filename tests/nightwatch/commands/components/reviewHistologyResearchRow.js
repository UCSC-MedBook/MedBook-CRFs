    /*var histologyResearchRecord = {
      sampleId: "",
      mutatedGenes: "",
      immunohistochemistry: "",
      histologyCall: "",
      adeno: "",
      smallCell: "",
      trichotomy: ""
    }*/


exports.command = function(histologyResearchRecord, rowIndex) {
  this
    .verify.elementPresent("table thead tr")
    .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ")")

    if(histologyResearchRecord){
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Sample_ID")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Mutated_Genes")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Immunohistochemistry_Upregulated_Genes")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Histology_Call")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Adeno")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Small_Cell")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Trichotomy")

      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Sample_ID", histologyResearchRecord.sampleId )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Mutated_Genes", histologyResearchRecord.mutatedGenes )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Immunohistochemistry_Upregulated_Genes", histologyResearchRecord.immunohistochemistry )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Histology_Call", histologyResearchRecord.histologyCall )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Adeno", histologyResearchRecord.adeno )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Small_Cell", histologyResearchRecord.smallCell )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Trichotomy", histologyResearchRecord.trichotomy )      
    }


  return this;
};
