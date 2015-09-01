
fixUpRenderedAutoForm = function() {

    return;
    

    // Step 1. Check all pre requisities
    var currentStudy = Session.get("CurrentStudy");
    if (currentStudy == null)
        return;
    var study = Collections.studies.findOne({ id: currentStudy });
    if (study == null)
        return;

    var thereIsPatient_IDs = $("select[name='Patient_ID']").length > 0;
    var thereIsSample_IDs  = $("select[name='Sample_ID']").length > 0;

    if (!thereIsPatient_IDs && !thereIsSample_IDs)
        return;


    function id_text(s) { return { id: s, text: s}};

    var Patient_IDs = study.Patient_IDs.sort();
    var Sample_IDs = study.Sample_IDs.sort();
    var Patient_ID = null;
    var Sample_ID  = null;

    var currentDoc = Session.get("CurrentDoc");
    if (currentDoc) {
        Patient_ID = currentDoc.Patient_ID;
        Sample_ID = currentDoc.Sample_ID;

        Patient_ID = Patient_ID;

	// filter Sample_IDs by the Patient_ID
	if (Patient_ID != null && Sample_IDs && Sample_IDs.length > 0) {
	    Sample_IDs = Sample_IDs.filter(function(s) { return s.match(Patient_ID)});
	}

    }

    // Step 2. Update elements
    /*
    var $Patient_ID = $("select[name='Patient_ID']");
    if ($Patient_ID) {
        debugger;
	// $Patient_ID.find('option').remove();
	Patient_IDs.map(function(p) {

	    if ($Patient_ID.find("option[value='" + p+ "']").length == 0) { // doesn't exist, add it
		$Patient_ID.append('<option value="' +  p + '">' + p  + '</option>')
		debugger;
	    }

	});
        debugger;
	$Patient_ID.val(Patient_ID)
    };
	*/

    var $Sample_ID = $("select[name='Sample_ID']");
    if ($Sample_ID) {
	$Sample_ID.find('option').remove();
	Sample_IDs.map(function(s) {
	    $Sample_ID.append('<option value="' +  s + '">' + s  + '</option>')
	});
	$Sample_ID.val(Sample_ID)
    };
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
