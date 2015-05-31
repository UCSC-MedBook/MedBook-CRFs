(function(){All_Sample_ID = [];

Template.renderAutoForm.rendered = function() {
    console.log("Template.renderAutoForm.rendered");
    console.log("this", this.data);


    var enrollmentFormsWithIds = CRFcollections.Patient_Enrollment_form.find({}, { fields: {Sample_ID:true, Patient_ID:true}}).fetch();
    var demographicsWithIds = CRFcollections.Demographics.find({}, { fields: {Patient_ID:true}}).fetch();
    var biopsiesWithIds = CRFcollections.SU2C_Biopsy_V3.find({}, { fields: {Sample_ID:true}}).fetch();

    function id_text(s) { return { id: s, text: s}};

    var Patient_ID = _.union(
        _.pluck(enrollmentFormsWithIds, 'Patient_ID'),
        _.pluck(demographicsWithIds, 'Patient_ID')
    ).filter(function(f) {return f != null}).sort().map(id_text);
    console.log("Patient_ID", Patient_ID);


    var Sample_ID = _.union(
        _.pluck(enrollmentFormsWithIds, 'Sample_ID'),
        _.pluck(biopsiesWithIds, 'Sample_ID')
    ).filter(function(f) {return f != null}).sort().map(id_text);
    console.log("Sample_ID", Sample_ID);

    All_Sample_ID = Sample_ID;


    $("input[name='Sample_ID']").select2( {  data: Sample_ID, placeholder: "Select a  Sample ID", allowClear: false } );
    $("input[name='Patient_ID']").select2( { data: Patient_ID, placeholder: "Select a Patient ID ", allowClear: false } );
    $("input[name='Patient_ID']").val(Patient_ID);
    $('.select2-choice').css( {left:0, top:0, position:'absolute', width: "100%", height: "100%"});


    var lastDoc = null;
    Tracker.autorun(function() {
        var currentDoc  = Session.get("CurrentDoc");

        if (currentDoc){
           GeneList_docToForm(currentDoc);
        }

        if (currentDoc && (lastDoc != currentDoc)) {
            lastDoc = currentDoc;

            var $Patient_ID = $("input[name='Patient_ID']");
            if (currentDoc.Patient_ID != null && $Patient_ID.length > 0 && $Patient_ID.val() != currentDoc.Patient_ID)
                $Patient_ID.select2("val", currentDoc.Patient_ID);

            var $Sample_ID = $("input[name='Sample_ID']");
            if (currentDoc.Sample_ID != null && $Sample_ID.length > 0 && $Sample_ID.val() != currentDoc.Sample_ID)
                $Sample_ID.select2("val", currentDoc.Sample_ID);

            $('.select2-choice').css( {left:0, top:0, position:'absolute', width: "100%", height: "100%"})
        }

    });


    /*
    if (Session.get("currentForm") == "Histology_Research") {
        $("input[name='Trichotomy']").prop("disabled", true);
        $("input[name='Small_Cell']").prop("disabled", true);
        $("input[name='Adeno']").prop("disabled", true);
    }

    if (Session.get("currentForm") == "Histology_Research") {
            Tracker.autorun(function() {
                 var doc = {};
                 doc.Histology_Call =  AutoForm.getFieldValue("CRFquickForm", "Histology_Call");
                 generate_histology_categories(doc);
             });
    }
    */
}
Template.renderAutoForm.events( {
  'change select[name="Histology_Call"]' : function(evt, tmpl) {
     var doc = {};
     doc.Histology_Call = $(evt.target).val();
     generate_histology_categories(doc);

     Object.keys(doc).map(function(key) {
         var elem = tmpl.find('input[name="' + key + '"]')
         if (elem)
             $(elem).val(doc[key])
     });
   },
  'click .reactive-table tr': function (event) {
      Session.set("CurrentDoc", this);
   },

  'change .genelist' : function(evt, tmpl) {
    var name = this.name;
    var $genelist = $(tmpl.find("input[prop='" + name + "']"));
    var value = $genelist.select2("val");
    var cd = Session.get("CurrentDoc");
    cd[name] = value;
    Session.set("CurrentDoc", cd);
   }
});

})();
