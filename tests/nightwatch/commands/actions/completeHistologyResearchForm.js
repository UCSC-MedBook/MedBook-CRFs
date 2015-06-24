/*
var histologyResearch = {
  sampleId: "",
  mutatedGenes: "",
  immunohistochemistry: "",
  histologyCall: "",
  adeno: "",
  smallCell: "",
  trichotomy: ""
}*/



exports.command = function(histologyResearch) {
  this
    .verify.elementPresent("form")

    .verify.elementPresent('select[name="Sample_ID"]')
    .verify.elementPresent('input[prop="Mutated_Genes"]')
    .verify.elementPresent('input[prop="Immunohistochemistry_Upregulated_Genes"]')
    .verify.elementPresent('select[name="Histology_Call"]')
    .verify.elementPresent('input[name="Adeno"]')
    .verify.elementPresent('input[name="Small_Cell"]')
    .verify.elementPresent('input[name="Trichotomy"]')

    if(histologyResearch){
      this
        .setValue('select[name="Sample_ID"]', histologyResearch.sampleId)
        .setValue('input[prop="Mutated_Genes"]', histologyResearch.mutatedGenes)
        .setValue('input[prop="Immunohistochemistry_Upregulated_Genes"]', histologyResearch.immunohistochemistry)
        .setValue('select[name="Histology_Call"]', histologyResearch.histologyCall)
        .setValue('input[name="Adeno"]', histologyResearch.adeno)
        .setValue('input[name="Small_Cell"]', histologyResearch.smallCell)
        .setValue('input[name="Trichotomy"]', histologyResearch.trichotomy)

        .verify.elementPresent('button[type="submit"]')
      }


  return this;
};
