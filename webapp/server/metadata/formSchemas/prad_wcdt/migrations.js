Meteor.startup(function() {

// Change ANPC to IAC in these CRFs

    var mappings = [
	{
	    CRF: "Pathology Triage",
	    Field_Names: ["Preliminary Pathology Call"]
	},
	{
	    CRF: "Pathology_form",
	    Field_Names: ["Preliminary_Histology", "Final_Histology"],
	}
    ];

    function ANPCtoIAC(item) {
	count = 0;
	item.fieldNames.map(function(field) {
	    count += CRFreplace(item.CRF, field, "ANPC", "IAC");
	});
	return count;
    }

    Migration("ANPCtoIAC 20160221", function() {
        var count = _.reduce(mapping, function(item, num){ return ANPCtoIAC(item) + num; }, 0);
        console.log("ANPCtoIAC Count", count);
    });
})
