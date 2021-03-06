exports.command = function() {
  this
    .verify.elementPresent("table")
    .verify.elementPresent("table thead")
    .verify.elementPresent("table thead tr")

    .verify.elementPresent("table thead tr .Patient_ID")
    .verify.elementPresent("table thead tr .Sample_ID")
    .verify.elementPresent("table thead tr .Drug_Name")
    .verify.elementPresent("table thead tr .Treatment_Details")
    .verify.elementPresent("table thead tr .BL_PSA")
    .verify.elementPresent("table thead tr .Bone_Response")
    .verify.elementPresent("table thead tr .PSA_Response")
    .verify.elementPresent("table thead tr .PSA_nadir")
    .verify.elementPresent("table thead tr .PSA_nadir_Date")
    .verify.elementPresent("table thead tr .PSA_nadir_Date_Ext")
    .verify.elementPresent("table thead tr .Progression_Date")
    .verify.elementPresent("table thead tr .Progression_Date_Ext")
    .verify.elementPresent("table thead tr .RECIST_Response")
    .verify.elementPresent("table thead tr .Start_Date")
    .verify.elementPresent("table thead tr .Start_Date_Ext")
    .verify.elementPresent("table thead tr .Stop_Date")
    .verify.elementPresent("table thead tr .Stop_Date_Ext")
    .verify.elementPresent("table thead tr .If_Progressive_Disease__Specify_Type")
    .verify.elementPresent("table thead tr .Reason_for_Stopping_Treatment")
    .verify.elementPresent("table thead tr .Reason_for_Stopping_Treatment_Details")
    .verify.elementPresent("table thead tr .If_other__specify")
    .verify.elementPresent("table thead tr .Treatment_Category")
    .verify.elementPresent("table thead tr .Visit_Date")
    .verify.elementPresent("table thead tr .Phase")
    .verify.elementPresent("table thead tr .Segment")
    .verify.elementPresent("table thead tr .Arm")
    .verify.elementPresent("table thead tr .Day")


  return this;
};
