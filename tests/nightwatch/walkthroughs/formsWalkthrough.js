

module.exports = {
  "Readonly Forms Walkthrough" : function (client) {
    client
      .url("http://localhost:3000/CRF")
      .resizeWindow(1024, 1200)
      .reviewMainLayout()
      .reviewSignInPage()
      .signIn("house@test.org","house")

      .sectionBreak("Clinical Info")
      .selectFromSidebar('#Clinical_InfoButton')
      .reviewPageTitle("Clinical_Info")
      .reviewClinicalInfoForm()

      .sectionBreak("Biopsy")
      .selectFromSidebar('#SU2C_Biopsy_V3Button')
      .reviewPageTitle("SU2C_Biopsy_V3")
      .reviewBiopsyForm()

      .sectionBreak("Follow Up")
      .selectFromSidebar('#FollowupButton')
      .reviewPageTitle("Followup")
      .reviewFollowUpForm()

      .sectionBreak("Subsequent Treatment")
      .selectFromSidebar('#SU2C_Subsequent_Treatment_V1Button')
      .reviewPageTitle("SU2C_Subsequent_Treatment_V1")
      .reviewSubsequentTreatmentForm()

      .sectionBreak("Prior Treatment")
      .selectFromSidebar('#SU2C_Prior_TX_V3Button')
      .reviewPageTitle("SU2C_Prior_TX_V3")
      .reviewPriorTreatmentForm()

      .sectionBreak("Prostate Diagnosis")
      .selectFromSidebar('#Prostate_Diagnosis_V4Button')
      .reviewPageTitle("Prostate_Diagnosis_V4")
      .reviewProstateDiagnosisForm()

      .sectionBreak("Blood Labs")
      .selectFromSidebar('#Blood_Labs_V2Button')
      .reviewPageTitle("Blood_Labs_V2")
      .reviewBloodLabsForm()

      .sectionBreak("Demographics")
      .selectFromSidebar('#DemographicsButton')
      .reviewPageTitle("Demographics")
      .reviewDemographicsForm()

      .sectionBreak("Weight")
      .selectFromSidebar('#ECOG_Weight_V3Button')
      .reviewPageTitle("ECOG_Weight_V3")
      .reviewWeightForm()

      .sectionBreak("Disease Assessment")
      .selectFromSidebar('#GU_Disease_Assessment_V3Button')
      .reviewPageTitle("GU_Disease_Assessment_V3")
      .reviewDiseaseAssessmentForm()

      .sectionBreak("Prior Ca Treatment")
      .sectionBreak("Biopsy AE")
      .selectFromSidebar('#SU2C_Biopsy_AE_V1Button')
      .reviewPageTitle("SU2C_Biopsy_AE_V1")
      .reviewBiopsyAeForm()

      .sectionBreak("Prior Ca Treatment")
      .selectFromSidebar('#SU2C_Pr_Ca_Tx_Sumry_V2Button')
      .reviewPageTitle("SU2C_Pr_Ca_Tx_Sumry_V2")
      .reviewPriorCaTreatmentForm()

      .sectionBreak("Specimen")
      .selectFromSidebar('#SU2C_Specimen_V1Button')
      .reviewPageTitle("SU2C_Specimen_V1")
      .reviewSpecimenForm()

      .sectionBreak("Patient Enrollment")
      .selectFromSidebar('#Patient_Enrollment_formButton')
      .reviewPageTitle("Patient_Enrollment_form")
      .reviewPatientEnrollmentForm()

      .sectionBreak("Histology Research")
      .selectFromSidebar('#Histology_ResearchButton')
      .reviewPageTitle("Histology_Research")
      .reviewHistologyResearchForm()

      .sectionBreak("Tissue Specimen")
      .selectFromSidebar('#Tissue_Specimen_formButton')
      .reviewPageTitle("Tissue_Specimen_form")
      .reviewTissueSpecimenForm()

      .sectionBreak("Blood Specimen")
      .selectFromSidebar('#Blood_Specimen_formButton')
      .reviewPageTitle("Blood_Specimen_form")
      .reviewBloodSpecimenForm()

      .sectionBreak("Histology Assessment")
      .selectFromSidebar('#Histological_Assessment_formButton')
      .reviewPageTitle("Histological_Assessment_form")
      .reviewHistologyAssessmentForm()

      .sectionBreak("Laser Capture Microdissection")
      .selectFromSidebar('#Laser_Capture_MicrodissectionButton')
      .reviewPageTitle("Laser_Capture_Microdissection")
      .reviewLaserCaptureForm()

      .sectionBreak("RNA Sequence Completion")
      .selectFromSidebar('#RNASeq_completion_formButton')
      .reviewPageTitle("RNASeq_completion_form")
      .reviewRnaSequenceForm()

      .sectionBreak("Pathology")
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
      .reviewPatientEnrollmentForm()
      .completePatientEnrollmentForm(patientEnrollmentRecord)
      .reviewPatientEnrollmentRow(patientEnrollmentRecord, 2)

      .sectionBreak("Histology Research Form")
      .selectFromSidebar('#Histology_ResearchButton')
      .reviewPageTitle("Histology_Research")
      .saveScreenshot(screenshotDir + "E-HistologyResearchForm.png")
      .reviewHistologyResearchForm()
      .completeHistologyResearchForm(histologyResearchRecord)
      .reviewHistologyResearchRow(histologyResearchRecord, 1)

      .sectionBreak("Tissue Specimen Form")
      .selectFromSidebar('#Tissue_Specimen_formButton')
      .reviewPageTitle("Tissue_Specimen_form")
      .saveScreenshot(screenshotDir + "F-TissueSpecimenForm.png")
      .reviewTissueSpecimenForm()
      .completeTissueSpecimenForm(tissueSpecimenRecord)
      .reviewTissueSpecimenRow(tissueSpecimenRecord, 1)

      .sectionBreak("Blood Specimen Form")
      .selectFromSidebar('#Blood_Specimen_formButton')
      .reviewPageTitle("Blood_Specimen_form")
      .saveScreenshot(screenshotDir + "G-BloodSpecimenForm.png")
      .reviewBloodSpecimenForm()
      .completeBloodSpecimenForm(bloodSpecimenRecord)
      .reviewBloodSpecimenRow(bloodSpecimenRecord, 1)

      .sectionBreak("Histological Assessment Form")
      .selectFromSidebar('#Histological_Assessment_formButton')
      .reviewPageTitle("Histological_Assessment_form")
      .saveScreenshot(screenshotDir + "H-HistologyAssessmentForm.png")
      .reviewHistologyAssessmentForm()
      .completeHistologyAssessmentForm(histologyAssessmentRecord)
      .reviewHistologyAssessmentRow(histologyAssessmentRecord, 1)

      .sectionBreak("Laser Capture Form")
      .selectFromSidebar('#Laser_Capture_MicrodissectionButton')
      .reviewPageTitle("Laser_Capture_Microdissection")
      .saveScreenshot(screenshotDir + "I-LaserCaptureForm.png")
      .reviewLaserCaptureForm()
      .completeLaserCaptureForm(laserCaptureRecord)
      .reviewLaserCaptureRow(laserCaptureRecord, 1)

      .sectionBreak("RNA Sequence Completion Form")
      .selectFromSidebar('#RNASeq_completion_formButton')
      .reviewPageTitle("RNASeq_completion_form")
      .saveScreenshot(screenshotDir + "J-RnaSequenceForm.png")
      .reviewRnaSequenceForm()
      .completeRnaSequenceForm(rnaSequenceRecord)
      .reviewRnaSequenceRow(rnaSequenceRecord, 1)

      .sectionBreak("Pathology Form")
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
