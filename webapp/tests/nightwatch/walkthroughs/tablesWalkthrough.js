
module.exports = {
  "Tables Walkthrough" : function (client) {
    client
      .url("http://localhost:3000/CRF")
      .resizeWindow(1024, 768)
      .reviewMainLayout()
      .reviewSignInPage()
      .signIn("house@test.org","house")

      .selectFromSidebar('#Clinical_InfoButton')
      .reviewPageTitle("Clinical_Info")
      .reviewClinicalInfoTable()

      .selectFromSidebar('#SU2C_Biopsy_V3Button')
      .reviewPageTitle("SU2C_Biopsy_V3")
      .reviewBiopsyTable()

      .selectFromSidebar('#FollowupButton')
      .reviewPageTitle("Followup")
      .reviewFollowUpTable()

      .selectFromSidebar('#SU2C_Subsequent_Treatment_V1Button')
      .reviewPageTitle("SU2C_Subsequent_Treatment_V1")
      .reviewSubsequentTreatmentTable()

      .selectFromSidebar('#SU2C_Prior_TX_V3Button')
      .reviewPageTitle("SU2C_Prior_TX_V3")
      .reviewPriorTreatmentTable()

      .selectFromSidebar('#Prostate_Diagnosis_V4Button')
      .reviewPageTitle("Prostate_Diagnosis_V4")
      .reviewProstateDiagnosisTable()

      .selectFromSidebar('#Blood_Labs_V2Button')
      .reviewPageTitle("Blood_Labs_V2")
      .reviewBloodLabsTable()

      .selectFromSidebar('#DemographicsButton')
      .reviewPageTitle("Demographics")
      .reviewDemographicsTable()

      .selectFromSidebar('#ECOG_Weight_V3Button')
      .reviewPageTitle("ECOG_Weight_V3")
      .reviewWeightTable()

      .selectFromSidebar('#GU_Disease_Assessment_V3Button')
      .reviewPageTitle("GU_Disease_Assessment_V3")
      .reviewDiseaseAssessmentTable()

      .selectFromSidebar('#SU2C_Biopsy_AE_V1Button')
      .reviewPageTitle("SU2C_Biopsy_AE_V1")
      .reviewBiopsyAeTable()

      .selectFromSidebar('#SU2C_Pr_Ca_Tx_Sumry_V2Button')
      .reviewPageTitle("SU2C_Pr_Ca_Tx_Sumry_V2")
      .reviewPriorCaTreatmentTable()

      .selectFromSidebar('#SU2C_Specimen_V1Button')
      .reviewPageTitle("SU2C_Specimen_V1")
      .reviewSpecimenTable()

      .selectFromSidebar('#Patient_Enrollment_formButton')
      .reviewPageTitle("Patient_Enrollment_form")
      .reviewEnrollmentTable()

      .selectFromSidebar('#Histology_ResearchButton')
      .reviewPageTitle("Histology_Research")
      .reviewHistologyResearchTable()

      .selectFromSidebar('#Tissue_Specimen_formButton')
      .reviewPageTitle("Tissue_Specimen_form")
      .reviewTissueSpecimenTable()

      .selectFromSidebar('#Blood_Specimen_formButton')
      .reviewPageTitle("Blood_Specimen_form")
      .reviewBloodSpecimenTable()

      .selectFromSidebar('#Histological_Assessment_formButton')
      .reviewPageTitle("Histological_Assessment_form")
      .reviewHistologyAssessmentTable()

      .selectFromSidebar('#Laser_Capture_MicrodissectionButton')
      .reviewPageTitle("Laser_Capture_Microdissection")
      .reviewLaserCaptureTable()

      .selectFromSidebar('#RNASeq_completion_formButton')
      .reviewPageTitle("RNASeq_completion_form")
      .reviewRnaSequenceTable()

      .selectFromSidebar('#Pathology_formButton')
      .reviewPageTitle("Pathology_form")
      .reviewPathologyTable()

      .signOut()
      .reviewSignInPage()
      .end();
  },
  "Forms Walkthrough" : function (client) {
    client
      .url("http://localhost:3000/CRF")
      .resizeWindow(1024, 768)
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
  }
};
