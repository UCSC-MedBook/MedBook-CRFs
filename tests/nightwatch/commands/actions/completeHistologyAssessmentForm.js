/*var histologyAssessment = {
  sampleId: "",
  core: "",
  blockImage: "",
  referenceSlideNumber: "",
  referenceSlideImages: "",
  blockStatus: ""
}*/

exports.command = function(histologyAssessment) {
  this
    .verify.elementPresent("form")

    .verify.elementPresent('input[name="Sample_ID"]')
    .verify.elementPresent('select[name="Cores.0.Core"]')
    .verify.elementPresent('input[name="Cores.0.BlockImage"]')
    .verify.elementPresent('input[name="Cores.0.ReferenceSlideNumber"]')
    .verify.elementPresent('input[name="Cores.0.ReferenceSlideImages"]')
    .verify.elementPresent('select[name="Cores.0.BlockStatus"]')

    if(histologyAssessment){
      this
        .setValue('input[name="Sample_ID"]', histologyAssessment.sampleId)
        .setValue('select[name="Cores.0.Core"]', histologyAssessment.core)
        .setValue('input[name="Cores.0.BlockImage"]', histologyAssessment.blockImage)
        .setValue('input[name="Cores.0.ReferenceSlideNumber"]', histologyAssessment.referenceSlideNumber)
        .setValue('input[name="Cores.0.ReferenceSlideImages"]', histologyAssessment.referenceSlideImages)
        .setValue('select[name="Cores.0.BlockStatus"]', histologyAssessment.blockStatus)

        .verify.elementPresent('button[type="submit"]')
    }

  return this;
};
