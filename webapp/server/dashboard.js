Meteor.methods({
    dashboard: function(studyId) {
	if (this.userId == null)
	   throw new Error("must be logged in");
	var user = Meteor.users.findOne({_id: this.userId}, {fields: { "profile.collaborations": 1}});
	if (user == null)
	   throw new Error("user not found");

	console.log("user.profile", user.profile);

	if (user.profile.collaborations == null) 
	   throw new Error("Please join collaborations");


	if (studyId == null)
	   throw new Error("need a valid study");
	var study = studies.find({id: studyId});
	if (studyId == null)
	   throw new Error("study id not found");

	var target = _.intersection(study.collaborations, user.collaborations);
	console.log("dashboard", target);
	if (target.length == 0)
	   throw new Error("User not allowed to access this study");
	   
	if (studyId == null)
	   throw new Error("need a valid study");
	var study = studies.find({id: studyId});
	if (studyId == null)
	   throw new Error("study id not found");

	var target = _.intersection(study.collaborations, user.collaborations);
	console.log("dashboard", target);
	if (target.length == 0)
	   throw new Error("User not allowed to access this study");
	   

	var Sample_Ids  = study.Sample_IDs;
	var Patient_ids = study.Patient_IDs;

	var mapSample_IDtoPatientID = {};

	Sample_Ids.map(function(s) {
	    Patient_ids.map(function(p) {
	    	if (s.match(p))
		    mapSample_IDtoPatientID[s] = p;
	    })
	});

        var inventory = {}
	study.tables.map(function(tableName) {
	    var inv = {};
	    inventory[tableName] = inv;

	    CRFs.find({CRF: tableName}, {fields: { Sample_ID:1, Patient_ID: 1}}).forEach(function(obj) {
		console.log("dashboard", name, coll.count());

		try {
		    if (obj.Patient_ID) {
			inv[obj.Patient_ID] = true;
		    } else if (obj.Sample_ID) {
			inv[mapSample_IDtoPatientID[obj.Sample_ID]] = true;
		    }
		} catch (err) {
		}

	   });
       });
       inventory._allLabels = Object.keys(Patient_IDs).sort();
       return inventory;
   }
});

