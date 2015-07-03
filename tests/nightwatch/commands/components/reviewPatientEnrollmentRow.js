    /*var patientEnrollmentRecord = {
      patientId: "DTB-999",
      institution: ""
    }*/


exports.command = function(patientEnrollmentRecord, rowIndex) {
  this
    .verify.elementPresent("table thead tr")
    .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ")")

    if(patientEnrollmentRecord){
      this
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Patient_ID")
        .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Study_Site")

        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Patient_ID", patientEnrollmentRecord.patientId )
        .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Study_Site", patientEnrollmentRecord.institution )
    }

  return this;
};
