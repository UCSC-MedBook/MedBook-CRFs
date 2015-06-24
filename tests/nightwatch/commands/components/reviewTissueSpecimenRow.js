    /*var tissueSpecimenRecord = {
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
    }*/


exports.command = function(tissueSpecimenRecord, rowIndex) {
  this
    .verify.elementPresent("table thead tr")
    .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ")")

    if(tissueSpecimenRecord){
      this
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Sample_ID")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Timepoint")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Procedure_Date")
      //.verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Biopsy_Site")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Attending_Radiologist")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .CRC_at_Collection")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Number_of_Cores")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Cores")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Fixed_Core_Ship_Date")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Freezer")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Box_ID")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .Core_Notes")
      .verify.elementPresent("table thead tr:nth-child(" + rowIndex + ") .TimepointNotes")

      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Sample_ID", tissueSpecimenRecord.sampleId )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Timepoint", tissueSpecimenRecord.timepoint )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Procedure_Date", tissueSpecimenRecord.procedureDate )
      //.verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Biopsy_Site", tissueSpecimenRecord.biopsySite )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Attending_Radiologist", tissueSpecimenRecord.attendingRadiologist )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .CRC_at_Collection", tissueSpecimenRecord.crcAtCollection )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Number_of_Cores", tissueSpecimenRecord.numberOfCores )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Cores", tissueSpecimenRecord.coresCore )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Fixed_Core_Ship_Date", tissueSpecimenRecord.fixedCoreShipDate )
      //.verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Freezer", tissueSpecimenRecord. )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Box_ID", tissueSpecimenRecord.boxId )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .Core_Notes", tissueSpecimenRecord.coreNotes )
      .verify.containsText("table thead tr:nth-child(" + rowIndex + ") .TimepointNotes", tissueSpecimenRecord.timepointNotes )

    }


  return this;
};
