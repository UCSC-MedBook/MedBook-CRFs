    /*var pathologyRecord = {
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
    }*/


exports.command = function(pathologyRecord, rowIndex) {
  this
    .verify.elementPresent("table thead tr")
    .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ")")

    if(pathologyRecord){
      this
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Sample_ID")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Tumor_Content")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Preliminary_Histology")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Final_Histology")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .AR-FISH_IHC")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .PSA_IHC")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .CHGA_IHC")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .AR-FISH_test_performed")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .AR_chromosomeX_ratio")
      //.verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .AR_amplification")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .ION_Torrent_test_performed")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .PTEN_IHC")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .PTEN_test_performed")

      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Sample_ID", pathologyRecord.sampleId)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Tumor_Content", pathologyRecord.tumorContent)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Preliminary_Histology", pathologyRecord.preliminaryHistology)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Final_Histology", pathologyRecord.finalHistology)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .AR-FISH_IHC", pathologyRecord.arFishIhc)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .PSA_IHC", pathologyRecord.psaIhc)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .CHGA_IHC", pathologyRecord.chgaIhc)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .AR-FISH_test_performed", pathologyRecord.arFishPerformed)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .AR_chromosomeX_ratio", pathologyRecord.arChromosomeXRatio )
      //.verify.containsText("table thead tr:nth-child(" + rowIndex + ") .AR_amplification", pathologyRecord.)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .ION_Torrent_test_performed", pathologyRecord.ionTorrentTestPerformed)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .PTEN_IHC", pathologyRecord.ptenIhc)
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .PTEN_test_performed", pathologyRecord.ptenTestPerformed)
    }

  return this;
};
