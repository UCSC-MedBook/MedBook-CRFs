exports.command = function(patientRecord) {
  this
    .verify.elementPresent("form")

    .verify.elementPresent('input[name="Patient_ID"]')
    .verify.elementPresent('select[name="Study_Site"]')
    .verify.elementPresent('button[type="submit"]')

    if(patientRecord){

      this
        .setValue('input[name="Patient_ID"]', patientRecord.patientId)
        .setValue('select[name="Study_Site"]', patientRecord.institution)

        .verify.elementPresent('button[type="submit"]')

    }


  return this;
};
