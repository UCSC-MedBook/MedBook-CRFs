/**
 * Created by ted on 02/28/15.
 */


HTTP.methods({
    ingestOncore : function() {
        ingestOncore();
    },
});



Meteor.methods({
    ingestOncore : function() {
        ingestOncore();
    },

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
            _id = insertDoc["Patient_ID"];
        }


        insertDoc._id = _id;
        console.log(insertDoc);
        if (coll.findOne({_id: _id}))
            coll.update({_id: _id}, updateDoc);
        else
            coll.insert(insertDoc);
        //var ret = coll.upsert({_id: _id}, {$set: insertDoc});
        // console.log("upsert", ret)
    }
})
