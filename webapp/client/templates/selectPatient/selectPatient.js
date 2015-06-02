Template.selectPatient.events({
  "change #patientSelectMenu": function(event, template){
    Session.set("Patient_ID", $('#patientSelectMenu').val());
    Session.set("CurrentDoc", currentDoc());
    Router.go("CRFsPatient", {_patient:  $('#patientSelectMenu').val()});
  }
});


Template.selectPatient.helpers({
  patients: function(){
    /*var p = CRFcollections.Patient_Enrollment_form.find({}, { fields: "Patient_ID"}).fetch();
    var d = (field != "Sample_ID" ?  CRFcollections.Demographics : CRFcollections.SU2C_Biopsy_V3)
        .find(q, { fields: f}).fetch();


    function html(p) { return  p[field]; }
    var dd = d.map(html);
    var pp = p.map(html);
    var pd = _.union(dd, pp).sort();


    pd.map( function(pid) {
        $("<option>", { value: pid, html: pid}).appendTo($select);
    }); // map*/

    return Oncore.find();
  }
});
