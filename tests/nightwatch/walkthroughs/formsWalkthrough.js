

module.exports = {
  "Readonly Forms Walkthrough" : function (client) {
    client
      .url("http://localhost:3000/CRF")
      .resizeWindow(1024, 1200)
      .reviewMainLayout()
      .reviewSignInPage()
      .signIn("house@test.org","house")

      .selectFromSidebar('#Clinical_InfoButton')
      .reviewPageTitle("Clinical_Info")
      .reviewClinicalInfoForm()

      .selectFromSidebar('#SU2C_Biopsy_V3Button')
      .reviewPageTitle("SU2C_Biopsy_V3")
      .reviewBiopsyForm()

      .selectFromSidebar('#FollowupButton')
      .reviewPageTitle("Followup")
      .reviewFollowUpForm()

      .selectFromSidebar('#SU2C_Subsequent_Treatment_V1Button')
      .reviewPageTitle("SU2C_Subsequent_Treatment_V1")
      .reviewSubsequentTreatmentForm()

      .selectFromSidebar('#SU2C_Prior_TX_V3Button')
      .reviewPageTitle("SU2C_Prior_TX_V3")
      .reviewPriorTreatmentForm()

      .selectFromSidebar('#Prostate_Diagnosis_V4Button')
      .reviewPageTitle("Prostate_Diagnosis_V4")
      .reviewProstateDiagnosisForm()

      .selectFromSidebar('#Blood_Labs_V2Button')
      .reviewPageTitle("Blood_Labs_V2")
      .reviewBloodLabsForm()

      .selectFromSidebar('#DemographicsButton')
      .reviewPageTitle("Demographics")
      .reviewDemographicsForm()

      .selectFromSidebar('#ECOG_Weight_V3Button')
      .reviewPageTitle("ECOG_Weight_V3")
      .reviewWeightForm()

      .selectFromSidebar('#GU_Disease_Assessment_V3Button')
      .reviewPageTitle("GU_Disease_Assessment_V3")
      .reviewDiseaseAssessmentForm()

      .selectFromSidebar('#SU2C_Biopsy_AE_V1Button')
      .reviewPageTitle("SU2C_Biopsy_AE_V1")
      .reviewBiopsyAeForm()

      .selectFromSidebar('#SU2C_Pr_Ca_Tx_Sumry_V2Button')
      .reviewPageTitle("SU2C_Pr_Ca_Tx_Sumry_V2")
      .reviewPriorCaTreatmentForm()

      .selectFromSidebar('#SU2C_Specimen_V1Button')
      .reviewPageTitle("SU2C_Specimen_V1")
      .reviewSpecimenForm()

      .selectFromSidebar('#Patient_Enrollment_formButton')
      .reviewPageTitle("Patient_Enrollment_form")
      .reviewEnrollmentForm()

      .selectFromSidebar('#Histology_ResearchButton')
      .reviewPageTitle("Histology_Research")
      .reviewHistologyResearchForm()

      .selectFromSidebar('#Tissue_Specimen_formButton')
      .reviewPageTitle("Tissue_Specimen_form")
      .reviewTissueSpecimenForm()

      .selectFromSidebar('#Blood_Specimen_formButton')
      .reviewPageTitle("Blood_Specimen_form")
      .reviewBloodSpecimenForm()

      .selectFromSidebar('#Histological_Assessment_formButton')
      .reviewPageTitle("Histological_Assessment_form")
      .reviewHistologyAssessmentForm()

      .selectFromSidebar('#Laser_Capture_MicrodissectionButton')
      .reviewPageTitle("Laser_Capture_Microdissection")
      .reviewLaserCaptureForm()

      .selectFromSidebar('#RNASeq_completion_formButton')
      .reviewPageTitle("RNASeq_completion_form")
      .reviewRnaSequenceForm()

      .selectFromSidebar('#Pathology_formButton')
      .reviewPageTitle("Pathology_form")
      .reviewPathologyForm()

      .signOut()
      .reviewSignInPage()
      .end();
  },
  "Interactive Forms Walkthrough" : function (client) {

    var bloodSpecimenRecord = {
      patientId: "",
      timepoint: "",
      drawDate: "",
      crcAtCollection: ""
    }
    var histologyAssessmentRecord = {
      sampleId: "",
      core: "",
      blockImage: "",
      referenceSlideNumber: "",
      referenceSlideImages: "",
      blockStatus: ""
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
      patientId: "DTB-999",
      institution: ""
    }

    var screenshotDir = "tests/nightwatch/screenshots/desktop/interactiveForms/";

    client
      .url("http://localhost:3000/CRF")
      .resizeWindow(1024, 1200)
      .reviewMainLayout()
      .saveScreenshot(screenshotDir + "A-MainLayout.png")
      .reviewSignInPage()
      .saveScreenshot(screenshotDir + "B-SignIn.png")
      .signIn("house@test.org","house")
      .saveScreenshot(screenshotDir + "C-HomePage.png")


      .sectionBreak("Patient Enrollment Form")
      .selectFromSidebar('#Patient_Enrollment_formButton')
      .reviewPageTitle("Patient_Enrollment_form")
      .saveScreenshot(screenshotDir + "D-PatientEnrollmentForm.png")
      .reviewEnrollmentForm()
      .completeEnrollmentForm(patientEnrollmentRecord)

      .sectionBreak("Histology Research Form")
      .selectFromSidebar('#Histology_ResearchButton')
      .reviewPageTitle("Histology_Research")
      .saveScreenshot(screenshotDir + "E-HistologyResearchForm.png")
      .reviewHistologyResearchForm()
      .completeHistologyResearchForm(histologyResearchRecord)

      .sectionBreak("Tissue Specimen Form")
      .selectFromSidebar('#Tissue_Specimen_formButton')
      .reviewPageTitle("Tissue_Specimen_form")
      .saveScreenshot(screenshotDir + "F-TissueSpecimenForm.png")
      .reviewTissueSpecimenForm()
      .completeTissueSpecimenForm(tissueSpecimenRecord)

      .sectionBreak("Blood Specimen Form")
      .selectFromSidebar('#Blood_Specimen_formButton')
      .reviewPageTitle("Blood_Specimen_form")
      .saveScreenshot(screenshotDir + "G-BloodSpecimenForm.png")
      .reviewBloodSpecimenForm()
      .completeBloodSpecimenForm(bloodSpecimenRecord)

      .sectionBreak("Histological Assessment Form")
      .selectFromSidebar('#Histological_Assessment_formButton')
      .reviewPageTitle("Histological_Assessment_form")
      .saveScreenshot(screenshotDir + "H-HistologyAssessmentForm.png")
      .reviewHistologyAssessmentForm()
      .completeHistologyAssessmentForm(histologyAssessmentRecord)

      .sectionBreak("Laser Capture Form")
      .selectFromSidebar('#Laser_Capture_MicrodissectionButton')
      .reviewPageTitle("Laser_Capture_Microdissection")
      .saveScreenshot(screenshotDir + "I-LaserCaptureForm.png")
      .reviewLaserCaptureForm()
      .completeLaserCaptureForm(laserCaptureRecord)

      .sectionBreak("RNA Sequence Completion Form")
      .selectFromSidebar('#RNASeq_completion_formButton')
      .reviewPageTitle("RNASeq_completion_form")
      .saveScreenshot(screenshotDir + "J-RnaSequenceForm.png")
      .reviewRnaSequenceForm()
      .completeRnaSequenceForm(rnaSequenceRecord)

      .sectionBreak("Pathology Form")
      .selectFromSidebar('#Pathology_formButton')
      .reviewPageTitle("Pathology_form")
      .saveScreenshot(screenshotDir + "K-PathologyForm.png")
      .reviewPathologyForm()
      .completePathologyForm(pathologyRecord)

      .signOut()
      .reviewSignInPage()
      .end();
  }
};
