/*
var laserCapture = {
  patientId: "",
  core: "",
  completionDate: "",
  slideNumber: "",
  estimatedTotalCaptureArea: "",
  lysates: "",
  lystatesVolume: "",
  downstreamUse: ""
}*/


exports.command = function(laserCapture) {
  this
    .verify.elementPresent("form")

    .verify.elementPresent('input[name="Sample_ID"]')
    .verify.elementPresent('select[name="Core"]')
    .verify.elementPresent('input[name="Completion_Date"]')
    .verify.elementPresent('input[name="SlideNumber"]')
    .verify.elementPresent('input[name="Estimated_total_capture_area"]')
    .verify.elementPresent('input[name="Lysates"]')
    .verify.elementPresent('input[name="Lysates_Volume"]')
    .verify.elementPresent('select[name="Downstream_use"]')

    if(laserCapture){
      this
        .setValue('input[name="Sample_ID"]', laserCapture.sampleId )
        .setValue('select[name="Core"]', laserCapture.core )
        .setValue('input[name="Completion_Date"]', laserCapture.completionDate )
        .setValue('input[name="SlideNumber"]', laserCapture.slideNumber )
        .setValue('input[name="Estimated_total_capture_area"]', laserCapture.estimatedTotalCaptureArea )
        .setValue('input[name="Lysates"]', laserCapture.lysates )
        .setValue('input[name="Lysates_Volume"]', laserCapture.lystatesVolume )
        .setValue('select[name="Downstream_use"]', laserCapture.downstreamUse )

        .verify.elementPresent('button[type="submit"]')
    }


  return this;
};
