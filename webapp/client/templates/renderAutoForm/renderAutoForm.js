
fixUpRenderedAutoForm = function() {
    var pef   = Collections.CRFs.find({CRF: "Patient_Enrollment_form"}, { fields: {Patient_ID:1}}).fetch();
    var dem   = Collections.CRFs.find({CRF: "Demographics"}, { fields: {Patient_ID:1}}).fetch();
    var biops = Collections.CRFs.find({CRF: "SU2C_Biopsy_V3"}, { fields: {Sample_ID:1}}).fetch();
    var br    = Collections.CRFs.find({CRF: "Biopsy_Research"}, { fields: {Sample_ID:1}}).fetch();

    function id_text(s) { return { id: s, text: s}};

    var Patient_ID = _.union(
        _.pluck(pef, 'Patient_ID'),
        _.pluck(dem, 'Patient_ID')
    ).filter(function(f) {return f != null}).sort().map(id_text);

    if (Session.get("currentForm") != "Patient_Enrollment_form") {
          $("input[name='Patient_ID']").val(Patient_ID)
    }

    var Sample_ID = _.union(
        _.pluck(pef, 'Patient_ID'),
        _.pluck(br, 'Sample_ID'),
        _.pluck(biops, 'Sample_ID')
    ).filter(function(f) {return f != null}).sort().map(id_text);
    All_Sample_ID = Sample_ID;

    if (Session.get("currentForm") != "Biopsy_Research") {
        if ($("select[name='Patient_ID']").length == 0 && $("select[name='Sample_ID']").length > 0) {
            var $s = $("select[name='Sample_ID']");
            $s.find('option').remove();
            All_Sample_ID.map(function(o) {
                var o = o.text;
                $s.append('<option value="' +  o + '">' + o  + '</option>')
            });
        }
    }
};


Template.renderAutoForm.rendered = fixUpRenderedAutoForm;


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
     },

});
