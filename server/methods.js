/**
 * Created by ted on 02/28/15.
 */



Meteor.startup(
  function() {
    Meteor.methods({

        addCRF : function(insertDoc, updateDoc) {
           var crf = insertDoc.crf;
            delete insertDoc["crf"];
            var coll = CRFcollections[crf];
            var _id;

            if (crf in ComplexIDFields) {
                _id = ""
                _.each(ComplexIDFields[crf], function(f) {
                    if (_id.length > 0)
                        _id += " " + insertDoc[f];
                    else
                        _id += insertDoc[f];
                })
            } else {
                if ("Patient_ID" in  insertDoc)
                    _id = insertDoc["Patient_ID"];
                else if ("Sample_ID" in  insertDoc)
                    _id = insertDoc["Sample_ID"];
                else 
                    _id = null;
            }


            if (_id)
                insertDoc._id = _id;
            console.log(insertDoc);
            if (_id && coll.findOne({_id: _id}))
                coll.update({_id: _id}, updateDoc);
            else
                coll.insert(insertDoc);
            //var ret = coll.upsert({_id: _id}, {$set: insertDoc});
        }
    })
})
