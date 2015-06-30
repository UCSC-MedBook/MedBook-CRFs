var bloodSpecimenRecord = {
  patientId: "",
  timepoint: "",
  drawDate: "",
  crcAtCollection: ""
}

var histologyAssessmentRecord = {
  sampleId: "",
  core: "A",
  blockImage: "1",
  referenceSlideNumber: "1",
  referenceSlideImages: "1",
  blockStatus: "negative"
}

var histologyResearchRecord = {
  sampleId: "",
  mutatedGenes: "",
  immunohistochemistry: "",
  histologyCall: "",
  adeno: "",
  smallCell: "",
  trichotomy: ""
}

var laserCaptureRecord = {
  sampleId: "",
  core: "",
  completionDate: "",
  slideNumber: "",
  estimatedTotalCaptureArea: "",
  lysates: "",
  lystatesVolume: "",
  downstreamUse: ""
}

var pathologyRecord = {
  sampleId: "",
  tumorContent: "",
  preliminaryHistology: "",
  finalHistology: "",
  arFishIhc: "",
  psaIhc: "",
  chgaIhc: "",
  arFishPerformed: "",
  arChromosomeXRatio: "",
  ionTorrentTestPerformed: "",
  ptenIhc: "",
  ptenTestPerformed: ""
}
var rnaSequenceRecord = {
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
}
var tissueSpecimenRecord = {
  sampleId: "",
  timepoint: "",
  procedureDate: "",
  biopsySite: "",
  attendingRadiologist: "",
  crcAtCollection: "",
  numberOfCores: "",
  coresId: "",
  coresCore: "",
  fixedCoreShipDate: "",
  boxId: "",
  coreNotes: "",
  timepointNotes: ""
}

var patientEnrollmentRecord = {
  patientId: 'DTB-999',
  institution: "OHSU",
  baselineSampleId: "999A",
  baselineBiopsyDate: "01/01/2015",
  baselineBiopsySite: "Liver",
  progressionSampleId: "999B",
  progressionBiopsyDate: "01/06/2015",
  progressionBiopsySite: "Liver"
}

var screenshotDir = "tests/nightwatch/screenshots/desktop/interactiveForms/";


module.exports = {
  "SignIn" : function (client) {
    client
      .url("http://localhost:3000/CRF")
      .resizeWindow(1024, 1200)
      .reviewMainLayout()
      .saveScreenshot(screenshotDir + "A-MainLayout.png")
      .reviewSignInPage()
      .saveScreenshot(screenshotDir + "B-SignIn.png")
      .signIn("house@test.org","house")
      .saveScreenshot(screenshotDir + "C-HomePage.png")

  },
  "Patient Enrollment Form" : function (client) {
    client
      //.sectionBreak("Patient Enrollment Form")
      .selectFromSidebar('#Patient_Enrollment_formButton')
      .reviewPageTitle("Patient_Enrollment_form")
      .saveScreenshot(screenshotDir + "D-PatientEnrollmentForm.png")
      .reviewPatientEnrollmentForm()
      .completePatientEnrollmentForm(patientEnrollmentRecord)
      .reviewPatientEnrollmentRow(patientEnrollmentRecord, 1)

  },
  "Histology Research Form" : function (client) {
    client
      //.sectionBreak("Histology Research Form")
      .selectFromSidebar('#Histology_ResearchButton')
      .reviewPageTitle("Histology_Research")
      .saveScreenshot(screenshotDir + "E-HistologyResearchForm.png")
      .reviewHistologyResearchForm()
      .completeHistologyResearchForm(histologyResearchRecord)
      .reviewHistologyResearchRow(histologyResearchRecord, 1)

  },
  "Tissue Specimen Form" : function (client) {
    client
      //.sectionBreak("Tissue Specimen Form")
      .selectFromSidebar('#Tissue_Specimen_formButton')
      .reviewPageTitle("Tissue_Specimen_form")
      .saveScreenshot(screenshotDir + "F-TissueSpecimenForm.png")
      .reviewTissueSpecimenForm()
      .completeTissueSpecimenForm(tissueSpecimenRecord)
      .reviewTissueSpecimenRow(tissueSpecimenRecord, 1)

  },
  "Blood Specimen Form" : function (client) {
    client
      //.sectionBreak("Blood Specimen Form")
      .selectFromSidebar('#Blood_Specimen_formButton')
      .reviewPageTitle("Blood_Specimen_form")
      .saveScreenshot(screenshotDir + "G-BloodSpecimenForm.png")
      .reviewBloodSpecimenForm()
      .completeBloodSpecimenForm(bloodSpecimenRecord)
      .reviewBloodSpecimenRow(bloodSpecimenRecord, 1)

  },
  "Histological Assessment Form" : function (client) {
    client
      //.sectionBreak("Histological Assessment Form")
      .selectFromSidebar('#Histological_Assessment_formButton')
      .reviewPageTitle("Histological_Assessment_form")
      .saveScreenshot(screenshotDir + "H-HistologyAssessmentForm.png")
      .reviewHistologyAssessmentForm()
      .completeHistologyAssessmentForm(histologyAssessmentRecord)
      .reviewHistologyAssessmentRow(histologyAssessmentRecord, 1)

  },
  "Laser Capture Form" : function (client) {
    client
      //.sectionBreak("Laser Capture Form")
      .selectFromSidebar('#Laser_Capture_MicrodissectionButton')
      .reviewPageTitle("Laser_Capture_Microdissection")
      .saveScreenshot(screenshotDir + "I-LaserCaptureForm.png")
      .reviewLaserCaptureForm()
      .completeLaserCaptureForm(laserCaptureRecord)
      .reviewLaserCaptureRow(laserCaptureRecord, 1)

  },
  "RNA Sequence Completion Form" : function (client) {
    client
      //.sectionBreak("RNA Sequence Completion Form")
      .selectFromSidebar('#RNASeq_completion_formButton')
      .reviewPageTitle("RNASeq_completion_form")
      .saveScreenshot(screenshotDir + "J-RnaSequenceForm.png")
      .reviewRnaSequenceForm()
      .completeRnaSequenceForm(rnaSequenceRecord)
      .reviewRnaSequenceRow(rnaSequenceRecord, 1)

  },
  "Pathology Form" : function (client) {
    client
      //.sectionBreak("Pathology Form")
      .selectFromSidebar('#Pathology_formButton')
      .reviewPageTitle("Pathology_form")
      .saveScreenshot(screenshotDir + "K-PathologyForm.png")
      .reviewPathologyForm()
      .completePathologyForm(pathologyRecord)
      .reviewPathologyRow(pathologyRecord, 1)

      .signOut()
      .reviewSignInPage()
      .end();
  }
};
