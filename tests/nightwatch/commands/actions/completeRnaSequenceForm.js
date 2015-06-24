

/*var rnaSequence = {
  patientId: "",
  lncapControlSource: "",
  qcReports: "",
  rinScoreFromUcsf: "",
  dateCompleted: "",
  dateReceived: "",
  libraryPrepUsed: "",
  libraryPrepNotes: "",
  locationOfFastqFile: "",
  lncapControlSource: ""
}*/

exports.command = function(rnaSequence) {
  this
    .verify.elementPresent("form")

    .verify.elementPresent('select[name="Patient_ID"]')
    .verify.elementPresent('input[name="LNCAP_control_source"]')
    .verify.elementPresent('input[name="QC_reports"]')
    .verify.elementPresent('input[name="RIN_score_from_UCSF"]')
    .verify.elementPresent('input[name="date_completed"]')
    .verify.elementPresent('input[name="date_received"]')
    .verify.elementPresent('select[name="library_prep_used"]')
    .verify.elementPresent('input[name="library_prep_notes"]')
    .verify.elementPresent('input[name="location_of_fastq_file"]')
    .verify.elementPresent('input[name="LNCAP_control_source"]')

    if(rnaSequence){
      this

        .setValue('select[name="Patient_ID"]', rnaSequence.patientId )
        .setValue('input[name="LNCAP_control_source"]', rnaSequence.lncapControlSource )
        .setValue('input[name="QC_reports"]', rnaSequence.qcReports )
        .setValue('input[name="RIN_score_from_UCSF"]', rnaSequence.rinScoreFromUcsf )
        .setValue('input[name="date_completed"]', rnaSequence.dateCompleted )
        .setValue('input[name="date_received"]', rnaSequence.dateReceived )
        .setValue('select[name="library_prep_used"]', rnaSequence.libraryPrepUsed )
        .setValue('input[name="library_prep_notes"]', rnaSequence.libraryPrepNotes )
        .setValue('input[name="location_of_fastq_file"]', rnaSequence.locationOfFastqFile )
        .setValue('input[name="LNCAP_control_source"]', rnaSequence.lncapControlSource )

        .verify.elementPresent('button[type="submit"]')
    }


  return this;
};
