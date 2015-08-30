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

  Collections.studies = new Meteor.Collection('studies');


  // if the database is empty on server start, create some sample data.
  ComplexIDFields = {};

  var admin_crfs = [
      "CRFmetadataCollection",
      'studies',
  ]
  
  var common_crfs = [
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


  if (true) {
    // this needs to be parameterized by study somehow.
    function crf_ids_potential() {
        var s = [];
        for (var i = 0; i <= 300; i++)
            s.push("DTB-" + ("00" + i).slice(-3))
        return s;
    }

    clinicalReportFormSchemaObject = new SimpleSchema({
      _id: {
          type: String,
          optional: true,
      },
      createdAt: {
          type: Date,
          optional: true,
      },
      updatedAt: {
          type: Date,
          optional: true,
      },
  		userId: {
  			type: String,
          optional: true,
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

                         Collections[t].insert(row);

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
                          // Collections[t].upsert({Patient_ID: Patient_ID}, {$set: obj});
                          obj.Patient_ID = Patient_ID;
                          Collections[t].insert( obj );
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
                  if (d == "Enzalutamide")
                      SU2C_Subsequent_Treatment_V1.ResponderEnzalutamide = SU2C_Subsequent_Treatment_V1.Responder;
                  else if (d == "Abiraterone")
                      SU2C_Subsequent_Treatment_V1.ResponderAbiraterone  = SU2C_Subsequent_Treatment_V1.Responder;
                  else {
                      SU2C_Subsequent_Treatment_V1.ResponderOtherTherapy = SU2C_Subsequent_Treatment_V1.Responder;
                  }
              });
          else
                  SU2C_Subsequent_Treatment_V1.ResponderOtherTherapy = SU2C_Subsequent_Treatment_V1.Responder;

      }

  };



  ingestOncore = function () {
    Object.keys(OncoreTable_NeedsSample_ID).map(function(name) {
      Collections[name].remove({});
    });
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
  	var SU2C_Biopsy_V3 = Collections['SU2C_Biopsy_V3']
  	var SU2C_Prior_TX_V3 = Collections['SU2C_Prior_TX_V3']
  	var SU2C_Subsequent_Treatment_V1 = Collections['SU2C_Subsequent_Treatment_V1']
  	var clinical_info = Collections['Clinical_Info']
  	var Demographics = Collections['Demographics']
  	var Followup = Collections['Followup']

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
  	var clinical_info = Ctions['Clinical_Info']
  	var SU2C_Prior_TX_V3 = Collections['SU2C_Prior_TX_V3']
  	var SU2C_Subsequent_Treatment_V1 = Collections['SU2C_Subsequent_Treatment_V1']
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
  	var blood_lab = Collections['Blood_Labs_V2']
  	psa_list = blood_lab.find({"Sample_ID":sample,"PSA__complexed__direct_measurement_":{$exists:true}}).fetch()
  	var minPSA = 0
  	var maxPSA = 999999999;
  	psa_list.forEach(function(psa) {

  	})
  }
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

  // This is never used anywhere here... If you find this and removing it
  // hasn't broken anything, please delete it!
  // var timestamp = (new Date()).getTime();


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


  function initializeCollectionCRF(collectionName, nthCollection) {
    // console.log("initializeCollectionCRF >  CRFinit", Object.keys(CRFinit), collectionName);

    /*
    var aCRFcollection = collectionName in Collections ? Collections[collectionName] : new Mongo.Collection(collectionName);
    Collections[collectionName] = aCRFcollection;
    if (Meteor.isServer)
    aCRFcollection.remove({});
    if (Meteor.isClient)
       window[collectionName] = aCRFcollection;
    */

    var fo = _.pluck(CRFinit[collectionName].Fields, "Field_Name");
    var fs = _.clone(CRFinit[collectionName]);
    var schema = {};
    fs.Fields.map(function(field) {
       field = _.clone(field);
       var name = field["Field_Name"];
       delete field["Field_Name"];
       schema[name] = field;
    });

    if (Meteor.isServer) {

      var n = CRFmetadataCollection.update({_id: collectionName},
      {
        _id: collectionName,
        name: collectionName,
        n: nthCollection,
        incompleteCount: 0,
        schema: schema,
	metadata: CRFinit[collectionName],
        fieldOrder: fo,
	study: this.study,
      }
      ,
      {
        upsert: true
      })


      // console.log("before", this.study, collectionName);
      Collections.studies.update({name: this.study}, {$addToSet: {tables: collectionName}});

    } else if (Meteor.isClient) {
    }
  };

  _.each(admin_crfs, initializeCollectionCRF, {study: 'admin'}); 
  _.each(prad_wcdt_crfs, initializeCollectionCRF, {study: 'prad_wcdt'});
  _.each(common_crfs, initializeCollectionCRF, {study: 'common'}); 

  var fields = _.clone(CRFinit.CRFmetadataCollection.Fields);
  var ss = {}
  fields.map(function(f) { 
      ss[f["Field_Name"]] = f;
      delete f["Field_Name"];
  });
  console.log("fields", fields);
/*
  CRFmetadataCollection.attachSchema(new SimpleSchema({
      Form_Name : {
	  type: "String",
      },
      Fields : {
	  type: [ "String" ]
      }
  }));
*/

}); // end Meteor.startup

Expression = new Meteor.Collection("expression2"); // not yet necessary to publish as its only used by MedBookLib for Gene names


fieldOrder = function(collName) {
   var meta = CRFmetadataCollection.findOne({name: collName});
   if (meta)
       return meta.fieldOrder;
   return [];
}

schema = function(collName) {
   var meta = CRFmetadataCollection.findOne({name: collName});
   if (meta) {
       Object.keys(meta.schema).map(function(fn) {
       	  var f = meta.schema[fn]
	  if (f.autoform == null)
	  	f.autoform = {};
       });
       return new SimpleSchema( meta.schema );
   }
   return null;
}
