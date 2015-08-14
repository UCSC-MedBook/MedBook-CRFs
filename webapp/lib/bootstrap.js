function summarizeTreatment(table, treatment) {

    var s = "<div style='width:300px;'><a href='/CRF/lists/" + table + "/" +  treatment._id + "/'>";
    var dn = treatment.Drug_Name ;
    if (dn == null)
        dn = treatment.Treatment_Details;
    s += dn + ": ";
    s += moment(treatment.Start_Date).utc().format("MM/DD/YYYY")
    s +='-';
    if (treatment.Stop_Date)
        s += moment(treatment.Stop_Date).utc().format("MM/DD/YYYY")
    else if (treatment.Stop_Date_Ext)
        s += treatment.Stop_Date_Ext;
    s += "</a></div>";
    return s;
}

Meteor.startup(function() {

  CRFmetadataCollection = new Meteor.Collection('CRFmetadataCollection');

  // Calculate a default name for a list in the form of 'List A'
  CRFmetadataCollection.defaultName = function() {
    var nextLetter = 'A', nextName = 'List ' + nextLetter;
    while (CRFmetadataCollection.findOne({name: nextName})) {
      // not going to be too smart here, can go past Z
      nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
      nextName = 'CRF ' + nextLetter;
    }

    return nextName;
  };


  // if the database is empty on server start, create some sample data.
  ComplexIDFields = {};
  
  CRFcollections = {}
  var common_crfs = [
      'studies',
      'Clinical_Info',
  ];

  var prad_wcdt_crfs = [
      "SU2C_Biopsy_V3",
      "Followup",
      'SU2C_Subsequent_Treatment_V1',
      // 'SU2C_Subsequent_TX_V2',  We don't want this one
      "SU2C_Prior_TX_V3",
      "Prostate_Diagnosis_V4",
      "Blood_Labs_V2",
      "Demographics",
      "ECOG_Weight_V3",
      "GU_Disease_Assessment_V3",
      "SU2C_Biopsy_AE_V1",
      "SU2C_Pr_Ca_Tx_Sumry_V2",
      "SU2C_Specimen_V1",

      "Patient_Enrollment_form",
      "Biopsy_Research",
      // Obsolete: 'Treatment_History',
      'Histology_Research',

      'Tissue_Specimen_form',
      'Blood_Specimen_form',
      'Histological_Assessment_form',
      'Laser_Capture_Microdissection',
      'RNASeq_completion_form',
      'Pathology_form',
      // Obsolete 'Treatment_Response_form', (if obsolete also remove formSchemas/* file)
  ];
  CRFsInfo = [
    "Demographics",
    "Followup",
    "Prostate_Diagnosis_V4",
    "Blood_Labs_V2",
    "ECOG_Weight_V3",
    "GU_Disease_Assessment_V3",
    "SU2C_Biopsy_AE_V1",
    "SU2C_Biopsy_V3",
    "SU2C_Pr_Ca_Tx_Sumry_V2",
    "SU2C_Prior_TX_V3",
    "SU2C_Specimen_V1",
    'SU2C_Subsequent_Treatment_V1',
    "Patient_Enrollment_form",
	  "Biopsy_Research",
    // Obsolete: 'Treatment_History',
    'Tissue_Specimen_form',
    'Blood_Specimen_form',
    'Histological_Assessment_form',
    'Laser_Capture_Microdissection',
    'RNASeq_completion_form',
    'Pathology_form',
    'Clinical_Info',
    // Obsolete 'Treatment_Response_form',(if obsolete also remove formSchemas/*.js file)
  ];

  // TEO: this is super hacker-y
  if (Meteor.isServer) {
    CRFmetadataCollection.remove({});

  }

  if (true || CRFmetadataCollection.find().count() === 0) {
    // this needs to be parameterized by study somehow.
    function crf_ids_potential() {
        var s = [];
        for (var i = 0; i <= 300; i++)
            s.push("DTB-" + ("00" + i).slice(-3))
        return s;
    }

    clinicalReportFormSchemaObject = SimpleSchema({
      _id: {
          type: String,
          optional: true,
      },
      createdAt: {
          type: Date,
      },
      updatedAt: {
          type: Date,
          optional: true,
      },
  		userId: {
  			type: String,
  		}
    });
  }

  OncoreTable_NeedsSample_ID = {
      "Followup": false,
      "Demographics": false,
      "Prostate_Diagnosis_V4": false,

      "Blood_Labs_V2": true,
      "ECOG_Weight_V3": true,
      "GU_Disease_Assessment_V3": true,
      "SU2C_Biopsy_AE_V1": true,
      "SU2C_Biopsy_V3": true,
      "SU2C_Pr_Ca_Tx_Sumry_V2": true,
      "SU2C_Prior_TX_V3": true,
      "SU2C_Specimen_V1": true,
      "SU2C_Subsequent_Treatment_V1": true,
  };
  if (Meteor.isClient)
      window.OncoreTable_NeedsSample_ID = OncoreTable_NeedsSample_ID;

  TableNeedsSample_ID = [
      ["Followup", false,],
      ["Demographics", false,],
      ["Prostate_Diagnosis_V4", false,],

      ["Blood_Labs_V2", true,],
      ["ECOG_Weight_V3", true,],
      ["GU_Disease_Assessment_V3", true,],
      ["SU2C_Biopsy_AE_V1", true,],
      ["SU2C_Biopsy_V3", true,],
      ["SU2C_Pr_Ca_Tx_Sumry_V2", true,],
      ["SU2C_Prior_TX_V3", true,],
      ["SU2C_Specimen_V1", true,],
      ["SU2C_Subsequent_Treatment_V1", true,]
  ]


  OncoreCollections = {};

  function fixDate(row) {
      for (elem in row) {
          var obj = row[elem];

          if (typeof(obj) == "object" && "date" in row[elem] && (row[elem].date instanceof(Date)))
              row[elem] = row[elem].date;
      }
      return row;
  }

  function fixRow(obj) {
  	if (obj) {
  	    Object.keys(obj).map(function(f) {
  	        var g = f.replace(/[ ,()-]/g, '_');
  	        if (g != f) {
  					obj[g] = obj[f];
  	            delete obj[f];
  	        }
  	    });
  	}
  }

  mapIfPossible = function(obj, field, thisMap) {
      if (field in obj) {
          var value = obj[field];
          if (value in thisMap)
              obj[field] = thisMap[value];
      }
  }

  SU2C_Center_map = {
      "Mt. Zion": "UCSF",
      "Knight Cancer Institute": "OHSU",
      "University of California Los Angeles": "UCLA",
      "University of California Davis": "UCD",
      "BC Cancer Agency": "UBC"
  }


  function mapPatient(patient) {
      var Patient_ID = patient.patient;

      var tables = patient.attributes;
      fixRow(tables);
      var biopsies = tables["SU2C_Biopsy_V3"];
      var baseline, pro, pro2;

      console.log("Patient_ID", Patient_ID);

      if (biopsies) {

          biopsies.map(fixDate);
          biopsies.map(fixRow);

          biopsies.sort(function(a, b) {
              return a.Date_of_Procedure >=  b.Date_of_Procedure;
          });


          for (var bi = 0; bi < biopsies.length; bi++) {
              var b = biopsies[bi];
              var d = b.Date_of_Procedure;
              if (d == null || d == "")
                  d = b.Visit_Date;
              var segment = b.Segment;

              if (baseline == null) {
                  baseline = d;
                  continue;
              }

              if (pro == null && d > baseline )  {
                  console.log(Patient_ID, "Pro")
                  pro = d;
                  continue;
              }

              if (pro2 == null && d > pro ) {
                  pro2 = d;
                  continue;
              }
          }
      }

      for (var ti = 0; ti < TableNeedsSample_ID.length; ti++) {
          var t = TableNeedsSample_ID[ti][0];
          var n = TableNeedsSample_ID[ti][1];

          if (n) {
              var rows = tables[t];
              if (rows) {
                  for (var i = 0; i < rows.length; i++) {
                      var row = rows[i];
                      fixRow(row);
                      fixDate(row);

                      var d;
                      if ( t == "SU2C_Biopsy_V3") {
                          d =  row["Date_of_Procedure"];
                          if (d == null || d == "")
                              d = row["Visit_Date"];
                      } if ( t == "SU2C_Subsequent_Treatment_V1") {
                          d = row["Start_Date"];
                      } else {
                          d = row["Visit_Date"];
                      }


                      if ( t == "SU2C_Subsequent_Treatment_V1") {
                          map_Drug_Name(row);
  						map_SU2C_Subsequent_Treatment_V1__Responder(row);
                      } else if (t == "SU2C_Prior_TX_V3") {
                          map_Drug_Name(row);
                      }

                      var Sample_ID = Patient_ID ;

                      if (d >= pro)
                          Sample_ID += "Pro";
                      if (d >= pro2)
                          Sample_ID += "2";

                      row.Patient_ID = Patient_ID;
                      row.Sample_ID = Sample_ID;

                      try {
                      // OncoreCollections[t].upsert({Sample_ID: Sample_ID, "Date": d}, {$set: row});
                      // OncoreCollections[t].upsert({Sample_ID: Sample_ID}, {$set: row});

                         CRFcollections[t].insert(row);

                      } catch (ex) {
                          console.log("insert exception", i, t, row);
                          throw ex
                      }
                  }
              }
          } else {
                  var obj = patient.attributes[t];
                  if (obj) {
                      fixRow(obj);
                      fixDate(row);


                      if (t == "Followup")
                          mapIfPossible(obj, "Followup_Center", SU2C_Center_map);
                      else if (t == "Demographics")
                          mapIfPossible(obj, "Study_Site", SU2C_Center_map);



                      try {
                          // CRFcollections[t].upsert({Patient_ID: Patient_ID}, {$set: obj});
                          obj.Patient_ID = Patient_ID;
                          if (t == "Followup" && obj.Date_of_Progression)
                              console.log("insert Followup.Date_of_Progression", obj.Date_of_Progression);
                          CRFcollections[t].insert( obj );
                      } catch (ex) {
                          console.log("insert exception", t, obj);
                          throw ex
                      }
                  }
                  // else console.log(Patient_ID, "is missing", t);
          }
      };
  	//mapClinicalInfo();
  }
  if (Meteor.isClient) {
    window.mapPatient = mapPatient;
  }

  map_SU2C_Subsequent_Treatment_V1__Responder = function(SU2C_Subsequent_Treatment_V1) {
      var bone_response = SU2C_Subsequent_Treatment_V1.Bone_Response;
  	var Reason_for_Stopping_Treatment = SU2C_Subsequent_Treatment_V1.Reason_for_Stopping_Treatment;
  	var Progression_Date = SU2C_Subsequent_Treatment_V1.Progression_Date;

      TooSoonToAnalyze = false;

      if ( SU2C_Subsequent_Treatment_V1.Progression_Date == null)
          SU2C_Subsequent_Treatment_V1.Responder = "Responder";

      else if (["Progressive Disease", "Patient Choice", "Less than Partial Response"].indexOf(Reason_for_Stopping_Treatment) >= 0)
          SU2C_Subsequent_Treatment_V1.Responder = "Non Responder";
      else
          TooSoonToAnalyze = true;

      /* Makes the query simpler RDB 03/04/2015
      else
          SU2C_Subsequent_Treatment_V1.Responder = null;
      */

      SU2C_Subsequent_Treatment_V1.ResponderEnzalutamide = null;
      SU2C_Subsequent_Treatment_V1.ResponderAbiraterone =  null;
      SU2C_Subsequent_Treatment_V1.ResponderOtherTherapy = null;


      if (!TooSoonToAnalyze && SU2C_Subsequent_Treatment_V1.Responder) {

          if (SU2C_Subsequent_Treatment_V1.Drug_Name)
              SU2C_Subsequent_Treatment_V1.Drug_Name.split("; ").filter(function(d) {
                  console.log("Drug_Name", d);
                  if (d == "Enzalutamide")
                      SU2C_Subsequent_Treatment_V1.ResponderEnzalutamide = SU2C_Subsequent_Treatment_V1.Responder;
                  else if (d == "Abiraterone")
                      SU2C_Subsequent_Treatment_V1.ResponderAbiraterone  = SU2C_Subsequent_Treatment_V1.Responder;
                  else {
                      SU2C_Subsequent_Treatment_V1.ResponderOtherTherapy = SU2C_Subsequent_Treatment_V1.Responder;
  					console.log('other drug',d)
                  }
              });
          else
                  SU2C_Subsequent_Treatment_V1.ResponderOtherTherapy = SU2C_Subsequent_Treatment_V1.Responder;

          //console.log("SU2C_Subsequent_Treatment_V1.Responder", SU2C_Subsequent_Treatment_V1.Responder);
          //console.log("SU2C_Subsequent_Treatment_V1.ResponderEnzalutamide", SU2C_Subsequent_Treatment_V1.ResponderEnzalutamide);
          //console.log("SU2C_Subsequent_Treatment_V1.ResponderAbiraterone", SU2C_Subsequent_Treatment_V1.ResponderAbiraterone);
          //console.log("SU2C_Subsequent_Treatment_V1.ResponderOtherTherapy", SU2C_Subsequent_Treatment_V1.ResponderOtherTherapy);
      }

  };



  ingestOncore = function () {
    Object.keys(OncoreTable_NeedsSample_ID).map(function(name) {
      CRFcollections[name].remove({});
    });
	  console.log('Clinical info', CRFcollections['Clinical_Info'].find().count())
    console.log("Ingesting begun");
    Oncore.find({}, {sort: {patient:1}}).forEach(function(patient) {

      if (patient.attributes && patient.attributes.Followup && patient.attributes.Followup["Date of Progression"])
          console.log("patient.attributes.Followup.Date of Progression", patient.attributes.Followup["Date of Progression"]);
      mapPatient(patient)
    });
    console.log("Ingesting finished");

    console.log("Starting Cohort Level Analysis")
    ingestClinical();
  }

  ingestClinical = function () {
  	var samples = {}
  	var SU2C_Biopsy_V3 = CRFcollections['SU2C_Biopsy_V3']
  	var SU2C_Prior_TX_V3 = CRFcollections['SU2C_Prior_TX_V3']
  	var SU2C_Subsequent_Treatment_V1 = CRFcollections['SU2C_Subsequent_Treatment_V1']
  	var clinical_info = CRFcollections['Clinical_Info']
  	var Demographics = CRFcollections['Demographics']
  	var Followup = CRFcollections['Followup']

        clinical_info.remove({});

  	// ingest Demographics

  	var sample_list = Demographics.find({})
  	sample_list.forEach(function(sample) {
  		var sample_id = sample['Patient_ID']
  		//data = {'Sample_ID':sample_id}
  		if (!samples[sample_id]) {
  			//console.log('no record for', sample_id)
  			samples[sample_id] = {}
  		}
  		if (sample['Study_Site']) {
  			samples[sample_id]['site'] = sample['Study_Site']

  		}
  		samples[sample_id]['Patient_ID'] = sample_id
  		if (sample['Age']) {
  			samples[sample_id]['age'] = sample['Age']
  		}
  		if (sample["On_Study_Date"]) {
  			samples[sample_id]["On_Study_Date"] = sample["On_Study_Date"]
  			//if (samples[sample_id]["On_Study_Date"])
  			//	console.log('ON type of date',samples[sample_id]["On_Study_Date"],samples[sample_id]["On_Study_Date"] instanceof Date, samples[sample_id]["On_Study_Date"].valueOf())
  		}
  		samples[sample_id]["Study_ID"] = 'prad_wcdt'


  		try {
  			console.log('s',sample_id,samples[sample_id])
   			var ret = clinical_info.update(
  				{'Sample_ID':sample_id},
  				{$set:samples[sample_id]},
  				{upsert:true}
  			)
  			if (ret != 1) console.log('clinical info returns', ret)
  		}
    	catch (ex) {
       		console.log("update exception", sample_id, samples[sample_id]);
       	 throw ex
    	}
    });

  	// ingest Followup

  	var sample_list = Followup.find({})
  	sample_list.forEach(function(sample) {
  		var sample_id = sample['Patient_ID']
  		if (!samples[sample_id]) {
  			//console.log('no record for', sample_id)
  			samples[sample_id] = {}
  		}
  		if (sample["Off_Treatment_Reason"] ) {
  			samples[sample_id]['Reason_for_Stopping_Treatment'] = sample['Off_Treatment_Reason']
  			//console.log('Off_Treatment_Reason', samples[sample_id])
  		}
  		if (sample["Off_Study_Date"]) {
  			samples[sample_id]["Off_Study_Date"] = sample["Off_Study_Date"]
  			//console.log('OFF type of date',samples[sample_id]["Off_Study_Date"],samples[sample_id]["Off_Study_Date"] instanceof Date, samples[sample_id]["Off_Study_Date"].valueOf())
  			if (samples[sample_id]["On_Study_Date"])
  				//console.log('ON type of date',samples[sample_id]["On_Study_Date"],samples[sample_id]["On_Study_Date"] instanceof Date, samples[sample_id]["On_Study_Date"].valueOf())
  				samples[sample_id]["Days_on_Study"] = (samples[sample_id]["Off_Study_Date"].valueOf() - samples[sample_id]["On_Study_Date"].valueOf()) / 86400000
  				//console.log(sample_id,'Days_on_Study',samples[sample_id]["Days_on_Study"] )

  		}

  	})

  	// ingest Biopsy

  	var sample_list = SU2C_Biopsy_V3.find({})
  	console.log('count of samples', sample_list.length)
  	sample_list.forEach(function(sample) {
  		var sample_id = sample['Sample_ID']
  		//data = {'Sample_ID':sample_id}
  		if (!samples[sample_id]) {
  			//console.log('no record for', sample_id)
  			samples[sample_id] = {}
  		}
  	    if (sample['Site']) {
  			//console.log('before biopsy',sample_id, samples[sample_id])
  			samples[sample_id]['biopsy_site'] = sample['Site']
  			samples[sample_id]['Patient_ID'] = sample['Patient_ID']
  			samples[sample_id]['Study_ID'] = 'prad_wcdt'
  			samples[sample_id]['biopsy_date'] = sample.Date_of_Procedure;
  			map_biopsy_site(samples[sample_id]);
  			//console.log('upsert biopsy',sample_id, {$set:samples[sample_id]})
  			try {
  	 			var ret = clinical_info.update(
  					{'Sample_ID':sample_id},
  					{$set:samples[sample_id]},
  					{upsert:true}
  				)
  				if (ret != 1) console.log('clinical info returns', ret)
  			}
          	catch (ex) {
             		console.log("update exception", sample_id, samples[sample_id]);
             	 throw ex
          	}
  		}
  	})

  	// ingest Prior Treatment

  	var treatment_list = SU2C_Prior_TX_V3.find({})
  	var prior = {}
  	treatment_list.forEach(function(treatment) {
  		var sample_id = treatment['Sample_ID']
  		var patient_id = treatment['Patient_ID']
  		var drug = treatment['Drug_Name']
  		/*if (treatment.Drug_Name && treatment.Drug_name != 'undefined') {
  			if (!samples[sample_id]['treatment_for_mcrpc_prior_to_biopsy']) {
  				samples[sample_id]['treatment_for_mcrpc_prior_to_biopsy'] = []
  			}
  			//console.log('before drug',sample_id, treatment.Drug_Name, samples[sample_id]['treatment_for_mcrpc_prior_to_biopsy'])
  			samples[sample_id]['treatment_for_mcrpc_prior_to_biopsy'].push(treatment.Drug_Name)
  			//console.log('after drug',sample_id, treatment.Drug_Name, samples[sample_id]['treatment_for_mcrpc_prior_to_biopsy'])
  		}
  		if (treatment.Reason_for_Stopping_Treatment == undefined) {
  			console.log('no reason for stopping', sample_id)
  		}
  		else {
  			console.log('stopping', sample_id, treatment.Reason_for_Stopping_Treatment)
  			//prior[sample_id][drug]['Reason_for_Stopping_Treatment'] = treatment.Reason_for_Stopping_Treatment
  		}*/
  		if (drug) {
  			if (!(sample_id in prior)) {
  				prior[sample_id] = {}
  				prior[sample_id][drug] = 'Naive'
  			}
  			var data = {'sample_ID':sample_id}
  			prior[sample_id][drug] = 'Resistant'
  		}
                ret = clinical_info.update(
                            {'Sample_ID':sample_id},
                            { $addToSet: { prior_txs: summarizeTreatment("SU2C_Prior_TX_V3", treatment) }});
  	})
  	for (var sample_id in prior) {
  		if (prior[sample_id]) {
  			var abi = prior[sample_id]['Abiraterone']
  			var enza = prior[sample_id]['Enzalutamide']
  			if (abi === undefined) {
  				prior[sample_id]['Abiraterone'] = 'Naive'
  			}
  			if (enza === undefined) {
  				prior[sample_id]['Enzalutamide'] = 'Naive'
  			}
  			var update_j = prior[sample_id]
  			if (samples[sample_id] && samples[sample_id] != undefined) {
  				try {
                                    if (samples[sample_id]['Patient_ID'] == undefined)
                                        samples[sample_id]['Patient_ID'] = sample_id
                                    samples[sample_id]['Abiraterone'] = prior[sample_id]['Abiraterone']
                                    samples[sample_id]['Enzalutamide'] = prior[sample_id]['Enzalutamide']
                                    //console.log("update ",sample_id,{$set:samples[sample_id]})
                                    //console.log('upsert',sample_id, {$set:samples[sample_id]})
                                    var ret = clinical_info.update(
  						{'Sample_ID':sample_id},
  						{$set:samples[sample_id]},
  						{upsert:true} );
  				}
  		        catch (ex) {
  		           		console.log("update exception", ex, update_j );
  		           	 throw ex
  		        }

  			}
  		/*	try {

  				console.log("update ",sample_id,{ $set: update_j } )
  	 			var ret = clinical_info.update(
  					{'Sample_ID':sample_id},
  					{ $set: update_j },
  					{upsert:true}
  				)
  				console.log('clinical info prior returns', ret)
  			}
          	catch (ex) {
             		console.log("update exception", ex, update_j );
             	 throw ex
          	}*/
  		}
  		else
  		{
  			console.log('prior' , sample_id, 'Naive2')
  		}

  	}

  	// ingest Subsequent Treatment


  	var treatment_list = SU2C_Subsequent_Treatment_V1.find({})
  	treatment_list.forEach(function(treatment) {
  		var patient_id = treatment['Patient_ID']
  		var sample_id = treatment['Sample_ID']
  		var timepoint = 'baseline'
  		if (sample_id.search(/pro/i) > 0) {
  			timepoint = 'progression'
                }
  		
  		var drug = treatment['Drug_Name']
  		var priorAbi = samples[patient_id]['Abiraterone']
  		console.log('Pat samp time drug', patient_id, sample_id , timepoint, drug);
  		var data = {'Study_ID':'prad_wcdt', 'Abiraterone':priorAbi, 'Patient_ID': patient_id}
  		if (drug == 'Abiraterone') {
  			data.abi_psa_response = treatment.PSA_Response
  		}
  		console.log("subs TX", data,'input',sample_id)

  		var ret = clinical_info.update(
  			{'Sample_ID':sample_id},
  			{$set:data},
  			{upsert:true})
                ret = clinical_info.update( 
                            {'Sample_ID':sample_id},
                            { $addToSet: { subsequent_txs: summarizeTreatment("SU2C_Subsequent_Treatment_V1", treatment) }});  // TCG 8/2/2015
  	})
      propagateClinical();
  }

  propagateClinical = function () {
        /* Propogate all earlier treatments whether in the  prior or subsequent collections */
        /* there are many different ways to do this. But I'm trying to make as few changes to the code as possible */
  	var clinical_info = CRFcollections['Clinical_Info']
  	var SU2C_Prior_TX_V3 = CRFcollections['SU2C_Prior_TX_V3']
  	var SU2C_Subsequent_Treatment_V1 = CRFcollections['SU2C_Subsequent_Treatment_V1']
        clinical_info.find({Sample_ID: /Pro/}).forEach(function(progression) {
            function copyForward(coll,collName) {
                if (progression.Patient_ID == "DTB-073")
                    console.log("XYZ prog", progression)
                coll.find( 
                    {$and: [
                        {Patient_ID: progression.Patient_ID},
                        {Start_Date: {$lt: progression.biopsy_date}}
                    ]}).forEach(function(treatment) {
                        if (progression.Patient_ID == "DTB-073")
                                console.log("XYZ treatment", treatment)
                        clinical_info.update( 
                            {_id: progression._id},
                            { $push: { prior_txs: summarizeTreatment(collName, treatment) }});  // TCG 8/2/2015

                        if (treatment.Drug_Name == "Abiraterone") {
                            ret = clinical_info.update( {_id: progression._id}, { $set: { Abiraterone: "Resistant"}});
                            console.log("abi ret", ret);
                        }

                        if (treatment.Drug_Name == "Enzalutamide") {
                            ret = clinical_info.update( {_id: progression._id}, { $set: { Enzalutamide: "Resistant"}});
                            console.log("enz ret", ret);
                        }
                    });
                } // copyForward
            clinical_info.update( {_id: progression._id},
                { $set:   {
                    Enzalutamide: "Naive",
                    Abiraterone: "Naive"
                }});  

            copyForward(SU2C_Prior_TX_V3, "SU2C_Prior_TX_V3");
            copyForward(SU2C_Subsequent_Treatment_V1, "SU2C_Subsequent_Treatment_V1");
        }) // forEach
  }


  get_PSA_response = function(sample, date) {
  	var blood_lab = CRFcollections['Blood_Labs_V2']
  	psa_list = blood_lab.find({"Sample_ID":sample,"PSA__complexed__direct_measurement_":{$exists:true}}).fetch()
  	var minPSA = 0
  	var maxPSA = 999999999;
  	psa_list.forEach(function(psa) {

  	})
  }
  console.log("Oncore is defined");
  if (Meteor.isServer)  {

    HTTP.methods({
      ingestOncore : function() {
        Meteor.call("ingestOncore");
        return "Ingesting Oncore Finished";
      },
      ingestClinical : function() {
        Meteor.call("ingestClinical");
        return "ingestingClinical";
      },
      propagateClinical : function() {
        Meteor.call("propagateClinical");
        return "propgatingClinical";
      },
    });

    Meteor.methods({
      ingestOncore : function() {
        ingestOncore();
      },
      ingestClinical : function() {
        ingestClinical();
      },

      propagateClinical : function() {
        propagateClinical();
      },

    })
  }// isServer

  Core = {
    // found in between CRFfieldOrder and CRFprototypes while refractoring
    // (defined in formSchemas/Histological_Assessment_form.js)
    "Core": core_type,
    'BlockImage': {
      type: String
    },
    'ReferenceSlideNumber': {
      type: String
    },
    'ReferenceSlideImages': {
      type: String
    },
    'BlockStatus': {
      type: String,
      "allowedValues": [
                  "negative",
                  "negative with potential",
                  "defer to pathologist",
                  "positive for cancer (but not suitable for processing)",
                  "positive for processing"]
    }
  };

  // This is never used anywhere here... If you find this and removing it
  // hasn't broken anything, please delete it!
  // var timestamp = (new Date()).getTime();

  Schemas = {};

  Meteor.isClient && Template.registerHelper("Schemas", Schemas);

  function copyClean(a)  {
    var copy = {};

    for (key in a) {
      var value = a[key];
      var type = typeof(value);

      if (value == null)
      ;
      else if (type == "function") {
        value = value.name;
        if (value == null || value.length == 0) {
          console.log("key", key, " function is unamed");
          value = "object";
        }

      } else if (type == "object")
      value = copyClean(value);
      else
      ;
      copy[key] = value;
    }
    return copy;
  }


  function initializeCollectionCRF(x, n) {

    var aCRFcollection = new Mongo.Collection(x);
    CRFcollections[x] = aCRFcollection;
    /*
    if (Meteor.isServer)
    aCRFcollection.remove({});
    */
    if (Meteor.isClient)
       window[x] = aCRFcollection;

    var aCRFschema = new SimpleSchema([clinicalReportFormSchemaObject, CRFprototypes[x]]);
    aCRFcollection.attachSchema(aCRFschema);
    console.log('#attach',x)
    Schemas[x] = aCRFschema;

    if (Meteor.isServer) {

      CRFmetadataCollection.update({_id: x},
      {
        _id: x,
        name: x,
        n: n,
        incompleteCount: 0,
        fieldTypes: copyClean(CRFprototypes[x]),
        fieldOrder: CRFfieldOrder[x],
	study: this.study,
      }
      ,
      {
        upsert: true
      })
    } else if (Meteor.isClient) {
      Meteor.subscribe(x);
      function lambda(aCRFschema) {
        return function() {
          var context = aCRFschema.namedContext("myContext");
          if (!context.isValid()) {
            console.log("invalidKeys", context.invalidKeys());
          }
        }
      }
      Tracker.autorun(lambda(aCRFschema));


    }
  };

  _.each(prad_wcdt_crfs, initializeCollectionCRF, {study: 'prad_wcdt'});
  _.each(common_crfs, initializeCollectionCRF, {study: 'common'}); 

}); // end Meteor.startup

Expression = new Meteor.Collection("expression2"); // not yet necessary to publish as its only used by MedBookLib for Gene names

